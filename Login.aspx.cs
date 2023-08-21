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

namespace KF_Web
{
    public partial class Login : System.Web.UI.Page
    {
        

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


            if (!Request.IsLocal && !Request.IsSecureConnection)
            {
               // string redirectUrl = Request.Url.ToString().Replace("http:", "https:");
              //  Response.Redirect(redirectUrl, false);
            }
        }
        public static FunctionHandler g_FH = new FunctionHandler();
        public static Business_Logic.Model.BL_System g_BL = new Business_Logic.Model.BL_System();

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string m_IP = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult.isSuccess = true;
            SysEntity.Employee m_Employee=new SysEntity.Employee();
            m_TransResult = g_BL.ChkLogin(m_IP, txtLoginID.Value, txtPassword.Value);
            if (m_TransResult.isSuccess)
            {
                Session["LoginUser"] = (SysEntity.Employee)m_TransResult.ResultEntity;
                Response.Redirect("MainForm.aspx", false);
                /*
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
                string myScript = "\n<script type=\"text/javascript\" language=\"Javascript\" id=\"EventScriptBlock\">\n";
                string m_ErrMSG = m_TransResult.LogMessage.Replace("\r\n", "");
                if (m_ErrMSG == "")
                {
                    myScript += "  document.getElementById('lblErrMSG').innerText = '帳號密碼錯誤,請確認!!';</script>";

                }
                else
                { 
                myScript += "  document.getElementById('lblErrMSG').innerText = '"+ m_ErrMSG + "';</script>";

                }


                Page.ClientScript.RegisterStartupScript(this.GetType(), "myKey", myScript, false);
            }
        }
    }
}