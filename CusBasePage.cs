using System;
using System.Web;
using System.Web.UI;
using Business_Logic.Entity;
using Business_Logic.Model;
using System.Data;
using System.Web.UI.HtmlControls;
using Business_Logic;

namespace KF_Web
{
    public class CusBasePage : System.Web.UI.Page
    {
        public static FunctionHandler g_FH = new FunctionHandler();
        public static Business_Logic.Model.BL_System g_BL_System = new BL_System();
        public static Business_Logic.Model.BL_YuRich g_BL_YuRich = new BL_YuRich();
        public static string g_Language = "";
        public static string g_Page_ID = "";



        protected override void OnLoad(EventArgs e)
        {
            try
            {
                string m_TimeParam = "?d=" + DateTime.Now.ToString("yyyyMMddhhmmss");
                Page.ClientScript.RegisterClientScriptInclude("FunctionHandler", ResolveUrl("~/Scripts/FunctionHandler.js" + m_TimeParam));
                Page.ClientScript.RegisterClientScriptInclude("GridData", ResolveUrl("~/Scripts/GridData.js" + m_TimeParam));
                Page.ClientScript.RegisterClientScriptInclude("ValidatedHandler", ResolveUrl("~/Scripts/ValidatedHandler.js" + m_TimeParam));
              
                SysEntity.Employee m_Employee = new SysEntity.Employee();

                SysEntity.TransResult m_TransResult = GetLoinUser(Request);
                if (m_TransResult.isSuccess)
                {
                    m_Employee = (SysEntity.Employee)m_TransResult.ResultEntity;
                    g_FH.GetCtrlSetVal(m_Employee.CompanyCode, (Control)FindControl("txtCompanyCode"));
                    g_FH.GetCtrlSetVal(m_Employee.WorkID, (Control)FindControl("txtWorkID"));
                    g_FH.GetCtrlSetVal(m_Employee.DisplayName, (Control)FindControl("txtDisplayName"));
                    g_FH.GetCtrlSetVal(m_Employee.Remark, (Control)FindControl("txtRemark"));
                    g_FH.GetCtrlSetVal(m_Employee.DisplayName, (Control)FindControl("DisplayName"));
                    g_FH.GetCtrlSetVal(m_Employee.GroupID, (Control)FindControl("txtGroupID"));
                    if (m_Employee.CompanyCode == "1000")
                    {
                        g_FH.GetCtrlSetVal("KF", (Control)FindControl("hidCase_Company"));
                    }
                    else
                    { 
                        g_FH.GetCtrlSetVal("YL", (Control)FindControl("hidCase_Company"));

                    }




                    string MenuID = "";

                    if (!string.IsNullOrEmpty(Request["MenuID"].ToString()))
                    {
                        MenuID = Request["MenuID"].ToString();
                    }
                    g_FH.GetCtrlSetVal(MenuID, (Control)FindControl("hidMenuID"));
                    //============
                    DataTable m_dttModuleInfo = g_BL_System.GetModuleInfoByMenuID(m_Employee, MenuID);
                    g_FH.GetCtrlSetVal(m_Employee.WorkID, (Control)FindControl("spWorkID"));
                    //===================
                    foreach (DataRow dr in m_dttModuleInfo.Rows)
                    {
                        string m_ModuleName = dr["ModuleName"].ToString();
                        string m_MenuDesc = dr["MenuDesc"].ToString();
                        g_FH.GetCtrlSetVal(m_Employee.DisplayName, (Control)FindControl("UserInfo"));
                        g_FH.GetCtrlSetVal(m_MenuDesc, (Control)FindControl("PanelTitle"));
                        g_FH.GetCtrlSetVal(m_ModuleName, (Control)FindControl("titleModuleName"));
                        g_FH.GetCtrlSetVal("../" + dr["ModuleImg"].ToString(), (Control)FindControl("imgModule"));
                        HtmlGenericControl m_titleModuleName = ((HtmlGenericControl)FindControl("titleModuleName"));
                        if (m_titleModuleName != null)
                        {
                            m_titleModuleName.Attributes["ModKey"] = dr["ModuleKey"].ToString();
                        }
                        string m_Content = dr["ModuleContent"].ToString();
                        string m_ModuleContent = "table-layout " + m_Content + " animated fadeIn";
                        System.Web.UI.HtmlControls.HtmlGenericControl m_Pagedep = ((System.Web.UI.HtmlControls.HtmlGenericControl)FindControl("pagedep"));
                        if (m_Pagedep != null)
                        {
                            m_Pagedep.Attributes.Add("class", "page-heading " + dr["ModulePagedep"].ToString() + " text-left");
                            string myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventScriptBlock\">\n";
                            myScript += " $(function () { $('#content').attr('class','" + m_ModuleContent + "'); $('#content').attr('CssContent','" + m_Content + "')  }); ";
                            myScript += "\n\n </script>";
                            Page.ClientScript.RegisterStartupScript(this.GetType(), DateTime.Now.ToString("yyyyMMddHHmmssfff"), myScript, false);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
            base.OnLoad(e);
        }

        // public Tuple<SysEntity.TransResult> GetLoinUser(HttpRequest p_Request)
        public SysEntity.TransResult GetLoinUser(HttpRequest p_Request)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            try
            {
                SysEntity.Employee m_Employee = new SysEntity.Employee();
                string m_LOGON_USER = p_Request.ServerVariables["LOGON_USER"].ToString();

                if (m_LOGON_USER.IndexOf("\\") != -1)
                {
                    m_LOGON_USER = m_LOGON_USER.Split('\\')[1];
                }

                if (m_LOGON_USER == "" && Session["LoginUser"] == null)
                {
                    string myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventScriptBlock\">\n";
                    myScript += " ShowTimeOut()";
                    myScript += "\n\n </script>";
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "myKey", myScript, false);
                    m_TransResult.isSuccess = false;
                }
                else
                {
                    if (Session["LoginUser"] != null)
                    {
                        m_Employee = (SysEntity.Employee)Session["LoginUser"];

                    }

                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_Employee;
                }
            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }

            // return Tuple.Create(m_TransResult);
            return m_TransResult;
        }


    }
}