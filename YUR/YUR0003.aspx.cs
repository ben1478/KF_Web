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
using Newtonsoft.Json;
using System.Text;
using System.Threading.Tasks;
using System.Security.Policy;
using System.IO;
using NPOI.OpenXmlFormats.Spreadsheet;
using NPOI.SS.UserModel;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using NPOI.SS.Formula.Functions;
using static KF_Web.YUR0003;

namespace KF_Web
{



    public partial class YUR0003 : CusBasePage
    {

        static T ConvertDictionaryToObject<T>(Dictionary<string, object> dictionary) where T : new()
        {
            T obj = new T();
            foreach (var property in typeof(T).GetProperties())
            {
                if (dictionary.TryGetValue(property.Name, out object value))
                {
                    property.SetValue(obj, value);
                }
            }
            return obj;
        }
        public class PageParams
        {
            public string ExamineNo { get; set; }
            public string form_no { get; set; }
            public string isUpdDB { get; set; }
            public string CaseStatus { get; set; }

            
        }



        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!string.IsNullOrEmpty(Request["CallAPI"]))
                {
                    using (StreamReader reader = new StreamReader(Request.InputStream))
                    {
                        string json = reader.ReadToEnd();
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        dynamic data = serializer.Deserialize<dynamic>(json);
                        Employee m_Employee = ConvertDictionaryToObject<Employee>(data["Employee"]);
                        PageParams m_PageParams = ConvertDictionaryToObject<PageParams>(data["Params"]);
                        SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
                        string m_APIName = "";
                        if (m_PageParams.CaseStatus == "RP")
                        {
                            m_APIName = "QueryAppropriation";
                            m_TransResult = g_BL_YuRich.CallAPI(m_APIName, m_PageParams.form_no, m_PageParams.ExamineNo, m_PageParams.CaseStatus, m_PageParams.isUpdDB);
                        }
                        else
                        {
                            m_APIName = "QueryCaseStatus";
                            m_TransResult = g_BL_YuRich.CallAPI(m_APIName, m_PageParams.form_no, m_PageParams.ExamineNo, m_PageParams.CaseStatus, m_PageParams.isUpdDB);

                           
                          

                        }
                        Response.Clear();
                        Response.ContentType = "application/json";
                        Response.Write(JsonConvert.SerializeObject(m_TransResult));
                        HttpContext.Current.Response.Flush(); // Sends all currently buffered output to the client.
                        HttpContext.Current.Response.SuppressContent = true;  // Gets or sets a value indicating whether to send HTTP content to the client.
                        HttpContext.Current.ApplicationInstance.CompleteRequest(); // Causes ASP.NET to bypass all events and filtering in the HTTP pipeline chain of execution and directly execute the EndRequest event.
                        HttpContext.Current.Response.End();
                    }
                }
            }
            catch (Exception ex)
            {
                string m_str = ex.Message;
            }
        }
    }
}