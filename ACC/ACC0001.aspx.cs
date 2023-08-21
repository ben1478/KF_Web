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

namespace KF_Web
{
    public partial class ACC0001 : CusBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
         
            
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