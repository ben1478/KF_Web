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
    public partial class YUR0003 : CusBasePage
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
        public static SysEntity.TransResult SaveEmployee(SysEntity.Employee Employee, string Password)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = g_BL_System.SaveEmployee(Employee, Password);
            return m_TransResult;
        }



    }
}