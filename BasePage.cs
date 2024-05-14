using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Reflection;
using Business_Logic.Entity;
using Business_Logic.Model;
using System.Data;
using System.Web.UI.HtmlControls;
using Business_Logic;
using System.Collections;
using System.Globalization;
using System.Net;
using System.Net.Sockets;



namespace KF_Web
{
    public class BasePage : System.Web.UI.Page
    {
        public static Business_Logic.Model.BL_System g_BL_System = new BL_System();
        public static FunctionHandler g_FH = new FunctionHandler();
        public static string g_Language = "";
        protected override void OnLoad(EventArgs e)
        {
            try
            {
                
                Boolean m_IsMobile = g_FH.GetDeviceIsMobile(Request.ServerVariables["HTTP_USER_AGENT"].ToString());
                string m_TimeParam = "?d=" + DateTime.Now.ToString("yyyyMMddhhmmss");
                Page.ClientScript.RegisterClientScriptInclude("FunctionHandler", ResolveUrl("~/Scripts/FunctionHandler.js" + m_TimeParam));
                Page.ClientScript.RegisterClientScriptInclude("ValidatedHandler", ResolveUrl("~/Scripts/ValidatedHandler.js" + m_TimeParam));
                Page.ClientScript.RegisterClientScriptInclude("GridData", ResolveUrl("~/Scripts/GridData.js" + m_TimeParam));

                SysEntity.Employee m_Employee = new SysEntity.Employee();
              
                string m_SiteFormID = "";
                SysEntity.TransResult m_LoinUserResult = new SysEntity.TransResult();
                ArrayList m_EmployeeErr = new ArrayList();
                var m_LoinUser = GetLoinUser(Request);
                if (m_LoinUser.Item1.isSuccess)
                {
                    m_Employee = (SysEntity.Employee)m_LoinUser.Item1.ResultEntity;

                    ((System.Web.UI.WebControls.HiddenField)FindControl("hidIsMobile")).Value = m_IsMobile ? "Y" : "N";
                    ((System.Web.UI.WebControls.TextBox)FindControl("txtAccount")).Text = m_Employee.DisplayName;
                    ((System.Web.UI.WebControls.TextBox)FindControl("txtCompanyCode")).Text = m_Employee.CompanyCode;
                    ((System.Web.UI.WebControls.TextBox)FindControl("txtWorkID")).Text = m_Employee.WorkID;
                    ((System.Web.UI.WebControls.TextBox)FindControl("txtDisplayName")).Text = m_Employee.DisplayName;
                    g_FH.GetCtrlSetVal(m_Employee.GroupID, (Control)FindControl("txtGroupID"));

                    System.Web.UI.HtmlControls.HtmlSelect m_selLanguage = ((System.Web.UI.HtmlControls.HtmlSelect)FindControl("selLanguage"));
                    ListItem li = m_selLanguage.Items.FindByValue("TW");
                    if (li != null)
                    {
                        li.Selected = true;
                    }
                    else
                    {
                        li = m_selLanguage.Items.FindByValue("TW");
                        li.Selected = true;
                    }

                    if (FindControl("FormInitial") != null)
                    {
                        if (Request.QueryString["SiteFormID"] != null)
                        {
                            m_SiteFormID = Request.QueryString["SiteFormID"].ToString();
                        }
                        else
                        {
                            m_SiteFormID = "1000SYS0001";
                        }
                        m_Employee.CurrentSiteForm = m_SiteFormID;

                        TextBox m_TextBox = ((TextBox)FindControl("txtSiteFormID"));
                        m_TextBox.Text = m_SiteFormID;

                        DataTable m_ViewDetail = new DataTable();
                        string m_TempKey = "";
                        if (Request.QueryString["TempKey"] == null)
                        {
                            m_ViewDetail = g_BL_System.GetViewDetailBySiteFormID(m_Employee, m_SiteFormID);//GetViewDetail(g_Employee, m_SiteFormID);
                        }
                        else
                        {
                            m_TempKey = Request.QueryString["TempKey"].ToString();
                            m_ViewDetail = g_BL_System.GetViewDetailBySiteFormID(m_Employee, m_SiteFormID, m_TempKey);//GetViewDetail(g_Employee, m_SiteFormID);
                        }

                        foreach (DataRow drSection in m_ViewDetail.Rows)
                        {

                            string m_HTML = "";
                            //狀態搜尋
                            Dictionary<string, bool> m_disStatusSearch = null;
                            if (((HtmlGenericControl)FindControl("divInitButton")) != null)
                            {
                                m_disStatusSearch = new Dictionary<string, bool>();
                                DataTable m_dtFieldID = g_BL_System.GetSiteFromStatusFieldIDsBySiteFromID(m_Employee, m_SiteFormID);
                                foreach (DataRow drField in m_dtFieldID.Rows)
                                {
                                    string m_Field = drField["FieldID"].ToString();
                                    if (((HtmlGenericControl)FindControl("divInitButton")).InnerHtml.IndexOf("btn" + m_Field) == -1)
                                    {
                                        m_disStatusSearch[m_Field] = false;
                                    }
                                    else
                                    {
                                        m_disStatusSearch[m_Field] = true;
                                    }
                                }
                            }
                            m_HTML = g_FH.GeneratorForm(m_Employee, m_SiteFormID, drSection["SectionID"].ToString(), g_Language, "", null, null, m_TempKey, m_disStatusSearch, m_IsMobile);

                            HtmlGenericControl m_ControlItem = ((HtmlGenericControl)FindControl(drSection["SectionID"].ToString()));
                            if (drSection["SectionID"].ToString() == "divQueryArea")//表單Title
                            {
                                string m_PanelTitle = "<label id='lblSiteForm" + m_SiteFormID + "'>{0}</label>";
                                m_PanelTitle = string.Format(m_PanelTitle, g_FH.GetMultiLanguage("SiteForm" + m_SiteFormID, g_Language, m_Employee));
                                HtmlGenericControl m_ControlTitle = ((HtmlGenericControl)FindControl("PanelTitle"));
                                m_ControlTitle.InnerHtml = m_PanelTitle;
                                m_HTML = "<div class='panel'> <div class='panel-body PanelLeft'>" + m_HTML + "</div></div>";
                            }
                            m_ControlItem.InnerHtml = m_HTML;
                        }
                    }
                    else
                    {
                        if (Request.QueryString["SiteFormID"] != null)
                        {
                            m_Employee.CurrentSiteForm = Request.QueryString["SiteFormID"].ToString();
                            Dictionary<string, object> m_SiteFormKey = new Dictionary<string, object>();
                            string m_KeyNames = "";
                            if (Request.QueryString["KeyNames"] != null)
                            {
                                m_SiteFormID = Request.QueryString["SiteFormID"].ToString();
                                Dictionary<string, object> m_ViewDetail = new Dictionary<string, object>();
                                m_ViewDetail["SiteFormID"] = m_SiteFormID;
                                m_ViewDetail["FieldID"] = "Query";
                                SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
                                m_TransResult = g_BL_System.GetViewDetails(m_Employee, m_ViewDetail);
                                if (m_TransResult.isSuccess)
                                {
                                    m_KeyNames = Request.QueryString["KeyNames"];
                                    foreach (string KeyName in m_KeyNames.Split(','))
                                    {
                                        if (Request.QueryString[KeyName] != null)
                                        {
                                            m_SiteFormKey[KeyName] = Request.QueryString[KeyName].ToString();
                                        }
                                    }
                                    DataTable m_dtResult = (DataTable)m_TransResult.ResultEntity;
                                    string m_FormHTML = "";
                                    foreach (DataRow dr in m_dtResult.Rows)
                                    {
                                        m_TransResult = GeneratorMaintain(m_Employee, m_SiteFormID, dr["EventID"].ToString(), "Query", "Qry", g_Language, dr["QueryMethod"].ToString(), m_SiteFormKey, "");
                                    }
                                    if (m_TransResult.isSuccess)
                                    {
                                        HtmlGenericControl m_MaintainForm = ((HtmlGenericControl)FindControl("MaintainForm"));
                                        m_FormHTML = m_TransResult.ResultEntity.ToString();
                                        m_MaintainForm.InnerHtml = m_FormHTML;
                                    }
                                }
                            }
                        }
                    }
                    string MenuID = Request["MenuID"].ToString();
                    DataTable m_dttModuleInfo = g_BL_System.GetModuleInfoByMenuID(m_Employee, MenuID);
                    foreach (DataRow dr in m_dttModuleInfo.Rows)
                    {
                        ((System.Web.UI.HtmlControls.HtmlImage)FindControl("imgModule")).Src = dr["ModuleImg"].ToString();

                        string m_ModuleName = dr["ModuleName"].ToString();
                        string m_MenuDesc = dr["MenuDesc"].ToString();


                        System.Web.UI.HtmlControls.HtmlGenericControl m_PanelTitle = ((System.Web.UI.HtmlControls.HtmlGenericControl)FindControl("PanelTitle"));
                        m_PanelTitle.InnerText = m_MenuDesc;

                        System.Web.UI.HtmlControls.HtmlGenericControl m_titleModuleName = ((System.Web.UI.HtmlControls.HtmlGenericControl)FindControl("titleModuleName"));
                        m_titleModuleName.InnerText = m_ModuleName;
                        m_titleModuleName.Attributes["ModKey"] = dr["ModuleKey"].ToString();
                        ((System.Web.UI.HtmlControls.HtmlImage)FindControl("imgModule")).Src = dr["ModuleImg"].ToString();
                        string m_Content = dr["ModuleContent"].ToString();
                        string m_ModuleContent = "table-layout " + m_Content + " animated fadeIn";
                        System.Web.UI.HtmlControls.HtmlGenericControl m_Pagedep = ((System.Web.UI.HtmlControls.HtmlGenericControl)FindControl("pagedep"));
                        m_Pagedep.Attributes.Add("class", "page-heading " + dr["ModulePagedep"].ToString() + " text-left");
                        string myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventScriptBlock\">\n";
                        myScript += " $(function () { $('#content').attr('class','" + m_ModuleContent + "'); $('#content').attr('CssContent','" + m_Content + "')  }); ";
                        myScript += "\n\n </script>";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "myKey", myScript, false);
                    }


                }


            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
            base.OnLoad(e);
        }

        public static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("No network adapters with an IPv4 address in the system!");
        }

        public  Tuple<SysEntity.TransResult> GetLoinUser(HttpRequest p_Request)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            SysEntity.TransResult m_ADResult = new SysEntity.TransResult();
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

            return Tuple.Create(m_TransResult);
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetLanguage(SysEntity.Employee p_Employee, string p_Language, string[] p_Keys)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = g_BL_System.GetListMultiLanguage(p_Employee, p_Language, p_Keys);
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult ActionModel(SysEntity.Employee p_Employee, string p_EventID, Dictionary<string, Object> p_Entity, string p_PageIndex, Dictionary<string, Object> p_ActionRef = null)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            BL_System m_BL_System = new BL_System();
            SysEntity.EventSetting m_EventEntry = new SysEntity.EventSetting();
            try
            {
                m_EventEntry.EventID = p_EventID;
                m_TransResult = m_BL_System.GetEventSetting(p_Employee, m_EventEntry);
                string m_EventModel = "";
                string m_EventAction = "";
                string m_EventActionType = "";
                string m_EventRef = "";
                string m_EventCtrl = "";
                if (m_TransResult.isSuccess)
                {
                    foreach (DataRow dr in ((DataTable)m_TransResult.ResultEntity).Rows)
                    {
                        m_EventModel = dr["EventModel"].ToString();
                        m_EventAction = dr["EventAction"].ToString();
                        m_EventActionType = dr["EventActionType"].ToString();
                        m_EventRef = dr["EventRef"].ToString();
                        m_EventCtrl = dr["EventCtrl"].ToString();

                    }
                }
                Type m_Type = g_FH.GetBLType(m_EventModel);

                object instance = Activator.CreateInstance(m_Type);
                MethodInfo method = instance.GetType().GetMethod(m_EventAction);
                object[] m_Params = new object[2];

                if (m_EventActionType == "GridData" || m_EventActionType == "GridDataGroup")
                {
                    ParameterInfo[] pars = method.GetParameters();


                    if (p_PageIndex == "")
                    {
                        p_PageIndex = "1";
                    }

                    m_Params = new object[pars.Length ];
                    m_Params[0] = p_Employee;
                    m_Params[1] = p_Entity;
                    m_Params[2] = p_PageIndex;
                    if (m_EventRef != "")
                    {
                        if (m_EventActionType == "GridData")
                        {
                            m_Params[3] = m_EventRef.Split(';')[1];
                        }
                        else
                        {
                            m_Params[3] = m_EventRef.Split(';')[2];
                        }
                        if (p_ActionRef != null)
                        {
                            m_Params[4] = p_ActionRef;
                        }
                        else
                        {
                            Dictionary<string, Object> m_dicOrderBy = new Dictionary<string, object>();
                            m_dicOrderBy["OrderBy"] = m_EventRef.Split(';')[0];
                            if (m_EventActionType == "GridDataGroup")
                            {
                                m_dicOrderBy["GroupBy"] = m_EventRef.Split(';')[1];
                            }
                            else
                            {
                                if (m_EventRef.Split(';').Length == 3)
                                {
                                    m_dicOrderBy["OrderBy"] = m_EventRef.Split(';')[2];
                                }
                            }
                            m_Params[4] = m_dicOrderBy;
                        }
                    }
                    else
                    {
                        m_EventEntry = new SysEntity.EventSetting();
                        m_TransResult.isSuccess = false;
                        m_TransResult.LogMessage = "EventID:" + p_EventID + ";EventRef setting error";
                        m_TransResult.ResultEntity = null;
                        return m_TransResult;
                    }


                    m_TransResult = (SysEntity.TransResult)method.Invoke(instance, m_Params);

                    if ((m_EventActionType == "GridData" || m_EventActionType == "GridDataGroup") && m_EventRef != "")
                    {
                        m_TransResult.GridKey = m_EventRef.Split(';')[0];
                        if (m_EventCtrl != "")
                        {
                            m_TransResult.GridKey += ";" + m_EventCtrl;
                        }
                    }
                    return m_TransResult;

                }
                else
                {
                    m_TransResult = new SysEntity.TransResult();
                    m_Params[0] = p_Employee;
                    m_Params[1] = p_Entity;
                    m_TransResult = (SysEntity.TransResult)method.Invoke(instance, m_Params);
                    if (m_TransResult.isSuccess)
                    {
                        if (m_TransResult.ResultEntity != null)
                        {
                            if (m_TransResult.ResultEntity.GetType().ToString() == "System.Data.DataTable")
                            {
                                m_TransResult.ResultEntity = g_FH.DataTableToJson((DataTable)m_TransResult.ResultEntity);
                            }
                        }

                    }
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
        public static SysEntity.TransResult GetGrids(SysEntity.Employee p_Employee, string p_EventID, Dictionary<string, Object> p_Entity)
        {
            BL_System m_BL_System = new BL_System();
            SysEntity.EventSetting m_EventEntry = new SysEntity.EventSetting();
            m_EventEntry.EventID = p_EventID;
            SysEntity.TransResult m_TransResult = m_BL_System.GetEventSetting(p_Employee, m_EventEntry);
            string m_EventModel = "";
            string m_EventAction = "";

            if (m_TransResult.isSuccess)
            {
                foreach (DataRow dr in ((DataTable)m_TransResult.ResultEntity).Rows)
                {
                    m_EventModel = dr["EventModel"].ToString();
                    m_EventAction = dr["EventAction"].ToString();
                }
            }
            Type m_Type = g_FH.GetBLType(m_EventModel);

            object instance = Activator.CreateInstance(m_Type);
            MethodInfo method = instance.GetType().GetMethod(m_EventAction);
            object[] m_Params = new object[2];
            m_Params[0] = p_Employee;
            m_Params[1] = p_Entity;
            m_TransResult = (SysEntity.TransResult)method.Invoke(instance, m_Params);
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GeneratorMaintain(SysEntity.Employee p_Employee, string p_SiteFormID, string p_EventID, string p_FieldID, string p_ActionMode, string p_Language, string p_QueryMethod, Dictionary<string, Object> p_Entity, string p_TempKey)
        {
            DataTable m_dtDataEntity = new DataTable("DataEntity");
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            if (p_QueryMethod != "")
            {
                if (p_ActionMode != "Add")
                {
                    SysEntity.EventSetting m_EventEntry = new SysEntity.EventSetting();
                    m_EventEntry.EventID = p_QueryMethod;
                    SysEntity.TransResult m_QTransResult = g_BL_System.GetEventSetting(p_Employee, m_EventEntry);
                    string m_EventModel = "";
                    string m_EventAction = "";

                    if (m_QTransResult.isSuccess)
                    {
                        foreach (DataRow dr in ((DataTable)m_QTransResult.ResultEntity).Rows)
                        {
                            m_EventModel = dr["EventModel"].ToString();
                            m_EventAction = dr["EventAction"].ToString();
                        }
                        Type m_Type = g_FH.GetBLType(m_EventModel);
                        SysEntity.TransResult m_EnTransResult = g_BL_System.GetEventSetting(p_Employee, m_EventEntry);
                        object instance = Activator.CreateInstance(m_Type);
                        MethodInfo method = instance.GetType().GetMethod(m_EventAction);
                        object[] m_Params = new object[2];
                        m_Params[0] = p_Employee;
                        m_Params[1] = p_Entity;

                        m_EnTransResult = (SysEntity.TransResult)method.Invoke(instance, m_Params);
                        if (m_EnTransResult.isSuccess)
                        {
                            m_dtDataEntity = (DataTable)m_EnTransResult.ResultEntity;
                        }
                    }
                }
            }
            string m_Result = "";
            string m_DocID = "";
            try
            {   //判斷m_dtDataEntity 有沒有DocID欄位 有的話要以DocID 抓出表單的SiteFormID
                if (m_dtDataEntity.Rows.Count != 0)
                {
                    DataColumnCollection columns = m_dtDataEntity.Columns;
                    if (columns.Contains("DocID"))
                    {
                        foreach (DataRow dr in m_dtDataEntity.Rows)
                        {
                            m_DocID = dr["DocID"].ToString();
                        }
                        if (m_DocID != "")
                        {
                            SysEntity.TransResult m_TransDocResult = new SysEntity.TransResult();

                            //m_TransDocResult = g_BL_Doc.getSiteFormIDByDocID(p_Employee, m_DocID);
                            if (m_TransDocResult.isSuccess)
                            {
                                foreach (DataRow dr in ((DataTable)m_TransDocResult.ResultEntity).Rows)
                                {
                                    p_SiteFormID = dr["SiteFormID"].ToString();
                                }
                            }
                        }
                    }
                }
               
                DataTable m_btnDt = g_BL_System.GetMaintainButton(p_Employee, p_SiteFormID);
                DataTable m_dtViewAuths = new DataTable();
                m_dtViewAuths = g_BL_System.GetViewAuthByAuthKey(p_Employee, p_SiteFormID, "Maintain");
                
                string m_HeadHTML = "";
                //string[] m_Kys = new string[2 + m_btnDt.Rows.Count];
                //Int32 m_KeyIndex = 2;
                //m_Kys[0] = p_FieldID;
                //m_Kys[1] = "Exit";
                string[] m_Kys = new string[3 + m_btnDt.Rows.Count];
                Int32 m_KeyIndex = 3;
                m_Kys[0] = p_FieldID;
                m_Kys[1] = "Exit";
                m_Kys[2] = "MainPage";
                foreach (DataRow dr in m_btnDt.Rows)
                {
                    m_Kys[m_KeyIndex] = dr["FieldID"].ToString();
                    m_KeyIndex++;
                }
                SysEntity.TransResult m_TransResultLan = new SysEntity.TransResult();
                Dictionary<string, Object> m_dicLan = new Dictionary<string, object>();
                m_TransResultLan = GetLanguage(p_Employee, p_Language, m_Kys);
                if (m_TransResultLan.isSuccess)
                {
                    m_dicLan = (Dictionary<string, Object>)m_TransResultLan.ResultEntity;
                }
                string m_Class = "class='btn btn-primary mb10 mr5 notification'";
                string m_ReadOnly = "";
                bool m_isShowAppove = true;
                if (p_ActionMode != "Add")
                {
                    DataTable m_dtAuthID = new DataTable();
                    if (m_dtViewAuths.Rows.Count != 0)
                    {
                        m_dtAuthID = g_BL_System.GetAuthIDByWorkID(p_Employee, p_Employee.WorkID);
                    }
                    string m_AuthStyle = "";
                    foreach (DataRow dr in m_btnDt.Rows)
                    {
                        string m_ViewDetailID = dr["ViewDetailID"].ToString();
                        if (m_dtViewAuths.Rows.Count != 0 )
                        {
                            Int32 m_AuthCount = m_dtViewAuths.Select("ViewDetailID='" + m_ViewDetailID + "'").Length;
                            if (m_AuthCount != 0)
                            {
                                Dictionary<string, object> m_dicAuthResult = g_FH.CheckViewAuth(m_ViewDetailID, m_dtViewAuths, m_dtAuthID, m_dtDataEntity, "Maintain");
                                if (!(m_dicAuthResult.ContainsKey("Error")))
                                {
                                    Boolean isCheckAuth = true;//判斷是否是該單據簽核人，是的話就不用檢查權限，直接顯示審核按鈕
                                    if (dr["FieldID"].ToString() == "Approve" || dr["FieldID"].ToString() == "Cancel")
                                    {
                                        if (g_BL_System.CheckIsSigner(p_Employee, m_DocID))
                                        {
                                            isCheckAuth = false;
                                        }
                                    }

                                    if (isCheckAuth)
                                    {
                                        if (!(bool)m_dicAuthResult["isVisible"])
                                        {
                                            continue;
                                        }
                                        if (m_dicAuthResult.ContainsKey("ReadOnly"))
                                        {
                                            m_ReadOnly = m_dicAuthResult["ReadOnly"].ToString();
                                        }
                                        if (m_dicAuthResult.ContainsKey("Style"))
                                        {
                                            m_AuthStyle = m_dicAuthResult["Style"].ToString();
                                        }
                                    }
                                }
                            }
                        }
                        if (m_AuthStyle != "")
                        {
                            m_AuthStyle = " style='" + m_AuthStyle + "' ";
                        }

                        string m_ActionMode = dr["FieldID"].ToString();
                        string m_EventID = dr["EventID"].ToString();
                        string m_FieldID = dr["FieldID"].ToString();
                        string m_ControlRef = dr["ControlRef"].ToString();
                        switch (p_ActionMode)
                        {
                            case "Reject":
                            case "Delete":
                                m_Class = "class='btn btn-system mb10 mr5 notification'";
                                break;
                        }
                        if (m_FieldID == "Transfer" || m_FieldID == "Reject" || m_FieldID == "Cancel" || m_FieldID == "Approve")
                        {
                            try
                            {
                                m_isShowAppove = g_BL_System.GetSignerButtonByDocID(p_Employee, m_dtDataEntity.Rows[0]["DocID"].ToString());
                            }
                            catch
                            {
                                m_isShowAppove = true;
                            }
                            if (m_FieldID == "Transfer")
                            {
                                m_isShowAppove = true;
                            }
                            if (m_isShowAppove)
                            {
                                //Casper Add  javascript OnClickCommonButton p_SiteFormID param
                                m_HeadHTML += "<input " + m_AuthStyle + " " + m_Class + " id='btn" + m_FieldID + "' onclick='OnClickCommonButton(\"" + m_EventID + "\",\"" + m_FieldID + "\",\"" + m_ActionMode + "\",\"" + m_dicLan[m_FieldID] + "\",\"" + m_ControlRef + "\",\"" + p_SiteFormID + "\")' type='button' value='" + m_dicLan[m_FieldID] + "' />";
                            }
                        }
                        else
                        {
                            if (p_TempKey == "")
                            {
                                if (m_FieldID == "Execute")
                                {
                                    string m_ExecuteEvent = "";
                                    string m_ExecuteParams = "";
                                   
                                    if (m_ControlRef != "")
                                    {
                                        Int32 m_RefIndex = 0;
                                        foreach (string m_Ref in m_ControlRef.Split(';'))
                                        {
                                            switch (m_RefIndex)
                                            {
                                                case 0:
                                                    m_ExecuteEvent = m_Ref;
                                                    break;
                                                case 1:
                                                    m_ExecuteParams = m_Ref;
                                                    break;
                                            }
                                            m_RefIndex++;
                                        }
                                    }

                                    m_HeadHTML += "<input " + m_Class + " " + m_ReadOnly + " id='btn" + m_FieldID + "' onclick='ExecuteOnClick(\"" + p_EventID + "\",\"" + m_ExecuteEvent + "\",\"" + m_ExecuteParams + "\")' type='button' value='" + m_dicLan[m_FieldID] + "' />";
                                }
                                else
                                {
                                    m_HeadHTML += "<input " + m_Class + " " + m_ReadOnly + " id='btn" + m_FieldID + "' ondblclick='return false' onclick='ActionModel(\"" + m_EventID + "\",\"" + m_FieldID + "\",\"" + m_ActionMode + "\")' type='button' value='" + m_dicLan[m_FieldID] + "' />";
                                }
                            }
                        }
                    }
                }
                else
                {
                    m_HeadHTML += "<input " + m_Class + " " + m_ReadOnly + " id='btn" + p_FieldID + "' ondblclick='return false'  onclick='ActionModel(\"" + p_EventID + "\",\"" + p_FieldID + "\",\"" + p_ActionMode + "\")' type='button' value='" + m_dicLan[p_FieldID] + "' />";
                }
                string m_PanelTitle = "<label id='lblSiteForm" + p_SiteFormID + "'>{0}</label>";
                 m_PanelTitle = "";

                m_PanelTitle = string.Format(m_PanelTitle, g_FH.GetMultiLanguage("SiteForm" + p_SiteFormID, g_Language, p_Employee));

                //Casper Add Begin 20180416 for DN EMAIL 內頁 回首頁 按鈕
                if (p_SiteFormID.Contains("DN0001") && HttpContext.Current.Request.PhysicalPath.Contains("GeneratorWebMaintain.aspx"))
                {
                      m_HeadHTML += "<input class='btn btn-alert mb10 mr5 notification' id='btnDnMainPage' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")'  onclick='goMainPage(\""+p_SiteFormID+"\")' type='button' value='" + m_dicLan["MainPage"] + "' />";
                }                
                //Casper Add End

                m_HeadHTML += "<input class='btn btn-alert mb10 mr5 notification' id='btnExit' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")'  onclick='CloseMaintain()' type='button' value='" + m_dicLan["Exit"] + "' />";
                m_HeadHTML = " <div class='panel-heading text-center' style='max-width: 1400px; min-width: 800px;' > <div class='pull-left'> <div class='BtnArea' id='divInitButton' style='width: 95%; padding-top: 3px; padding-bottom: 3px;'><table style='border-color: black; width: 100%; font-size: small; border-collapse: collapse;'><tr ><td style='text-align: left;' nowrap='nowrap' > " + m_HeadHTML + "</td></tr></table></div></div><div class='pull-right'><span class='panel-controls'> <img src='Img/exit.png'  onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")'  onclick='CloseMaintain()' /> </span> </div> <span id='MantainTitle' class='panel-title'>" + m_PanelTitle + "</span> </div> ";
                //<section class='table-layout dep-02 animated fadeIn' id='content'> </section>
                Boolean m_IsMobile = g_FH.GetDeviceIsMobile(HttpContext.Current.Request.ServerVariables["HTTP_USER_AGENT"].ToString());

                m_Result = g_FH.GeneratorForm(p_Employee, p_SiteFormID, "divMaintain", p_Language, p_ActionMode, m_dtDataEntity, null, p_TempKey, null, m_IsMobile);
                m_TransResult.isSuccess = true;
                m_TransResult.ResultEntity = m_HeadHTML + m_Result;
            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GeneratorQueryForm(SysEntity.Employee p_Employee, string p_QueryID, string p_Language, string p_EventID)
        {
            DataTable m_FormTable = new DataTable("DataEntity");
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            if (p_QueryID != "")
            {
                Dictionary<string, Object> m_dicQueryForm = new Dictionary<string, object>();
                m_dicQueryForm["QueryID"] = p_QueryID;
                SysEntity.TransResult m_QTransResult = g_BL_System.GetQueryForms(p_Employee, m_dicQueryForm);
                if (m_QTransResult.isSuccess)
                {
                    m_FormTable = (DataTable)m_QTransResult.ResultEntity;
                }
            }
            string m_Result = "";
            try
            {
                string m_HeadHTML = "";
                string[] m_Kys = new string[2];
                m_Kys[0] = "Search";
                m_Kys[1] = "Exit";
                SysEntity.TransResult m_TransResultLan = new SysEntity.TransResult();
                Dictionary<string, Object> m_dicLan = new Dictionary<string, object>();
                m_TransResultLan = GetLanguage(p_Employee, p_Language, m_Kys);
                if (m_TransResultLan.isSuccess)
                {
                    m_dicLan = (Dictionary<string, Object>)m_TransResultLan.ResultEntity;
                }
                m_HeadHTML += "<input id='btnSearch' ondblclick='return false'  onclick='ActionModel(\"" + p_EventID + "\",\" Search\",\"GridData\")' type='button' value='" + m_dicLan["Search"] + "' />";
                m_HeadHTML += "<input id='btnExit' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")'  onclick='CloseMaintain()' type='button' value='" + m_dicLan["Exit"] + "' />";
                m_Result = g_FH.GeneratorForm(p_Employee, "QueryForm", "divMaintain", p_Language, "", null, m_FormTable);
                m_TransResult.isSuccess = true;
                m_TransResult.ResultEntity = m_HeadHTML + m_Result;
            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetFileFolder(SysEntity.Employee p_Employee, SysEntity.FileFolder p_FileFolder,string p_TargetID)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            string m_Html = "";
            string m_Files = "";
            try
            {
                m_TransResult = g_BL_System.GetFileFolder(p_Employee, p_FileFolder);
                if (m_TransResult.isSuccess)
                {
                    foreach (DataRow dr in ((DataTable)m_TransResult.ResultEntity).Rows)
                    {
                        if (dr["FileType"].ToString().IndexOf("image/") != 0)
                        {
                            //m_Files += "<p class='DownLoad' onclick='DownloadDOC(\"" + dr["FileKey"] + "\",\"" + p_SiteFormID + "\")'>" + dr["FileName"].ToString() + "</p>";
                            m_Files += "<p><img src='Img/DelIco.png' alt='Del' onclick='DelFile(\"" + p_TargetID + "\",\"" + p_FileFolder.DocID + "\",\"" + dr["FileKey"] + "\",\"" + p_FileFolder.SiteFormID + "\",\"" + p_FileFolder.FieldID + "\")'/><span class='DownLoad' onclick='ViewerDOC(\"" + dr["FileKey"] + "\",\"" + p_FileFolder.SiteFormID + "\")'>" + dr["FileName"].ToString() + "</span></p>";
                        }
                        else
                        {
                            m_Files += "<p><img src='Img/DelIco.png' alt='Del' onclick='DelFile(\"" + p_TargetID + "\",\"" + p_FileFolder.DocID + "\",\"" + dr["FileKey"] + "\",\"" + p_FileFolder.SiteFormID + "\",\"" + p_FileFolder.FieldID + "\")'/><span class='DownLoad' onclick='OpenImage(\"" + dr["FileKey"] + "\",\"" + p_FileFolder.SiteFormID + "\")'>" + dr["FileName"].ToString() + "</span></p>";
                        }
                    }
                    m_Html += "<div id='Down" + p_TargetID.Replace("upl", "").Replace("Dfile", "") + "'>" + m_Files + "</div>";
                    m_TransResult.ResultEntity = m_Html;
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
        public static SysEntity.TransResult DelFile(SysEntity.Employee p_Employee, SysEntity.FileFolder p_FileFolder, string p_TargetID)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            string m_Html = "";
            string m_Files = "";
            try
            {
                m_TransResult = g_BL_System.DelFile(p_Employee, p_FileFolder);
                if (m_TransResult.isSuccess)
                {
                    p_FileFolder.FileKey = "";
                    m_TransResult = g_BL_System.GetFileFolder(p_Employee, p_FileFolder);
                    if (m_TransResult.isSuccess)
                    {
                        foreach (DataRow dr in ((DataTable)m_TransResult.ResultEntity).Rows)
                        {
                            if (dr["FileType"].ToString().IndexOf("image/") != 0)
                            {
                                //m_Files += "<p class='DownLoad' onclick='DownloadDOC(\"" + dr["FileKey"] + "\",\"" + p_SiteFormID + "\")'>" + dr["FileName"].ToString() + "</p>";
                                m_Files += "<p><img src='Img/DelIco.png' alt='Del' onclick='DelFile(\"" + p_TargetID + "\",\"" + p_FileFolder.DocID + "\",\"" + dr["FileKey"] + "\",\"" + p_FileFolder.SiteFormID + "\",\"" + p_FileFolder.FieldID + "\")'/><span class='DownLoad' onclick='ViewerDOC(\"" + dr["FileKey"] + "\",\"" + p_FileFolder.SiteFormID + "\")'>" + dr["FileName"].ToString() + "</span></p>";
                            }
                            else
                            {
                                m_Files += "<p><img src='Img/DelIco.png' alt='Del' onclick='DelFile(\"" + p_TargetID + "\",\"" + p_FileFolder.DocID + "\",\"" + dr["FileKey"] + "\",\"" + p_FileFolder.SiteFormID + "\",\"" + p_FileFolder.FieldID + "\")'/><span class='DownLoad' onclick='OpenImage(\"" + dr["FileKey"] + "\",\"" + p_FileFolder.SiteFormID + "\")'>" + dr["FileName"].ToString() + "</span></p>";
                            }
                        }
                        m_Html += "<div id='Down" + p_TargetID.Replace("upl", "").Replace("Dfile", "") + "'>" + m_Files + "</div>";
                        m_TransResult.ResultEntity = m_Html;
                    }
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
        public static SysEntity.TransResult Execute(SysEntity.Employee p_Employee, string p_ExecuteEventID, string p_ExecuteEvent, Dictionary<string, Object> p_ExecuteParams)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            SysEntity.TransferJobLog m_TransferJobLog = new SysEntity.TransferJobLog();

            try
            {
                m_TransResult = ExecuteEventSetting(p_Employee, p_ExecuteEvent, p_ExecuteParams);
            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.StackTrace;
            }

            if (m_TransResult.isSuccess)
            {
                m_TransferJobLog.TransferID = p_ExecuteEventID;
                m_TransferJobLog.TransferUser = p_Employee.WorkID;
                m_TransferJobLog.TransferStatus = "Success";
                m_TransferJobLog.TransferLog = m_TransResult.LogMessage;
            }
            else
            {
                m_TransferJobLog.TransferID = p_ExecuteEventID;
                m_TransferJobLog.TransferUser = p_Employee.WorkID;
                m_TransferJobLog.TransferStatus = "Fail";
                m_TransferJobLog.TransferLog = m_TransResult.LogMessage;
            }
            g_BL_System.AddTransferJobLog(p_Employee, m_TransferJobLog);

            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult ExecuteEventSetting(SysEntity.Employee p_Employee, string p_EventID, Dictionary<string, Object> p_Params)
        {
            SysEntity.EventSetting m_EventEntry = new SysEntity.EventSetting();
            m_EventEntry.EventID = p_EventID;
            SysEntity.TransResult m_TransResult = g_BL_System.GetEventSetting(p_Employee, m_EventEntry);
            string m_EventModel = "";
            string m_EventAction = "";
            string m_EventActionType = "";
            if (m_TransResult.isSuccess)
            {
                foreach (DataRow dr in ((DataTable)m_TransResult.ResultEntity).Rows)
                {
                    m_EventModel = dr["EventModel"].ToString();
                    m_EventAction = dr["EventAction"].ToString();
                    m_EventActionType = dr["EventActionType"].ToString();
                }
            }

            Type m_Type = g_FH.GetBLType(m_EventModel);
            object instance = Activator.CreateInstance(m_Type);
            MethodInfo method = instance.GetType().GetMethod(m_EventAction);
            ParameterInfo[] m_Pars = method.GetParameters();
            object[] m_Params = new object[m_Pars.Length];
            Int32 m_ParamIndex = 0;
            foreach (ParameterInfo Myparam in m_Pars)
            {
                if (m_ParamIndex == 0)
                {
                    m_Params[m_ParamIndex] = p_Employee;
                }
                else
                {

                    Int32 m_PairIndex = 1;
                    if (Myparam.ParameterType.ToString().IndexOf("Dictionary") == -1)
                    {
                        
                        foreach (KeyValuePair<string, Object> item in p_Params)
                        {
                            if (m_ParamIndex == m_PairIndex)
                            {
                                m_Params[m_ParamIndex] = item.Value;
                            }
                            
                        }
                        if (m_ParamIndex > m_PairIndex)
                        {
                            m_Params[m_ParamIndex] = "";
                        }
                    }
                    else
                    {
                        m_Params[m_ParamIndex] = p_Params;
                        if (m_ParamIndex > m_PairIndex)
                        {
                            m_Params[m_ParamIndex] = null;
                        }
                    }
                    m_PairIndex++;
                    
                }
                m_ParamIndex++;
            }

            m_TransResult = (SysEntity.TransResult)method.Invoke(instance, m_Params);
            if (m_TransResult.ResultEntity != null)
            {
                if (m_TransResult.ResultEntity.GetType().ToString() == "System.Data.DataTable")
                {
                    m_TransResult.ResultEntity = g_FH.DataTableToJson((DataTable)m_TransResult.ResultEntity);
                }
            }
            return m_TransResult;
        }


        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetSelSouceByEventIDs(SysEntity.Employee p_Employee,List< Dictionary<string, Object>> p_EventIDs)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            try
            {
                m_TransResult = g_BL_System.GetSelSouceByEventIDs(p_Employee, p_EventIDs);
            }
            catch(Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }


        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult CustFormula(SysEntity.Employee p_Employee, List<SysEntity.FormulaEntity> p_FormulaEntity)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            string m_Result = "";
            try
            {
                if (p_Employee.CurrentLanguage == "TW")
                {
                    m_Result = "共點選 {0} 筆，";
                }
                else
                {
                    m_Result = "Selected {0} count ，";
                }

                Int32 m_Index = 0;
                decimal m_Sum = 0;
                foreach (SysEntity.FormulaEntity FormulaEntity in p_FormulaEntity)
                {
                    string[] m_LanguageKeys = new string[1];
                    m_LanguageKeys[0] = FormulaEntity.ColumnName;
                    m_TransResult = g_BL_System.GetListMultiLanguage(p_Employee, p_Employee.CurrentLanguage, m_LanguageKeys);
                    if (m_TransResult.isSuccess)
                    {
                        foreach (KeyValuePair<string, Object> item in (Dictionary<string, Object>)m_TransResult.ResultEntity)
                        {
                            m_Result += item.Value;
                        }
                    }
                    m_Sum = 0;
                    string m_Msg = "";
                    foreach (string value in FormulaEntity.Values)
                    {
                        if (value != "")
                        {
                            m_Sum += Convert.ToDecimal(value.Replace("USD$",""));
                        }
                        if (p_Employee.CurrentLanguage == "TW")
                        {
                            m_Msg = "-加總金額: ";
                        }
                        else
                        {
                            m_Msg = "-Sum.: ";
                        }
                    }
                    if (FormulaEntity.Formula == "Avg")
                    {
                        m_Sum = (decimal)(m_Sum / FormulaEntity.Values.Length);
                        if (p_Employee.CurrentLanguage == "TW")
                        {
                            m_Msg = "-平均金額: ";
                        }
                        else
                        {
                            m_Msg = "-Avg.: ";
                        }
                    }
                    NumberFormatInfo nfi = new CultureInfo("en-US", false).NumberFormat;
                    m_Result += m_Msg + " USD" + Convert.ToDecimal(m_Sum.ToString("f2")).ToString("C", nfi) + ";";
                    m_Index++;
                }
                m_TransResult = new SysEntity.TransResult();
                m_TransResult.isSuccess = true;
                m_TransResult.ResultEntity = m_Result;
            }
            catch (Exception ex)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = ex.Message;
            }
            return m_TransResult;
        }


        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GeneratorDetails(SysEntity.Employee p_Employee, string p_Language, string p_ActionType, string p_RowAction, string p_TableId, List<Dictionary<string, Object>> p_Entity, List<Dictionary<string, Object>> p_Layouts)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            try
            {
                DataTable m_FormTable = g_FH.DeserializeObject<DataTable>(g_FH.JsonSerializer(p_Layouts).Replace("\"SectionType\":\"Detail\"", "\"SectionType\":\"General1\""));
                string m_DtlTRSeq="";
                DataTable m_DataTable = new DataTable();
                if (p_Entity.Count == 0)
                {
                    m_DataTable = null;
                }
                else
                {
                    m_DtlTRSeq = p_Entity[0]["DtlTRSeq"].ToString();
                    m_DataTable = g_FH.DeserializeObject<DataTable>(g_FH.JsonSerializer(p_Entity));

                }
                string m_Result = "";
                try
                {
                    string m_HeadHTML = "";
                    /*  string[] m_Kys = new string[2];
                      m_Kys[0] = "Exit";
                      m_Kys[1] = "Save";

                      SysEntity.TransResult m_TransResultLan = new SysEntity.TransResult();
                      Dictionary<string, Object> m_dicLan = new Dictionary<string, object>();
                      m_TransResultLan = GetLanguage(p_Employee, p_Language, m_Kys);
                      if (m_TransResultLan.isSuccess)
                      {
                          m_dicLan = (Dictionary<string, Object>)m_TransResultLan.ResultEntity;
                      }
                      m_HeadHTML += "<input id='btnExit' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")'  onclick='unblockByClass(\"DtlTD" + p_TableId.Replace("DtlTable", "") + "\")' type='button' value='" + m_dicLan["Exit"] + "' />";
                      m_HeadHTML += "<input id='btnSave' ondblclick='return false'  onclick='DetailSave(\"" + p_ActionType + "\",\"" + p_RowAction + "\",\"" + p_TableId + "\",\"" + m_DtlTRSeq + "\")' type='button' value='" + m_dicLan["Save"] + "' />";

                     */

                    m_HeadHTML += "<input id='btnExit' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")'  onclick='unblockByClass(\"DtlTD" + p_TableId.Replace("DtlTable", "") + "\")' type='button' value='離開' />";
                    m_HeadHTML += "<input id='btnSave' ondblclick='return false'  onclick='DetailSave(\"" + p_ActionType + "\",\"" + p_RowAction + "\",\"" + p_TableId + "\",\"" + m_DtlTRSeq + "\")' type='button' value='存檔' />";
                    if (p_RowAction == "Add")
                    {
                        p_ActionType = "Add";
                    }
                    m_Result = g_FH.GeneratorForm(p_Employee, "Detail", "divDetail", p_Language, p_ActionType, m_DataTable, m_FormTable);

                    m_TransResult.isSuccess = true;
                    m_TransResult.ResultEntity = m_HeadHTML + m_Result;
                }
                catch (Exception ex)
                {
                    m_TransResult.isSuccess = false;
                    m_TransResult.LogMessage = ex.Message;
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
        public static SysEntity.TransResult GetIssueOwner(SysEntity.Employee p_Employee, Dictionary<string, Object> p_Entity)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            try
            {
                 m_TransResult = g_BL_System.GetOwnerMaintain(p_Employee, p_Entity);
                if(m_TransResult.isSuccess)
                {
                    m_TransResult.ResultEntity = g_FH.DataTableToJson((DataTable)m_TransResult.ResultEntity);
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
        public static SysEntity.TransResult LoginCheck(string WorkID, string PW, string Company)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            try
            {
                m_TransResult = g_BL_System.ReLogin( WorkID, PW, Company);
                if (m_TransResult.isSuccess)
                {
                    HttpContext context = HttpContext.Current;
                    context.Session["LoginUser"] = (SysEntity.Employee)m_TransResult.ResultEntity;
                }
                else
                {
                    m_TransResult.ResultEntity=null;
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