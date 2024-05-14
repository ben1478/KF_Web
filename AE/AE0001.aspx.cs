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
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;

namespace KF_Web
{
    public partial class AE0001 : CusBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
               /* System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls;

                HttpClient httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "YwIE0H960y4x2knhLhDuPa0lcghiDwmreIY9zpfhKUP");
                var content = new Dictionary<string, string>();
                content.Add("message", "測試訊息");
                httpClient.PostAsync("https://notify-api.line.me/api/notify", new FormUrlEncodedContent(content));*/
            }
            catch(Exception ex) {
                string m_str = ex.Message;
            }
           

        }



        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult AE_Approve(SysEntity.Employee Employee,  string[] FR_id)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Business_Logic.Model.BL_AE_Web g_BL_AE_Web = new BL_AE_Web();
            m_TransResult = g_BL_AE_Web.AE_Approve(Employee, FR_id);
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult AE_ApproveDtl(SysEntity.Employee Employee, string FR_id, string FR_cknum, string FR_step_sign, string FR_note)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            Business_Logic.Model.BL_AE_Web g_BL_AE_Web = new BL_AE_Web();
            m_TransResult = g_BL_AE_Web.AE_ApproveDtl(Employee, FR_id, FR_cknum, FR_step_sign, FR_note);
            return m_TransResult;
        }

    }
}