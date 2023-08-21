using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Business_Logic.Entity;
using System.Web.Script.Services;
using System.Web.Services;

namespace KF_Web
{
    public partial class TestForm : System.Web.UI.Page
    {
        public static Business_Logic.Model.BL_System g_BL_System = new Business_Logic.Model.BL_System();

        protected void Page_Load(object sender, EventArgs e)
        {
            //SysEntity.Employee p_EmployeeEntity=new SysEntity.Employee();
            //p_EmployeeEntity.CompanyCode = "1000";
            //p_EmployeeEntity.Account = "Ben_Lu";

            //Dictionary<string, Object> p_dicOwnerMaintain=new Dictionary<string,object>();
            //p_dicOwnerMaintain["Site"] = "台北";
            //p_dicOwnerMaintain["System1"] = "313";
            //p_dicOwnerMaintain["System3"] = "29";

            //g_BL_System.getOwnerDeputy(p_EmployeeEntity, p_dicOwnerMaintain);
        }


        public class GoogleChartData
        {
            public Int32 BILLETSEQ { get; set; }
            public Int32 S1 { get; set; }
            public Int32 S2 { get; set; }

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object[] GetChartData()
        {
            List<GoogleChartData> listData = new List<GoogleChartData>();
            //Here MyDatabaseEntities  is our dbContext
            GoogleChartData DataEntity = new GoogleChartData();
            DataEntity.BILLETSEQ = 001;
            DataEntity.S1 = 1;
            DataEntity.S2 = 5;
            listData.Add(DataEntity);

            DataEntity = new GoogleChartData();
            DataEntity.BILLETSEQ = 010;
            DataEntity.S1 = 3;
            DataEntity.S2 = 25;
            listData.Add(DataEntity);


            DataEntity = new GoogleChartData();
            DataEntity.BILLETSEQ = 015;
            DataEntity.S1 = 7;
            DataEntity.S2 = 5;

            listData.Add(DataEntity);

            DataEntity = new GoogleChartData();
            DataEntity.BILLETSEQ = 020;
            DataEntity.S1 = 7;
            DataEntity.S2 = 30;
            listData.Add(DataEntity);
           



            var chartData = new object[listData.Count + 1];
            chartData[0] = new object[]{
                "BILLETSEQ",
                "S1",
                "S2",
                
            };

            int j = 0;
            foreach (var i in listData)
            {
                j++;
                chartData[j] = new object[] { i.BILLETSEQ.ToString(), i.S1, i.S2 };
            }
            return chartData;
        }

    }
}