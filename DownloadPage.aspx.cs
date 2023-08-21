using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Business_Logic.Model;
using Business_Logic.Entity;
using System.Data;
using System.IO;
using System.IO.Compression;
using Business_Logic;
using System.Reflection;
using System.Threading;

namespace KF_Web
{
    public partial class DownloadPage : System.Web.UI.Page
    {
        public  FunctionHandler g_FunctionHandler = new FunctionHandler();

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                BL_System m_BL_System = new BL_System();
                if (Request["mode"] == "download")
                {

                    SysEntity.Employee p_EmployeeEntity = new SysEntity.Employee();
                    SysEntity.FileFolder m_FileFolder = new SysEntity.FileFolder();
                    if (Request["FileKey"] != null)
                    {
                        m_FileFolder.FileKey = Request["FileKey"].ToString();
                    }
                    if (Request["SiteFormID"] != null)
                    {
                        m_FileFolder.SiteFormID = Request["SiteFormID"].ToString();
                    }
                    

                    SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
                    m_TransResult = m_BL_System.GetFileFolder(p_EmployeeEntity, m_FileFolder);
                    if (m_TransResult.isSuccess )
                    {

                        DataTable m_Dt =  (DataTable)m_TransResult.ResultEntity;
                        foreach (DataRow dr in m_Dt.Rows)
                        {
                            Byte[] bytes = g_FunctionHandler.Decompress((Byte[])dr["FileEntity"]);
                            if (dr["FileType"].ToString().IndexOf("image/") != 0)
                            {
                               
                                Response.Buffer = true;
                                Response.Charset = "";
                                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                                Response.ContentType = m_Dt.Rows[0]["FileType"].ToString();
                                Response.AddHeader("content-disposition", "attachment;filename="
                                + HttpUtility.UrlEncode(m_Dt.Rows[0]["FileName"].ToString()));
                                Response.BinaryWrite(bytes);
                                HttpContext.Current.Response.Flush(); // Sends all currently buffered output to the client.
                                HttpContext.Current.Response.SuppressContent = true;  // Gets or sets a value indicating whether to send HTTP content to the client.
                                HttpContext.Current.ApplicationInstance.CompleteRequest(); // Causes ASP.NET to bypass all events and filtering in the HTTP pipeline chain of execution and directly execute the EndRequest event.
                                HttpContext.Current.Response.End();
                            }
                            else
                            {
                                Image1.Src = "data:image/png;base64," + Convert.ToBase64String(bytes);
                            }
                            
                        }
                        
                    }
                }
                else if (Request["mode"] == "ExportExcel")
                {
                    string m_FileName="";


                    if (Request["SiteFormID"] != null)
                    {
                        m_FileName = HttpUtility.UrlEncode(Request["SiteFormID"].ToString().Replace(" ", "")) + "-" + DateTime.Now.ToString("yyyyMMddhh");
                    }
                    string m_EventID = "";
                    if (Request["EventID"] != null)
                    {
                        m_EventID = Request["EventID"].ToString();
                    }
                    SysEntity.Employee p_Employee = new SysEntity.Employee();

                    if (Request["Employee"] != null)
                    {
                        p_Employee = g_FunctionHandler.DeserializeObject<SysEntity.Employee>(Request["Employee"].ToString());
                    }
                    Dictionary<string, Object> m_Entity = new Dictionary<string, object>();
                    if (Request["Entity"] != null)
                    {
                        m_Entity = g_FunctionHandler.DeserializeObject<Dictionary<string, Object>>(Request["Entity"].ToString());
                    }
                    string m_Language = "";
                    if (Request["Language"] != null)
                    {
                        m_Language = Request["Language"].ToString();
                    }
                    string m_Controlref = "";
                    if (Request["Controlref"] != null)
                    {
                        m_Controlref = Request["Controlref"].ToString();
                    }

                    SysEntity.EventSetting m_EventEntry = new SysEntity.EventSetting();
                    m_EventEntry.EventID = m_EventID;
                    SysEntity.TransResult m_TransResult = m_BL_System.GetEventSetting(p_Employee, m_EventEntry);
                    string m_EventModel = "";
                    string m_EventAction = "";
                    string m_EventActionType = "";
                    string m_EventRef = "";

                    if (m_TransResult.isSuccess )
                    {
                        foreach (DataRow dr in ((DataTable)m_TransResult.ResultEntity).Rows)
                        {
                            m_EventModel = dr["EventModel"].ToString();
                            m_EventAction = dr["EventAction"].ToString();
                            m_EventActionType = dr["EventActionType"].ToString();
                            m_EventRef = dr["EventRef"].ToString();
                        }
                    }
                    Type m_Type = g_FunctionHandler.GetBLType(m_EventModel);

                    object instance = Activator.CreateInstance(m_Type);
                    MethodInfo method = instance.GetType().GetMethod(m_EventAction);
                    object[] m_Params = new object[5];
                    m_Params[0] = p_Employee;
                    m_Params[1] = m_Entity;
                    m_Params[2] = "1";
                    m_Params[3] = "1";

                    Dictionary<string, Object> p_Param = new Dictionary<string, object>();
                    p_Param["OrderBy"] = m_EventRef.Split(';')[0];
                    p_Param["Type"] = "ExportExcel";
                    m_Params[4] = p_Param;
                    m_TransResult = (SysEntity.TransResult)method.Invoke(instance, m_Params);
                    DataTable m_dtExport = new DataTable();
                    if (m_TransResult.isSuccess )
                    {
                        DataTable m_dt = (DataTable)m_TransResult.ResultEntity;
                        DataTable m_dtExcel = new DataTable();

                        if (m_Controlref != "")
                        {
                            foreach (string ExColumn in m_Controlref.Split(','))
                            {
                                m_dtExcel.Columns.Add(ExColumn, "".GetType());
                            }

                            foreach (DataRow dr in m_dt.Rows)
                            {
                                DataRow m_drNewExcel = m_dtExcel.NewRow(); 

                                foreach (string ExColumn in m_Controlref.Split(','))
                                {
                                    if (m_dt.Columns.Contains(ExColumn))
                                    {
                                        m_drNewExcel[ExColumn] = dr[ExColumn].ToString();
                                    }
                                }
                                m_dtExcel.Rows.Add(m_drNewExcel);
                            }



                            m_dtExport = m_dtExcel.Copy();

                        }
                        else
                        {
                            m_dtExport = m_dt.Copy();
                        }


                        if (m_dtExport.Rows.Count != 0)
                        {
                            using (MemoryStream m_Excel = g_FunctionHandler.WriteExcelWithNPOI(p_Employee, m_Language, m_dtExport))
                            {
                                Response.Buffer = true;
                                Response.Charset = "";
                                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                                Response.ContentType = "application/vnd.ms-excel";
                                Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", m_FileName+".xls"));
                                Response.BinaryWrite(m_Excel.GetBuffer());
                                HttpContext.Current.Response.Flush(); // Sends all currently buffered output to the client.
                                HttpContext.Current.Response.SuppressContent = true;  // Gets or sets a value indicating whether to send HTTP content to the client.
                                HttpContext.Current.ApplicationInstance.CompleteRequest(); // Causes ASP.NET to bypass all events and filtering in the HTTP pipeline chain of execution and directly execute the EndRequest event.
                                HttpContext.Current.Response.End();
                            }
                        }
                    }
                    else
                    {
                        Response.Clear();
                        Response.Write("<label id='DownErr" + Request["EventID"].ToString() + "'>" + m_TransResult.LogMessage + "</label>");
                        HttpContext.Current.Response.Flush(); // Sends all currently buffered output to the client.
                        HttpContext.Current.Response.SuppressContent = true;  // Gets or sets a value indicating whether to send HTTP content to the client.
                        HttpContext.Current.ApplicationInstance.CompleteRequest(); // Causes ASP.NET to bypass all events and filtering in the HTTP pipeline chain of execution and directly execute the EndRequest event.
                        HttpContext.Current.Response.End();
                    }
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

        
    }
}