using System;
using System.Web.UI;
using Business_Logic.Entity;
using Business_Logic;
using System.Net;
using System.Net.Sockets;
using System.Web;
using System.Linq;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
using System.Collections.Generic;
using static Business_Logic.Entity.SysEntity;

namespace KF_Web
{
    public partial class Login_AE : System.Web.UI.Page
    {

        public static FunctionHandler g_FH = new FunctionHandler();
        public static Business_Logic.Model.BL_AE_Web g_BL = new Business_Logic.Model.BL_AE_Web();

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

        protected void Page_Load(object sender, EventArgs e)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            if (Request["GUID"] != null)
            {
                m_TransResult = g_BL.ChkEffectToken(Request["GUID"]);
            }
            else
            {
                Response.Redirect("https://www.kuofong.com.tw/about-us");
            }

            if (!m_TransResult.isSuccess)
            {
                string myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventScriptBlock\">\n";
                myScript += "  alert('" + m_TransResult.LogMessage + "');";
                myScript += " window.location.href = \"https://www.kuofong.com.tw/about-us\"; </script>";
                Page.ClientScript.RegisterStartupScript(this.GetType(), "myKey", myScript, false);
            }

            if (!Request.IsLocal && !Request.IsSecureConnection)
            {
               // string redirectUrl = Request.Url.ToString().Replace("http:", "https:");
              //  Response.Redirect(redirectUrl, false);
            }
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string m_IP = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            string m_GUID = Request["GUID"].ToString();
           
            string m_jsCode = "";
            m_TransResult = g_BL.UpdTokenByGUID(m_GUID, m_IP, txtLoginID.Value);
            if (m_TransResult.isSuccess)
            {
                m_TransResult = g_BL.ChkLogin(m_IP, txtLoginID.Value, txtPassword.Value, m_GUID);
                if (m_TransResult.isSuccess)
                {
                    Session["LoginUser"] = (SysEntity.Employee)m_TransResult.ResultEntity;

                    //m_jsCode = "  document.getElementById('lblErrMSG').innerText = '" + m_GUID + "-登入成功" + ((SysEntity.Employee)m_TransResult.ResultEntity).DisplayName + "';</script>";
                  
                    Response.Redirect("AE/AE0001.aspx?MenuID=E00000-1", false);
                    /*Response.Redirect("MainForm.aspx", false);
                    if (Session["Page"] != null)
                    {
                        Response.Redirect(Session["Page"].ToString(), false);
                    }
                    else
                    {
                        Response.Redirect("MainForm.aspx", false);
                    }*/
                }
                else
                {
                    m_jsCode = "  document.getElementById('lblErrMSG').innerText = '" + m_TransResult.LogMessage.Replace("\r\n", "") + "';</script>";
                }
            }
            else
            {
                m_jsCode = "  alert('" + m_TransResult.LogMessage + "');</script>";
              //  m_jsCode += " window.location.href = \"https://www.kuofong.com.tw/about-us\"; ";
            }

            if (m_jsCode!="")
            {
                string myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventScriptBlock\">\n"+ m_jsCode;
                Page.ClientScript.RegisterStartupScript(this.GetType(), "myKey", myScript, false);
            }

        }
    }
}