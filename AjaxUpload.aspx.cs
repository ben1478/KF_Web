using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Business_Logic.Model;
using Business_Logic.Entity;
using System.IO;
using System.IO.Compression;
using Business_Logic;
using System.Web.Script.Serialization;
using System.Threading;

namespace KF_Web
{

    public partial class AjaxUpload : System.Web.UI.Page
    {
        public static FunctionHandler g_FunctionHandler = new FunctionHandler();

        //檔案存放位置
        //檔案大小上限(KB)
        int g_fileMaxSize = 5120;
        string[] g_fileAgreeType = {
		".png",
		".jpg",
		".gif",
        ".xls",
        ".doc",
        ".xlsx",
        ".pdf",
        ".msg",
        ".docx"
		//可上傳之檔案類型
	};

        protected void Page_Load(object sender, System.EventArgs e)
        {
            try
            {
                SysEntity.TransResult m_TransResult = new SysEntity.TransResult();

                if (HttpContext.Current.Request.Form["RequestType"].ToString() == "ExcelGrid")
                {
                    string[] m_fileAgreeTypeExcel = { ".xlsx", ".xls" };
                    g_fileAgreeType = m_fileAgreeTypeExcel;
                }

                if (IsPostFile())
                { 
                    m_TransResult = SaveRequestFiles();

                    var json = new JavaScriptSerializer().Serialize(m_TransResult);

                    Response.Clear();
                    Response.ContentType = "application/json; charset=utf-8";
                    Response.Write(json);
                    Response.Flush();
                    Response.SuppressContent = true;
                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    Response.End();
                }
                else
                {
                }
            }
            catch (ThreadAbortException ex)
            {
            }
            catch (Exception ex)
            {
                Response.Clear();
                Response.Write(ex.Message);
                Response.Write("<label id='DownErr" + Request["DocID"].ToString() + "'>" + ex.Message + "</label>");
               
            }

          
        }

        //判斷是否有需上傳的檔案
        public static bool IsPostFile()
        {
            for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                if (!string.IsNullOrEmpty(HttpContext.Current.Request.Files[i].FileName))
                {
                    return true;
                }
            }
            return false;
        }

        //檢查檔案格式是否符合要求
        private bool CheckFileExt(string _fileExt)
        {
            bool fileAllow = false;
            //旗標
            for (int i = 0; i <= g_fileAgreeType.Length - 1; i++)
            {
                if (_fileExt == g_fileAgreeType[i])
                {
                    fileAllow = true;
                    break; // TODO: might not be correct. Was : Exit For
                }
            }
            if (fileAllow)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //
        //檢查檔案大小是否超過限制
        private bool CheckFileSize(Int32 _fileSize)
        {
            if ((_fileSize / 1024) > g_fileMaxSize)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

     


        //儲存上傳的檔案
        public SysEntity.TransResult SaveRequestFiles()
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            try
            {
               
                int fCount = HttpContext.Current.Request.Files.Count;
                for (int i = 0; i <= fCount - 1; i++)
                {
                    Business_Logic.Entity.SysEntity.FileFolder m_FileFolder = new Business_Logic.Entity.SysEntity.FileFolder();

                    //取得檔案資訊
                    System.IO.FileInfo file = new System.IO.FileInfo(HttpContext.Current.Request.Files[i].FileName);
                    //取得檔案名稱
                    string fileName = file.Name;
                    //取得檔案附檔名
                    string fileExtension = file.Extension.ToLower();
                    //取得檔案類型
                    string fileType = HttpContext.Current.Request.Files[i].ContentType.ToLower();
                    //取得檔案大小
                    int fileSize = HttpContext.Current.Request.Files[i].ContentLength;
                    FunctionHandler m_FunctionHandler=new FunctionHandler();
                  
                    //檢查檔案大小
                    if (CheckFileSize(fileSize))
                    {
                        //檢查檔案格式
                        if (CheckFileExt(fileExtension))
                        {
                            if (HttpContext.Current.Request.Form["Employee"] != null )
                            {

                                if (Request["FieldID"] != null)
                                {
                                    m_FileFolder.FieldID = Request["FieldID"].ToString();
                                }
                                if (Request["KeyID"] != null)
                                {
                                    m_FileFolder.DocID = Request["KeyID"].ToString();
                                }
                                if (Request["SiteFormID"] != null)
                                {
                                    m_FileFolder.SiteFormID = Request["SiteFormID"].ToString();
                                }
                                Thread.Sleep(1);
                                m_FileFolder.FileKey = DateTime.Now.ToString("yyyyMMddhhmmssfff");
                                m_FileFolder.FileName = fileName;
                                m_FileFolder.FileType = fileType;
                                m_FileFolder.FileIndex = "1";

                                //Casper Add FOR FILE UPLOAD 分類 Begin
                                if(m_FileFolder.FieldID.Contains("AttachFileItem1"))
                                    m_FileFolder.FileIndex = "1";
                                if(m_FileFolder.FieldID.Contains("AttachFileItem2"))
                                    m_FileFolder.FileIndex = "2";
                                if (m_FileFolder.FieldID.Contains("AttachFileItem3"))
                                    m_FileFolder.FileIndex = "3";
                                if (m_FileFolder.FieldID.Contains("AttachFileItem4"))
                                    m_FileFolder.FileIndex = "4";
                                if (m_FileFolder.FieldID.Contains("AttachFileItem5"))
                                    m_FileFolder.FileIndex = "5";
                                if (m_FileFolder.FieldID.Contains("AttachFileItem6"))
                                    m_FileFolder.FileIndex = "6";
                                if (m_FileFolder.FieldID.Contains("AttachFileItem7"))
                                    m_FileFolder.FileIndex = "7";
                                //Casper Add FOR FILE UPLOAD 分類 End

                                Byte[] inputBuffer = new Byte[fileSize];
                                if ( HttpContext.Current.Request.Form["RequestType"].ToString() == "ExcelGrid")
                                {
                                    m_TransResult = m_FunctionHandler.ParserExcel(HttpContext.Current.Request.Files[i].InputStream, fileExtension);
                                }
                                else
                                {
                                    using (System.IO.Stream inputStream = HttpContext.Current.Request.Files[i].InputStream)
                                    {
                                        inputStream.Read(inputBuffer, 0, fileSize);
                                        m_FileFolder.FileEntity = g_FunctionHandler.Compress(inputBuffer);
                                    }
                                    SysEntity.Employee p_EmployeeEntity = g_FunctionHandler.DeserializeObject<SysEntity.Employee>(HttpContext.Current.Request.Form["Employee"].ToString());
                                    BL_System m_BL = new BL_System();
                                    m_TransResult = m_BL.sysFileUpload(p_EmployeeEntity, m_FileFolder);
                                }
                            }
                            else
                            {
                                m_TransResult.isSuccess = false;
                                m_TransResult.LogMessage = "Account?CompanyCode?WorkID?";
                            }
                        }
                        else
                        {
                            m_TransResult.isSuccess = false;
                            m_TransResult.LogMessage = "檔案格式不符合(請使用png,jpg,gif,xls,xlsx,doc,docx,msg,pdf)";
                        }
                    }
                    else
                    {
                        m_TransResult.isSuccess = false;
                        m_TransResult.LogMessage = "檔案大小超過 5M 限制";
                    }
                }
            }
            catch(Exception ex )
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
           
        }


    }
}