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
using System.Web.UI.HtmlControls;

namespace KF_Web
{
    public partial class QueryForm : System.Web.UI.Page
    {
        public static BL_System g_BL_System = new BL_System();
        public SysEntity.Employee g_Employee = new SysEntity.Employee();
        public static FunctionHandler g_FunctionHandler = new FunctionHandler();
        public static string g_Language = "";


        protected void Page_Load(object sender, EventArgs e)
        {
            DataTable m_FormTable = new DataTable("DataEntity");
            string m_QueryID = "";


            if (Request.QueryString["QueryMode"] != null)
            {
                hidQueryMode.Value = Request.QueryString["QueryMode"].ToString();
            }

            if (Request.QueryString["QueryID"] != null)
            {
                m_QueryID = Request.QueryString["QueryID"].ToString();
            }
            else
            {
                m_QueryID = "1";
            }
            if (Request.QueryString["Language"] != null)
            {
                selLanguage.Value = Request.QueryString["Language"].ToString();
                g_Language = selLanguage.Value;
            }
            if (Request.QueryString["ControlType"] != null)
            {
                hidControlType.Value = Request.QueryString["ControlType"].ToString(); ;
            }
            if (Request.QueryString["ControlRef"] != null)
            {
                hidControlRef.Value = Request.QueryString["ControlRef"].ToString();
                if (hidControlRef.Value.IndexOf(",") != -1)
                {
                    hisSelectText.Value = Request.QueryString["ControlRef"].Split(',')[1];
                    hisSelectValue.Value = Request.QueryString["ControlRef"].Split(',')[0]; 
                }
            }

            if (Request.QueryString["EventElement"] != null)
            {
                hidEventElement.Value = Request.QueryString["EventElement"].ToString();
            }
            if (Request.QueryString["QueryParam"] != null)
            {
                hidQueryParam.Value = Request.QueryString["QueryParam"].ToString();
            }
           

            if (Request.QueryString["SelectText"] != null)
            {
                hisSelectText.Value = Request.QueryString["SelectText"].ToString();
            }

            if (Request.QueryString["SelectValue"] != null)
            {
                hisSelectValue.Value = Request.QueryString["SelectValue"].ToString();
            }

            SysEntity.TransResult m_TransResult = GetLoinUser(Request);
            if (m_TransResult.isSuccess)
            {
                SysEntity.Employee m_EmployeeEntity = (SysEntity.Employee)m_TransResult.ResultEntity;
                Dictionary<string, Object> m_dicQueryForm = new Dictionary<string, object>();
                m_dicQueryForm["QueryID"] = m_QueryID;
                m_dicQueryForm["SectionID"] = "divQueryArea";
                SysEntity.TransResult m_QTransResult = g_BL_System.GetQueryForms(m_EmployeeEntity, m_dicQueryForm);

              
                HtmlGenericControl m_ControlItem = ((HtmlGenericControl)FindControl("divQueryArea"));
                string m_HTML = "";
                if (m_QTransResult.isSuccess)
                {
                    m_FormTable = (DataTable)m_QTransResult.ResultEntity;
                    if (m_FormTable.Rows.Count != 0)
                    {
                        string[] m_LanguageKey = new string[1];
                        m_LanguageKey[0]=m_FormTable.Rows[0]["FormTitle"].ToString();
                        m_QTransResult = g_BL_System.GetListMultiLanguage(m_EmployeeEntity, selLanguage.Value, m_LanguageKey);
                         string m_FormTitle = "";
                        if(m_QTransResult.isSuccess)
                        {
                            Dictionary<string, Object> m_Return = (Dictionary<string, Object>)m_QTransResult.ResultEntity;
                            m_FormTitle = m_Return[m_FormTable.Rows[0]["FormTitle"].ToString()].ToString();

                            HtmlGenericControl m_ControlTitle = ((HtmlGenericControl)FindControl("PanelTitle"));
                            m_ControlTitle.InnerHtml = m_FormTitle;
                        }
                       
                       
                        m_HTML = g_FunctionHandler.GeneratorForm(m_EmployeeEntity, "QueryForm", "divQueryArea", g_Language, "", null, m_FormTable);
                        m_HTML = "<div class='panel'> </div><div class='panel-body'>" + m_HTML + "</div></div>";
                        m_ControlItem.InnerHtml = m_HTML;
                    }
                }


                m_dicQueryForm = new Dictionary<string, object>();
                m_dicQueryForm["QueryID"] = m_QueryID;
                m_dicQueryForm["SectionID"] = "divInitButton";
                SysEntity.TransResult m_QTransResultButton = g_BL_System.GetQueryForms(m_EmployeeEntity, m_dicQueryForm);

                if (m_QTransResultButton.isSuccess)
                {
                    m_FormTable = (DataTable)m_QTransResultButton.ResultEntity;
                    HtmlGenericControl m_ControlButtom = ((HtmlGenericControl)FindControl("divInitButton"));

                    m_HTML = "";
                    m_HTML = g_FunctionHandler.GeneratorForm(m_EmployeeEntity, "QueryForm", "divInitButton", g_Language, "", null, m_FormTable);
                    m_ControlButtom.InnerHtml = m_HTML;
                }

            }
        }

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
                    Response.Redirect(@"../Login.aspx", false);
                    Session["Page"] = p_Request.Url.LocalPath.Replace(@"/KF_Web/", "") + p_Request.Url.Query;
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