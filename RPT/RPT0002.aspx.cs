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
using static Business_Logic.Entity.ReportEntity;

namespace KF_Web
{
    public partial class RPT0002: CusBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
         
            
        }




        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetCompareAchievement(SysEntity.Employee Employee, string Year_S, string Year_E, string Type)
        {
            BL_Report m_BL_RPT = new BL_Report();
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = m_BL_RPT.GetCompareAchievement(Employee, Year_S, Year_E, Type);
            try
            {
                if (m_TransResult.isSuccess)
                {
                    dynamic m_RtnInfos;

                    if (Type == "Year")
                    {
                        m_RtnInfos = new List<YearAmountInfoByYear>();
                        m_RtnInfos = (List<YearAmountInfoByYear>)m_TransResult.ResultEntity;

                    }
                    else
                    {
                        m_RtnInfos = new List<YearAmountInfo>();
                        List<AmountInfo> m_AmountInfos = (List<AmountInfo>)m_TransResult.ResultEntity;
                        int index = 1;
                        int yyyy = 0;
                        YearAmountInfo m_NewYearAmountInfo = new YearAmountInfo();
                        foreach (AmountInfo m_AmountInfo in m_AmountInfos)
                        {
                            yyyy = m_AmountInfo.yyyy;
                            AmountInfo m_NewAmountInfo = new AmountInfo();

                            if (index == 1)
                            {
                                if (m_AmountInfo.mm != 1)//不是從1月開始要補足
                                {
                                    for (int i = 1; i < m_AmountInfo.mm; i++)
                                    {
                                        m_NewYearAmountInfo.yyyy = m_AmountInfo.mm;
                                        AmountInfo addAmountInfo = new AmountInfo();
                                        addAmountInfo.mm = i;
                                        addAmountInfo.amount = 0;
                                        m_NewYearAmountInfo.AmountInfos.Add(addAmountInfo);
                                    }
                                }
                                m_NewYearAmountInfo.yyyy = m_AmountInfo.yyyy;
                                m_NewAmountInfo.mm = m_AmountInfo.mm;
                                m_NewAmountInfo.amount = m_AmountInfo.amount;
                                m_NewYearAmountInfo.AmountInfos.Add(m_NewAmountInfo);
                            }
                            else
                            {
                                m_NewYearAmountInfo.yyyy = m_AmountInfo.yyyy;
                                m_NewAmountInfo.mm = m_AmountInfo.mm;
                                m_NewAmountInfo.amount = m_AmountInfo.amount;
                                m_NewYearAmountInfo.AmountInfos.Add(m_NewAmountInfo);
                            }
                            if (m_AmountInfo.mm == 12)
                            {
                                m_RtnInfos.Add(m_NewYearAmountInfo);
                                m_NewYearAmountInfo = new YearAmountInfo();
                            }
                            else if (m_AmountInfos.Count == index)
                            {
                                for (int i = m_AmountInfo.mm + 1; i <= 12; i++)
                                {
                                    m_NewYearAmountInfo.yyyy = m_AmountInfo.yyyy;
                                    AmountInfo addAmountInfo = new AmountInfo();
                                    addAmountInfo.mm = i;
                                    addAmountInfo.amount = 0;
                                    m_NewYearAmountInfo.AmountInfos.Add(addAmountInfo);

                                }
                                m_RtnInfos.Add(m_NewYearAmountInfo);
                            }
                            index++;
                        }
                    }
                    
                    m_TransResult.ResultEntity = m_RtnInfos;
                }
            }
            catch (Exception ex)
            {
                m_TransResult.LogMessage = ex.Message;
                m_TransResult.isSuccess = false;
            }

            return m_TransResult;
        }


        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAchievementByYear_BC(SysEntity.Employee Employee, string Year)
        {
            BL_Report m_BL_RPT = new BL_Report();
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = m_BL_RPT.GetAchievementByYear_BC(Employee, Year);
            return m_TransResult;
        }



    }
}