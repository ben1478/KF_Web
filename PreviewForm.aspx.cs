using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Business_Logic.Entity;

namespace KF_Web
{
    public partial class PreviewForm : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["Employee"] != null)
            {
                SysEntity.Employee m_EmployeeEntity = g_FH.DeserializeObject<SysEntity.Employee>(Request.QueryString["Employee"].ToString());
                
                txtCompanyCode.Text = m_EmployeeEntity.CompanyCode;
                txtWorkID.Text = m_EmployeeEntity.WorkID;
            }
            if (Request.QueryString["Mode"] != null)
            {
                hidMode.Value = Request.QueryString["Mode"].ToString();
            }

            if (Request.QueryString["TempKey"] != null)
            {
                hidTempKey.Value = Request.QueryString["TempKey"].ToString();
            }
           



        }
    }
}