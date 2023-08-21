using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.IO.Compression;
using Business_Logic;
using Business_Logic.Entity;
using Business_Logic.Model;
using System.Data;
namespace KF_Web
{
    public partial class ShowImage : System.Web.UI.Page
    {
        public FunctionHandler g_FunctionHandler = new FunctionHandler();

        protected void Page_Load(object sender, EventArgs e)
        {
            BL_System m_BL_System = new BL_System();
            SysEntity.Employee p_EmployeeEntity = new SysEntity.Employee();
            SysEntity.FileFolder m_FileFolder = new SysEntity.FileFolder();
            try
            {
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
                if (m_TransResult.isSuccess)
                {
                    DataTable m_Dt = (DataTable)m_TransResult.ResultEntity;
                    foreach (DataRow dr in m_Dt.Rows)
                    {
                        Byte[] bytes = g_FunctionHandler.Decompress((Byte[])dr["FileEntity"]);
                        if (dr["FileType"].ToString().IndexOf("image/") == 0)
                        {
                            Image1.Src = "data:image/png;base64," + Convert.ToBase64String(bytes);
                        }
                    }
                }
            }
            catch
            { 
            
            }
           
          
        }
    }
}