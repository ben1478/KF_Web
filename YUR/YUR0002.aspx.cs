using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Web.UI.HtmlControls;
using Business_Logic.Entity;
using System.Data;
using Business_Logic.Model;
using static Business_Logic.Entity.SysEntity;
using Business_Logic;
using System.Collections;
using Newtonsoft.Json;
using System.Configuration;

namespace KF_Web
{
    public partial class YUR002 : CusBasePage
    {

        class RoadInfo
        {
            public string city { get; set; }
            public string site_id { get; set; }
            public string road { get; set; }
            // 可以添加其他屬性來對應 JSON 結構
        }


        protected void Page_Load(object sender, EventArgs e)
        {
            string m_API_Path = "";
            if (ConfigurationManager.AppSettings["IsProduction"].ToString() == "Y")
            {
                m_API_Path = "https://www.kuofongweb.com.tw/KF_WebAPI/";
                if (Request.Url.Host == "192.168.1.243")
                {
                    m_API_Path = "http://192.168.1.243/KF_WebAPI/";
                }
            }
            if (Request.IsLocal)
            {
                m_API_Path = "http://localhost/KF_WebAPI/";
            }

           
            hidWebAPI_Path.Value = m_API_Path;
            if (!string.IsNullOrEmpty(Request["Action"]))
            {
                g_FH.GetCtrlSetVal(Request["Action"], (Control)FindControl("Action"));
                if (Request["Action"].ToString() == "add")
                {
                    g_FH.GetCtrlSetVal("系統自動產生", (Control)FindControl("form_no"));
                    g_FH.GetCtrlSetVal(DateTime.Today.ToString("yyyy/MM/dd"), (Control)FindControl("Add_date"));
                }
                else
                {
                    g_FH.GetCtrlSetVal(Request["form_no"], (Control)FindControl("form_no"));
                }
                

            }

        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAreaCode(SysEntity.Employee Employee)
        {
            SysEntity.TransResult m_TransResult = g_BL_System.GetAreaCode(Employee);

            if (m_TransResult.isSuccess)
            {
                m_TransResult.ResultEntity = g_FH.DataTableToJson((DataTable)m_TransResult.ResultEntity);
            }

            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetCityInfo(SysEntity.Employee Employee,string City, string Site)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();

            string json = g_FH.GetCityJSON();

            var objects = g_FH.DeserializeObject<List<RoadInfo>>(json);

            var filteredObjects = objects.Where(obj => obj.city == City && obj.site_id == City+Site);

            m_TransResult.isSuccess = true;
            if (m_TransResult.isSuccess)
            {
                m_TransResult.ResultEntity = filteredObjects.ToArray();
            }

            return m_TransResult;
        }


    }
}