using System;
using Business_Logic;
using System.Web.UI;
using Business_Logic.Entity;
using Business_Logic.Model;
using System.Data;
using System.Collections.Generic;
using System.Web.UI.HtmlControls;
using static Business_Logic.Entity.SysEntity;

namespace KF_Web
{
    public partial class MenuSet : System.Web.UI.Page
    {
        public static FunctionHandler g_FH = new FunctionHandler();
        public static BL_System g_BL = new Business_Logic.Model.BL_System();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["LoginUser"] == null)
            {
                Response.Redirect("Login.aspx", false);
            }

            string m_TimeParam = "?d=" + DateTime.Now.ToString("yyyyMMddhhmmss");
            try
            {
                // Page.ClientScript.RegisterClientScriptInclude("MainForm", ResolveUrl("~/Scripts/MainForm.js" + m_TimeParam));
                BasePage m_BasePage = new BasePage();
                SysEntity.Employee m_Employee = new SysEntity.Employee();
                var m_LoinUser = m_BasePage.GetLoinUser(Request);
                if (m_LoinUser.Item1.isSuccess)
                {
                    m_Employee = (SysEntity.Employee)m_LoinUser.Item1.ResultEntity;
                    ((HtmlInputHidden)FindControl("txtCompanyCode")).Value = m_Employee.CompanyCode;
                    ((HtmlInputHidden)FindControl("txtWorkID")).Value = m_Employee.WorkID;
                    ((HtmlInputHidden)FindControl("txtDisplayName")).Value = m_Employee.DisplayName;

                    SysEntity.TransResult m_MenuResult = GetMainModle(m_Employee, m_Employee.CompanyCode);
                    if (m_MenuResult.isSuccess)
                    {
                        Dictionary<string, Object> m_disResult = (Dictionary<string, Object>)m_MenuResult.ResultEntity;
                        divMainMenu.InnerHtml = m_disResult["divMainMenu"].ToString();
                    }


                    string MenuID = Request["MenuID"].ToString();
                    g_FH.GetCtrlSetVal(MenuID, (Control)FindControl("hidMenuID"));
                    //============
                    DataTable m_dttModuleInfo = g_BL.GetModuleInfoByMenuID(m_Employee, MenuID);
                    g_FH.GetCtrlSetVal(m_Employee.WorkID, (Control)FindControl("spWorkID"));
                    //===================
                    foreach (DataRow dr in m_dttModuleInfo.Rows)
                    {
                        string m_ModuleName = dr["ModuleName"].ToString();
                        string m_MenuDesc = dr["MenuDesc"].ToString();
                        g_FH.GetCtrlSetVal(m_Employee.DisplayName, (Control)FindControl("UserInfo"));
                        g_FH.GetCtrlSetVal(m_MenuDesc, (Control)FindControl("PanelTitle"));
                        g_FH.GetCtrlSetVal(m_ModuleName, (Control)FindControl("titleModuleName"));
                        g_FH.GetCtrlSetVal(dr["ModuleImg"].ToString(), (Control)FindControl("imgModule"));
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
                else
                {
                    string myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventScriptBlock\">\n";
                    string m_ErrMSG = m_LoinUser.Item1.LogMessage;
                    myScript += " alert('" + m_ErrMSG + "') </script>";
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "myKey", myScript, false);
                    Response.Write("AD Error:" + m_ErrMSG);
                }

            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetMainModle(SysEntity.Employee p_Employee, string p_SiteID)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();
            string m_MainMenuDesc = "";

            try
            {
                Dictionary<string, Object> m_Site = new Dictionary<string, object>();
                m_Site["SiteID"] = p_SiteID;
                SysEntity.TransResult m_TransResultSite = g_BL.GetSites(p_Employee, m_Site);
                if (m_TransResultSite.isSuccess)
                {
                    foreach (DataRow dr in ((DataTable)m_TransResultSite.ResultEntity).Rows)
                    {
                        m_MainMenuDesc = "主選單";
                    }
                }
                string m_MainMenu = "<ul class='nav sidebar-menu'>{0}</ul>";
                string m_ModleHTML = "<li class='sidebar-label pt20' style=' text-align:left;padding-left:60px '>" + m_MainMenuDesc + "" +
                    "<img class='hand' style='right:10px' onclick='ClickAdd(\"0\");' id='img0' src='/KF_Web/Img/Exp.png' alt='新增功能'>  </li>";//主選單
                string m_ModleDFormat = " <li><a class='accordion-toggle' href='#'> <span class='{0}'></span> <span class='sidebar-title'>{1}</span> <span class='caret'></span> </a>";
                m_ModleDFormat += " <ul class='nav sub-nav'>{2}</ul></li>";




                m_TransResult = g_BL.GetMainModleBySite(p_Employee, p_SiteID);
                if (m_TransResult.isSuccess)
                {
                    DataTable m_dtModle = (DataTable)m_TransResult.ResultEntity;

                    m_ModleHTML += GetModleHTML(p_Employee, m_dtModle.Select("MenuType ='M'"));
                    m_disResult["divMainMenu"] = String.Format(m_MainMenu, m_ModleHTML);

                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_disResult;
                }
            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }


        public static string GetModleHTML(SysEntity.Employee p_Employee, DataRow[] m_drListModle)
        {
            string m_AllModleHTML = "";
            string m_ModleHTML = "";
            string m_ModleFuFormat = "<li><span  MenuID='{0}' target='_blank'> <span class='fa fa-book'></span>{1}</span></li>";//功能
            string m_ModleDFormat = " <li><a class='accordion-toggle' href='#'> <span class='{0}' style='float: none;'></span> <span class='sidebar-title'>{1}" +
                " <img class='hand' style='right:10px' onclick='ClickAdd(\"{2}\",\"{3}\");' id='img{4}' src='/KF_Web/Img/Exp.png' alt='新增功能'>  " +
                "</span>  </a>";//目錄
            m_ModleDFormat += " <ul class='nav sub-nav'>{5}</ul></li>";
            foreach (DataRow dr in m_drListModle)
            {
                SysEntity.TransResult m_MenuResult = g_BL.GetMenuParentID(p_Employee, dr["MenuID"].ToString());
                if (m_MenuResult.isSuccess)
                {
                    string m_SubMenu = "";
                    DataTable m_dtList = (DataTable)m_MenuResult.ResultEntity;
                    m_ModleHTML = "";
                    foreach (DataRow drList in m_dtList.Rows)
                    {
                        string m_MenuParam = "";
                        if (drList["MenuPathParam"].ToString() != "")
                        {
                            m_MenuParam = "?";
                            foreach (string Params in drList["MenuPathParam"].ToString().Split('&'))
                            {
                                if (drList["MenuPathParam"].ToString().Split('=').Length == 2)
                                {
                                    string[] m_arParam = drList["MenuPathParam"].ToString().Split('=');
                                    if (m_arParam[1] == "LoginUser")
                                    {
                                        m_MenuParam += m_arParam[0] + "=" + p_Employee.WorkID + "&";
                                    }
                                }
                            }
                        }
                        if (drList["MenuType"].ToString() == "Fu")
                        {
                            m_ModleHTML += string.Format(m_ModleFuFormat, drList["MenuID"].ToString(), drList["MenuDesc"].ToString());
                        }
                        else if (drList["MenuType"].ToString() == "D")
                        {
                            m_SubMenu = GetModleItem(p_Employee, drList["MenuID"].ToString());
                            m_ModleHTML += string.Format(m_ModleDFormat.Replace("sidebar-title", "fa fa-book"), drList["IconCSS"].ToString(), drList["MenuDesc"].ToString(), m_SubMenu);
                        }
                    }
                }
                m_AllModleHTML += string.Format(m_ModleDFormat, dr["IconCSS"].ToString(), dr["MenuDesc"].ToString(), dr["MenuID"].ToString(), dr["ModuleKey"].ToString(), dr["MenuID"].ToString(), m_ModleHTML);

            }
            return m_AllModleHTML;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static string GetModleItem(SysEntity.Employee p_Employee, string p_MenuID)
        {
            string m_ModleHTML = "";
            string m_ModleFuFormat = "<li><a href='{0}' MenuID='{1}' target='_blank'> <span class='fa fa-book'></span>{2}</a></li>";//功能
            string m_ModleDFormat = " <li><a class='accordion-toggle' href='#'> <span></span> <span class='fa fa-book'>{0}</span> <span class='caret'></span> </a>";
            m_ModleDFormat += " <ul class='nav sub-nav'>{1}</ul></li>";
            SysEntity.TransResult m_MenuResult = g_BL.GetMenuParentID(p_Employee, p_MenuID);
            if (m_MenuResult.isSuccess)
            {
                DataTable m_dtList = (DataTable)m_MenuResult.ResultEntity;
                m_ModleHTML = "";
                foreach (DataRow drList in m_dtList.Rows)
                {
                    if (drList["MenuType"].ToString() == "Fu")
                    {
                        m_ModleHTML += string.Format(m_ModleFuFormat, drList["MenuPath"].ToString(), drList["MenuID"].ToString(), drList["MenuDesc"].ToString());
                    }
                    else if (drList["MenuType"].ToString() == "D")
                    {
                        string m_SubMenu = GetModleItem(p_Employee, drList["MenuID"].ToString());
                        m_ModleHTML += string.Format(m_ModleDFormat, drList["MenuDesc"].ToString(), m_SubMenu);
                    }
                }
            }
            return m_ModleHTML;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetMainMenuInfo(SysEntity.Employee p_Employee, string MenuType, string SiteID ,string MenuID)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();

            try
            {
                SysEntity.TransResult m_TransResultSite = g_BL.GetMainMenuInfo(p_Employee, MenuType, SiteID, MenuID);
                if (m_TransResultSite.isSuccess)
                {
                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_TransResultSite.ResultEntity;
                }

            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAuthMenuInfo(SysEntity.Employee p_Employee,  string MenuID)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();

            try
            {
                SysEntity.TransResult m_TransResultSite = g_BL.GetAuthMenuInfo(p_Employee, MenuID);
                if (m_TransResultSite.isSuccess)
                {
                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_TransResultSite.ResultEntity;
                }

            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }





        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetMenuForm(SysEntity.Employee p_Employee, string ActType)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();

            try
            {
                SysEntity.TransResult m_TransResultSite = g_BL.GetMenuForm(p_Employee);
                if (m_TransResultSite.isSuccess)
                {
                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_TransResultSite.ResultEntity;
                }

            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetModuleKey(SysEntity.Employee p_Employee, string SiteID, string ActType, string MenuType)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();

            try
            {
                SysEntity.TransResult m_TransResultSite = g_BL.GetModuleKey(p_Employee, SiteID, ActType, MenuType);
                m_TransResult = m_TransResultSite;
            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }


        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetGroupInfo(SysEntity.Employee p_Employee, string MenuID, string ActType)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();

            try
            {
                SysEntity.TransResult m_TransResultSite = g_BL.GetGroupInfo(p_Employee, MenuID, ActType);
                m_TransResult = m_TransResultSite;
            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }

        

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult MaintainMainMenu(SysEntity.Employee p_Employee,string ActType, MainMenu objMainMenu)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();

            try
            {
                SysEntity.TransResult m_TransResultSite = g_BL.MaintainMainMenu(p_Employee, ActType, objMainMenu);
                if (m_TransResultSite.isSuccess)
                {
                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_TransResultSite.ResultEntity;
                }

            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult MaintainAuthMenu(SysEntity.Employee p_Employee, string ActType, AuthMenu objAuthMenu)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();

            try
            {
                SysEntity.TransResult m_TransResultSite = g_BL.MaintainAuthMenu(p_Employee, ActType, objAuthMenu);
                if (m_TransResultSite.isSuccess)
                {
                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_TransResultSite.ResultEntity;
                }

            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }

        


    }
}