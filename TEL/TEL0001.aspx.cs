using Business_Logic.Entity;
using Business_Logic.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using static Business_Logic.Entity.SysEntity;
using Business_Logic;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using static Business_Logic.Entity.ReportEntity;
using static Business_Logic.Model.BL_TEL;

namespace KF_Web
{
    public partial class TEL0001 : CusBasePage
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


        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult get_csName_detail(SysEntity.Employee p_Employee, string TM_type, string HA_id)
        {
            Business_Logic.Model.BL_TEL m_BL_TEL = new BL_TEL();

            SysEntity.TransResult m_TransResult = m_BL_TEL.get_csName_detail(p_Employee, TM_type, HA_id);

            if (m_TransResult.isSuccess)
            {
                dynamic m_RtnInfos;
                m_RtnInfos = new TelData_M();
                m_RtnInfos = (TelData_M)m_TransResult.ResultEntity;
                m_TransResult.ResultEntity = m_RtnInfos;
            }

            return m_TransResult;
        }




    }



}