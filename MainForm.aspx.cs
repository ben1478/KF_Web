using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Business_Logic.Entity;
using Business_Logic;
using Business_Logic.Model;
using System.Data;
using System.Configuration;

namespace KF_Web
{
    public partial class MainForm : System.Web.UI.Page
    {
        public static Business_Logic.Model.BL_System g_BL_System = new BL_System();
        public static FunctionHandler g_FH = new FunctionHandler();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["LoginUser"] == null)
            {
                Response.Redirect("Login.aspx", false);
            }

            string m_TimeParam = "?d=" + DateTime.Now.ToString("yyyyMMddhhmmss");
            try
            {
                Page.ClientScript.RegisterClientScriptInclude("MainForm", ResolveUrl("~/Scripts/MainForm.js" + m_TimeParam));
                BasePage m_BasePage = new BasePage();
                SysEntity.Employee m_Employee = new SysEntity.Employee();
                var m_LoinUser = m_BasePage.GetLoinUser(Request);
                if (m_LoinUser.Item1.isSuccess)
                {
                    m_Employee = (SysEntity.Employee)m_LoinUser.Item1.ResultEntity;
                    ((System.Web.UI.WebControls.TextBox)FindControl("txtCompanyCode")).Text = m_Employee.CompanyCode;
                    ((System.Web.UI.WebControls.TextBox)FindControl("txtWorkID")).Text = m_Employee.WorkID;
                    ((System.Web.UI.WebControls.TextBox)FindControl("txtDisplayName")).Text = m_Employee.DisplayName;
                    spDisPlayName.InnerText = m_Employee.DisplayName;
                    SysEntity.TransResult m_CarouselResult = GetPeriodCarouselBySite(m_Employee, m_Employee.CompanyCode);
                    if (m_CarouselResult.isSuccess)
                    {
                        Dictionary<string, Object> m_disResult = (Dictionary<string, Object>)m_CarouselResult.ResultEntity;
                        divPageCarousels.InnerHtml = m_disResult["divPageCarousels"].ToString();
                        ulCarouselTab.InnerHtml = m_disResult["ulCarouselTab"].ToString();
                    }

                    SysEntity.TransResult m_MenuResult = GetMainModle(m_Employee, m_Employee.CompanyCode);
                    if (m_MenuResult.isSuccess)
                    {
                        Dictionary<string, Object> m_disResult = (Dictionary<string, Object>)m_MenuResult.ResultEntity;
                        divLeave.InnerHtml = m_disResult["divLeave"].ToString();
                        divIssue.InnerHtml = m_disResult["divIssue"].ToString();
                        divRoom.InnerHtml = m_disResult["divRoom"].ToString();
                        divFavorite.InnerHtml = m_disResult["divFavorite"].ToString();
                        divFavoriteList.InnerHtml = m_disResult["divFavoriteList"].ToString();
                        divMainMenu.InnerHtml = m_disResult["divMainMenu"].ToString();
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
        public static SysEntity.TransResult GetPeriodCarouselBySite(SysEntity.Employee p_Employee,string p_SiteID)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();

            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();
            try
            {
                string m_CarouselItem = "<div id='divCarousel' style='width:100%' title='Click' onclick='GoToCarouselLink(\"{0}\")' class='Carousel hand item {1}'> <img Width='100%' Height='100%' alt='' src='{2}'/>";
                m_CarouselItem += "<div class='carousel-caption'>";
                m_CarouselItem += "<h2>{3}</h2>";
                m_CarouselItem += " <p>{4} </p>";
                m_CarouselItem += " </div>";
                m_CarouselItem += "</div>";
                string m_CarouselTab = "<li data-target='#myCarousel' data-slide-to='{0}' class='{1}' ><a href='#'>{2}</a></li>";
                SysEntity.TransResult m_CarouselResult = g_BL_System.GetPeriodCarousel(p_Employee, p_SiteID);

                if (m_CarouselResult.isSuccess)
                {
                    string m_divPageCarouselsHTML = "";
                    string m_ulCarouselTabHTML = "";

                    Int32 m_Count = 0;
                    foreach (DataRow dr in ((DataTable)m_CarouselResult.ResultEntity).Rows)
                    {
                        Byte[] bytes = null;
                        string m_Image = "";
                        if (dr["FileEntity"].ToString() != "")
                        {
                            bytes = g_FH.Decompress((Byte[])dr["FileEntity"]);
                            m_Image = "data:image/png;base64," + Convert.ToBase64String(bytes);
                        }
                        string m_active = "";
                        if (m_Count == 0)
                        {
                            m_active = "active";
                        }
                        if (dr["CarouselLink"].ToString() == "")
                        {
                            m_divPageCarouselsHTML += string.Format(m_CarouselItem, dr["CarouselLink"].ToString(), m_active, m_Image, dr["CarouselCaption"].ToString(), dr["CarouselDepiction"].ToString()).Replace("title='Click'", " ").Replace("class='hand item", "class='item");
                        }
                        else
                        {
                            m_divPageCarouselsHTML += string.Format(m_CarouselItem, dr["CarouselLink"].ToString(), m_active, m_Image, dr["CarouselCaption"].ToString(), dr["CarouselDepiction"].ToString());
                        }

                        m_ulCarouselTabHTML += string.Format(m_CarouselTab, m_Count.ToString(), m_active, dr["CarouselType"].ToString());
                        m_Count++;
                    }
                    m_disResult["divPageCarousels"] = m_divPageCarouselsHTML;
                    m_disResult["ulCarouselTab"] = m_ulCarouselTabHTML;
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
     
        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetSiteMenu(SysEntity.Employee p_Employee)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = g_BL_System.GetSiteMenu(p_Employee);
            if(m_TransResult.isSuccess)
            {
                m_TransResult.ResultEntity = g_FH.RowsToDictionary((DataTable)m_TransResult.ResultEntity);
            }
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetEIP_SignBox(SysEntity.Employee p_Employee)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = new SysEntity.TransResult();

            if (m_TransResult.isSuccess)
            {
                if (m_TransResult.ResultEntity != null)
                {
                    m_TransResult.ResultEntity = (List<Dictionary<string, Object>>)m_TransResult.ResultEntity;
                }
            }
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetNewEIP_SignBox(SysEntity.Employee p_Employee,string p_ErrMSG)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            try
            {
                if (p_Employee.WorkID != "")
                {
                    SysEntity.SmtpMail m_SmtpMail = new SysEntity.SmtpMail();
                    string strAddress = g_FH.GetMAIL_SYSTEMADMIN();
                    m_SmtpMail.MailTo = strAddress;
                    m_SmtpMail.Subject = "Employee: " + p_Employee.WorkID + " GetOldEIP_SignBox Error:" + p_ErrMSG;
                    m_SmtpMail.Body = "Employee: " + p_Employee.WorkID + " GetOldEIP_SignBox Error:" + p_ErrMSG;
                    if (p_Employee.WorkID == "10000002")
                    {
                        g_FH.SendMail(m_SmtpMail);
                    
                    }
                    m_TransResult = new SysEntity.TransResult();
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
        public static string GetModleItem( SysEntity.Employee p_Employee,string p_MenuID)
        {
            string m_ModleHTML = "";
            string m_ModleFuFormat = "<li><a href='{0}' MenuID='{1}' target='_blank'> <span class='fa fa-book'></span>{2}</a></li>";//功能
            string m_ModleDFormat = " <li><a class='accordion-toggle' href='#'> <span></span> <span class='fa fa-book'>{0}</span> <span class='caret'></span> </a>";
            m_ModleDFormat += " <ul class='nav sub-nav'>{1}</ul></li>";
            SysEntity.TransResult m_MenuResult = g_BL_System.GetMenuByMenuID(p_Employee, p_MenuID);
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

        public static string GetModleHTML(SysEntity.Employee p_Employee, DataRow[] m_drListModle)
        {
            string m_AllModleHTML = "";
            string m_ModleHTML = "";
            string m_ModleFuFormat = "<li><a href='{0}' MenuID='{1}' target='_blank'> <span class='fa fa-book'></span>{2}</a></li>";//功能
            string m_ModleDFormat = " <li><a class='accordion-toggle' href='#'> <span class='{0}'></span> <span class='sidebar-title'>{1}</span> <span class='caret'></span> </a>";//目錄
            m_ModleDFormat += " <ul class='nav sub-nav'>{2}</ul></li>";
            foreach (DataRow dr in m_drListModle)
            {
                SysEntity.TransResult m_MenuResult = g_BL_System.GetMenuByMenuID(p_Employee, dr["MenuID"].ToString());
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
                                if(drList["MenuPathParam"].ToString().Split('=').Length==2)
                                {
                                    string[] m_arParam = drList["MenuPathParam"].ToString().Split('=');
                                    if (m_arParam[1] == "LoginUser")
                                    {
                                        m_MenuParam += m_arParam[0] + "=" + p_Employee.WorkID+"&";
                                    }
                                }
                            }
                        }
                        if (drList["MenuType"].ToString() == "Fu")
                        {
                            m_ModleHTML += string.Format(m_ModleFuFormat, drList["MenuPath"].ToString() + m_MenuParam, drList["MenuID"].ToString(), drList["MenuDesc"].ToString());
                        }
                        else if (drList["MenuType"].ToString() == "D")
                        {
                             m_SubMenu = GetModleItem(p_Employee, drList["MenuID"].ToString());
                             m_ModleHTML += string.Format(m_ModleDFormat.Replace("sidebar-title", "fa fa-book"), drList["IconCSS"].ToString(), drList["MenuDesc"].ToString(), m_SubMenu);
                        }
                    }
                }
                m_AllModleHTML += string.Format(m_ModleDFormat, dr["IconCSS"].ToString(), dr["MenuDesc"].ToString(), m_ModleHTML);
            }
            return m_AllModleHTML;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetMainModle(SysEntity.Employee p_Employee, string p_SiteID)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disResult = new Dictionary<string, object>();
            string m_MainMenuDesc = "";
            string m_ExternalMenuDesc = "";
            try
            {
                Dictionary<string, Object> m_Site = new Dictionary<string, object>();
                m_Site["SiteID"] = p_SiteID;
                SysEntity.TransResult m_TransResultSite = g_BL_System.GetSites(p_Employee, m_Site);
                if (m_TransResultSite.isSuccess)
                {
                    foreach (DataRow dr in ((DataTable)m_TransResultSite.ResultEntity).Rows)
                    {
                        if (dr["Language"].ToString() == "TW")
                        {
                            m_MainMenuDesc = "主選單";
                            m_ExternalMenuDesc = "外部系統";
                        }
                        else
                        {
                            m_MainMenuDesc = "Main Menu";
                            m_ExternalMenuDesc = "External Menu";
                        }
                    }
                }
                string m_MainMenu = "<ul class='nav sidebar-menu'>{0}</ul>";
                string m_ModleHTML = "<li class='sidebar-label pt20'>" + m_MainMenuDesc + "</li>";//主選單
                string m_ModleFuFormat = "<li><a href='{0}'> <span class='fa fa-book'></span>{2}</a></li>";//功能
                string m_ModleDFormat = " <li><a class='accordion-toggle' href='#'> <span class='{0}'></span> <span class='sidebar-title'>{1}</span> <span class='caret'></span> </a>";
                m_ModleDFormat += " <ul class='nav sub-nav'>{2}</ul></li>";

                string m_OutsiteHTML = "<li class='sidebar-label pt20'>" + m_ExternalMenuDesc + "</li>";//外部系統
                string m_OutsiteFormat = "<li><a href='{0}' target='_blank'> <span class='fa {1}'></span> <span class='sidebar-title'>{2}</span> </a></li>";

                string m_LeaveHTML = "";//差假管理
                string m_IssueHTML = "";//Issue Report 操作問題
                string m_FavoriteHTML = "<span class='panel-title'><i class='fa {0}'></i>{1}</span>";//常用功能
                string m_FavoriteListHTML = "";//常用項目
                string m_RoomHTML = "";//電話/會議室
                string m_FavoriteListFormat = "<a href='{0}' class='list-group-item'>{1}</a>";
                m_IssueHTML = " <a href='{0}' target='_blank' class='text-white tile-btn'> <i class='fa fa-question-circle icon-bg'></i><h2 class='mt15 lh15'><b>{1}</b></h2><h5 class='text-muted'>　</h5></a>";
                //項目:差假、會議室Html結構
                string m_TitleFormat = " <div class='panel-heading'> <span class='panel-title'><i class='fa {0}'></i>{1}</span> </div><div class='panel-menu'><div class='panel-menu'>{2}</div></div>";
                string m_ButtonFormat = "<button type='button' class='btn btn-default light mr10 mb5' onclick='OpenFunction(\"{0}\")'> <span class='fa {1} pr5'></span>{2}</button>";
                m_TransResult = g_BL_System.GetMainModle(p_Employee, p_SiteID);
                if (m_TransResult.isSuccess)
                {
                    DataTable m_dtModle = (DataTable)m_TransResult.ResultEntity;
                    foreach (DataRow dr in m_dtModle.Select("MenuType ='L'"))//差假管理
                    {
                        SysEntity.TransResult m_MenuResult = g_BL_System.GetMenuByMenuID(p_Employee, dr["MenuID"].ToString());
                        string m_ButtonHTML = "";
                        if (m_MenuResult.isSuccess)
                        {
                            DataTable m_dtButton = (DataTable)m_MenuResult.ResultEntity;
                            foreach (DataRow drList in m_dtButton.Rows)
                            {
                                m_ButtonHTML += String.Format(m_ButtonFormat, drList["MenuPath"].ToString(), drList["IconCSS"].ToString(), drList["MenuDesc"].ToString());
                            }
                            m_LeaveHTML = String.Format(m_TitleFormat, dr["IconCSS"].ToString(), dr["MenuDesc"].ToString(), m_ButtonHTML);
                        }

                    }
                    foreach (DataRow dr in m_dtModle.Select("MenuType ='R'"))//電話/會議室
                    {
                        SysEntity.TransResult m_MenuResult = g_BL_System.GetMenuByMenuID(p_Employee, dr["MenuID"].ToString());
                        string m_ButtonHTML = "";
                        if (m_MenuResult.isSuccess)
                        {
                            DataTable m_dtButton = (DataTable)m_MenuResult.ResultEntity;
                            foreach (DataRow drList in m_dtButton.Rows)
                            {
                                m_ButtonHTML += String.Format(m_ButtonFormat, drList["MenuPath"].ToString(), drList["IconCSS"].ToString(), drList["MenuDesc"].ToString());
                            }
                            m_RoomHTML = String.Format(m_TitleFormat, dr["IconCSS"].ToString(), dr["MenuDesc"].ToString(), m_ButtonHTML);
                        }
                    }
                    foreach (DataRow dr in m_dtModle.Select("MenuType ='I'"))//Issue Report 操作問題
                    {
                        m_IssueHTML = string.Format(m_IssueHTML, dr["MenuPath"].ToString(), dr["MenuDesc"].ToString());
                    }

                    foreach (DataRow dr in m_dtModle.Select("MenuType ='Fa'"))//常用功能
                    {
                        SysEntity.TransResult m_MenuResult = g_BL_System.GetMenuByMenuID(p_Employee, dr["MenuID"].ToString());
                        string m_ListHTML = "";
                        if (m_MenuResult.isSuccess)
                        {
                            DataTable m_dtList = (DataTable)m_MenuResult.ResultEntity;
                            foreach (DataRow drList in m_dtList.Rows)
                            {
                                m_ListHTML += String.Format(m_FavoriteListFormat, drList["MenuPath"].ToString(), drList["MenuDesc"].ToString());
                            }
                            m_FavoriteListHTML = m_ListHTML;//常用項目
                            m_FavoriteHTML = String.Format(m_FavoriteHTML, dr["IconCSS"].ToString(), dr["MenuDesc"].ToString());
                        }
                    }

                  /*  foreach (DataRow dr in m_dtModle.Select("MenuType ='O'"))//外部系統
                    {
                        m_OutsiteHTML += String.Format(m_OutsiteFormat, dr["MenuPath"].ToString(), dr["IconCSS"].ToString(), dr["MenuDesc"].ToString());
                    }*/
                    m_ModleHTML += GetModleHTML(p_Employee, m_dtModle.Select("MenuType ='M'"));
                    //m_disResult["divMainMenu"] = String.Format(m_MainMenu, m_ModleHTML + m_OutsiteHTML);
                    m_disResult["divMainMenu"] = String.Format(m_MainMenu, m_ModleHTML );

                    m_disResult["divFavorite"] = m_FavoriteHTML;
                    m_disResult["divFavoriteList"] = m_FavoriteListHTML;
                    m_disResult["divLeave"] = m_LeaveHTML;
                    m_disResult["divRoom"] = m_RoomHTML;
                    m_disResult["divIssue"] = m_IssueHTML;
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

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetLeaveDayInfo(SysEntity.Employee p_Employee)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Dictionary<string, Object> m_disLeaveDayInfo = new Dictionary<string, object>();
            try
            {
                SysEntity.TransResult m_LeaveDayResult = new SysEntity.TransResult();
                if (m_LeaveDayResult.isSuccess)
                {
                    m_disLeaveDayInfo = (Dictionary<string, Object>)m_LeaveDayResult.ResultEntity;
                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_disLeaveDayInfo;
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