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
    public partial class RPT0001 : CusBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
         
            
        }




        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAchievementByWorkID(SysEntity.Employee Employee, string WorkID, string get_amount_date_s, string get_amount_date_e)
        {
            BL_Report m_BL_RPT=new BL_Report();
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = m_BL_RPT.GetAchievementByWorkID(Employee, WorkID, get_amount_date_s, get_amount_date_e);
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAchievementByYear(SysEntity.Employee Employee, string Year)
        {
            BL_Report m_BL_RPT = new BL_Report();
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = m_BL_RPT.GetAchievementByYear(Employee, Year);
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAchievementByMonth_BC(SysEntity.Employee Employee, string Month)
        {
            BL_Report m_BL_RPT = new BL_Report();
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = m_BL_RPT.GetAchievementByMonth_BC(Employee, Month);
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAchievementByMonth(SysEntity.Employee Employee, string Month)
        {
            BL_Report m_BL_RPT = new BL_Report();
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = m_BL_RPT.GetAchievementByMonth(Employee, Month);
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAchievementByMonth_BCDtl(SysEntity.Employee Employee, string Month, string U_BC)
        {
            BL_Report m_BL_RPT = new BL_Report();
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = m_BL_RPT.GetAchievementByMonth_BCDtl(Employee, Month, U_BC);
            return m_TransResult;
        }


        


    }
}