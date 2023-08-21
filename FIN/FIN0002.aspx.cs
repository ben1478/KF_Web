using System;
using System.Collections.Generic;
using System.Web.UI.WebControls;
using Business_Logic.Entity;
using System.Data;
using Business_Logic.Model;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.IO;
using System.Threading;
using NPOI.SS.Util;
using NPOI.SS.Formula.Functions;
using static Business_Logic.Entity.SysEntity;

namespace KF_Web
{
    public partial class FIN0002: CusBasePage
    {
        public static BL_YuRich g_BL_YuRich = new BL_YuRich();

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
                if (!string.IsNullOrEmpty(Request["DownLoadExcel"]))
                {
                    SysEntity.Employee m_Employee = new SysEntity.Employee();
                    SysEntity.TransResult m_TransResult = GetLoinUser(Request);

                    if (m_TransResult.isSuccess)
                    {
                        m_Employee = (SysEntity.Employee)m_TransResult.ResultEntity;
                        string PayDateE = "";
                        string PayDateS = "";

                        if (!string.IsNullOrEmpty(Request["PayDateS"]))
                        {
                            PayDateS = Request["PayDateS"].ToString();
                        }
                        if (!string.IsNullOrEmpty(Request["PayDateE"]))
                        {
                            PayDateE = Request["PayDateE"].ToString();
                        }
                        Dictionary<string, Object> p_Params = new Dictionary<string, Object>();
                        p_Params.Add("PayDateS", PayDateS);
                        p_Params.Add("PayDateE", PayDateE);

                        SysEntity.TransResult m_DateResult = g_BL_YuRich.GetAppropriationInfos(m_Employee, p_Params,true);
                        if (m_DateResult.isSuccess)
                        {
                            DataTable dtAPPInfo = (DataTable)m_DateResult.ResultEntity;
                            if (dtAPPInfo.Rows.Count == 0)
                            {
                                // 傳送Excel資料回前端
                                Response.Clear();
                                Response.ContentType = "text/plain"; // 使用text格式傳送資料
                                Response.Write(null);
                                Response.End();
                            }
                            // 創建一個新的Excel工作簿
                            IWorkbook workbook = new XSSFWorkbook();
                            ISheet sheet = workbook.CreateSheet("Sheet1");

                            int headerColSpan = 21; // 設定抬頭要跨越的欄數，這裡為3
                                                    // 表格抬頭
                            IRow headerRow1 = sheet.CreateRow(0);
                            ICell headerCell1 = headerRow1.CreateCell(0);
                            headerCell1.SetCellValue("代裕富撥款明細表");
                            headerCell1.CellStyle = GetHeaderCellStyle(workbook);

                            IRow headerRow2 = sheet.CreateRow(1);
                            ICell headerCell2 = headerRow2.CreateCell(0);
                            DateTime dateTime = DateTime.Now; // 取得當前日期和時間

                            string formattedDateTime = dateTime.ToString("yyyy/MM/dd HH:mm:ss");


                            headerCell2.SetCellValue("出表日期:" + formattedDateTime);
                            headerCell2.CellStyle = GetHeaderCellStyle(workbook, "R");
                            // 設定水平合併
                            sheet.AddMergedRegion(new CellRangeAddress(0, 0, 0, headerColSpan - 1));
                            sheet.AddMergedRegion(new CellRangeAddress(1, 1, 0, headerColSpan - 1));


                            string[] arrHeader = { "撥款日期", "通路", "金流案編", "申請人ID", "申請人", "代撥方式", "應撥金額", "代償/還舊", "代扣手續費", "代扣通路費用", "撥申請人", "匯款作業費", "實撥申請人", "撥通路", "匯款銀行代碼", "匯款銀行", "銀行帳號", "戶名ID", "戶名", "業務別", "匯款日期" };
                            // 表頭
                            IRow headerRow3 = sheet.CreateRow(2);
                            int HeadIdx = 0;
                            foreach (string m_Header in arrHeader)
                            {
                                ICell cell1 = headerRow3.CreateCell(HeadIdx);
                                cell1.SetCellValue(m_Header);
                                cell1.CellStyle = GetCellStyle(workbook);
                                HeadIdx++;
                            }
                            // 資料行
                            int KF_remitAmount_All = 0;
                            int YR_remitAmount_All = 0;
                            int HandlingFee_All = 0;
                            int PathFee_All = 0;
                            int CustTotAmt_All = 0;
                            int RemitFee_All = 0;
                            int ActualAmt_All = 0;
                            int PathAmt_All = 0;


                            int RowCount = dtAPPInfo.Rows.Count + 5;
                            for (int i = 0; i < RowCount; i++)
                            {
                                bool isEmptyRow = false;
                                if (i + 1 > dtAPPInfo.Rows.Count)
                                {
                                    isEmptyRow = true;
                                }
                                else
                                {
                                    KF_remitAmount_All += ConverStrToInt(dtAPPInfo.Rows[i]["KF_remitAmount"].ToString());
                                    YR_remitAmount_All += ConverStrToInt(dtAPPInfo.Rows[i]["YR_remitAmount"].ToString());
                                    HandlingFee_All += ConverStrToInt(dtAPPInfo.Rows[i]["HandlingFee"].ToString());
                                    PathFee_All += ConverStrToInt(dtAPPInfo.Rows[i]["PathFee"].ToString());
                                    CustTotAmt_All += ConverStrToInt(dtAPPInfo.Rows[i]["CustTotAmt"].ToString());
                                    RemitFee_All += ConverStrToInt(dtAPPInfo.Rows[i]["RemitFee"].ToString());
                                    ActualAmt_All += ConverStrToInt(dtAPPInfo.Rows[i]["ActualAmt"].ToString());
                                    PathAmt_All += ConverStrToInt(dtAPPInfo.Rows[i]["PathAmt"].ToString());
                                }
                                IRow dataRow = sheet.CreateRow(i + 3);

                                AddCell(workbook, dataRow, 0, isEmptyRow ? "" : dtAPPInfo.Rows[i]["PayDate"].ToString());
                                AddCell(workbook, dataRow, 1, isEmptyRow ? "" : dtAPPInfo.Rows[i]["PathName"].ToString());
                                AddCell(workbook, dataRow, 2, isEmptyRow ? "" : dtAPPInfo.Rows[i]["ExamineNo_Pay"].ToString());
                                AddCell(workbook, dataRow, 3, isEmptyRow ? "" : dtAPPInfo.Rows[i]["customer_idcard_no"].ToString());
                                AddCell(workbook, dataRow, 4, isEmptyRow ? "" : dtAPPInfo.Rows[i]["customer_name"].ToString());
                                AddCell(workbook, dataRow, 5, isEmptyRow ? "" : dtAPPInfo.Rows[i]["Appr_Type"].ToString());
                                AddCell(workbook, dataRow, 6, isEmptyRow ? "" : ConverStrToInt(dtAPPInfo.Rows[i]["KF_remitAmount"].ToString()).ToString("N0"), "R");
                                AddCell(workbook, dataRow, 7, isEmptyRow ? "" : ConverStrToInt(dtAPPInfo.Rows[i]["YR_remitAmount"].ToString()).ToString("N0"), "R");
                                AddCell(workbook, dataRow, 8, isEmptyRow ? "" : ConverStrToInt(dtAPPInfo.Rows[i]["HandlingFee"].ToString()).ToString("N0"), "R");
                                AddCell(workbook, dataRow, 9, isEmptyRow ? "" : ConverStrToInt(dtAPPInfo.Rows[i]["PathFee"].ToString()).ToString("N0"), "R");
                                AddCell(workbook, dataRow, 10, isEmptyRow ? "" : ConverStrToInt(dtAPPInfo.Rows[i]["CustTotAmt"].ToString()).ToString("N0"), "R");
                                AddCell(workbook, dataRow, 11, isEmptyRow ? "" : ConverStrToInt(dtAPPInfo.Rows[i]["RemitFee"].ToString()).ToString("N0"), "R");
                                AddCell(workbook, dataRow, 12, isEmptyRow ? "" : ConverStrToInt(dtAPPInfo.Rows[i]["ActualAmt"].ToString()).ToString("N0"), "R");
                                AddCell(workbook, dataRow, 13, isEmptyRow ? "" : ConverStrToInt(dtAPPInfo.Rows[i]["PathAmt"].ToString()).ToString("N0"), "R");
                                AddCell(workbook, dataRow, 14, isEmptyRow ? "" : dtAPPInfo.Rows[i]["BankCode"].ToString());
                                AddCell(workbook, dataRow, 15, isEmptyRow ? "" : dtAPPInfo.Rows[i]["BankName"].ToString());
                                AddCell(workbook, dataRow, 16, isEmptyRow ? "" : dtAPPInfo.Rows[i]["BankID"].ToString());
                                AddCell(workbook, dataRow, 17, isEmptyRow ? "" : dtAPPInfo.Rows[i]["AccountID"].ToString());
                                AddCell(workbook, dataRow, 18, isEmptyRow ? "" : dtAPPInfo.Rows[i]["AccountName"].ToString());
                                AddCell(workbook, dataRow, 19, isEmptyRow ? "" : dtAPPInfo.Rows[i]["promoName"].ToString());
                                AddCell(workbook, dataRow, 20, isEmptyRow ? "" : dtAPPInfo.Rows[i]["Transfer_date"].ToString());
                            }


                            // 表尾文字
                            int rowCount = sheet.LastRowNum;
                            IRow footerRow;
                            footerRow = sheet.CreateRow(rowCount + 1);
                            AddCell(workbook, footerRow, 0, "小計","R");
                            AddCell(workbook, footerRow, 1, "");
                            AddCell(workbook, footerRow, 2, "");
                            AddCell(workbook, footerRow, 3, "");
                            AddCell(workbook, footerRow, 4, "");
                            AddCell(workbook, footerRow, 5, "");
                            // 表尾文字跨越3欄
                            CellRangeAddress cellRange = new CellRangeAddress(rowCount + 1, rowCount + 1, 0, 5);
                            sheet.AddMergedRegion(cellRange);

                        
                            AddCell(workbook, footerRow, 6, KF_remitAmount_All.ToString("N0"), "R");
                            AddCell(workbook, footerRow, 7, YR_remitAmount_All.ToString("N0"), "R");
                            AddCell(workbook, footerRow, 8, HandlingFee_All.ToString("N0"), "R");
                            AddCell(workbook, footerRow, 9, PathFee_All.ToString("N0"), "R");
                            AddCell(workbook, footerRow, 10, CustTotAmt_All.ToString("N0"), "R");
                            AddCell(workbook, footerRow, 11, RemitFee_All.ToString("N0"), "R");
                            AddCell(workbook, footerRow, 12, ActualAmt_All.ToString("N0"), "R");
                            AddCell(workbook, footerRow, 13, PathAmt_All.ToString("N0"), "R");
                            AddCell(workbook, footerRow, 14, "");
                            AddCell(workbook, footerRow, 15, "");
                            AddCell(workbook, footerRow, 16, "");
                            AddCell(workbook, footerRow, 17, "");
                            AddCell(workbook, footerRow, 18, "");
                            AddCell(workbook, footerRow, 19, "");
                            AddCell(workbook, footerRow, 20, "");
                           
                            sheet.AddMergedRegion(new CellRangeAddress(rowCount + 1, rowCount + 1, 14, 20));




                            // 自動調整列寬
                            for (int i = 0; i < arrHeader.Length ; i++)
                            {
                                sheet.AutoSizeColumn(i);
                            }

                            // 將Excel資料寫入MemoryStream
                            using (MemoryStream ms = new MemoryStream())
                            {
                                workbook.Write(ms);
                                byte[] bytes = ms.ToArray();

                                // 將Excel資料轉換成Base64字串
                                string base64String = Convert.ToBase64String(bytes);

                                // 傳送Excel資料回前端
                                Response.Clear();
                                Response.ContentType = "text/plain"; // 使用text格式傳送資料
                                Response.Write(base64String);
                                Response.End();
                            }
                        }
                        else
                        {
                            Response.Clear();
                            Response.Write(m_DateResult.LogMessage);

                        }
                    }
                }

            }
            catch (ThreadAbortException ex)
            {
              
            }
            catch (Exception ex)
            {
                Response.Clear();
                Response.Write(ex.Message);
                Response.Write("<label id='DownErr" + Request["DocID"].ToString() + "'>" + ex.Message + "</label>");
            }
        }
        static int ConverStrToInt(string m_Amt)
        {
            int Result = 0;
            if (!string.IsNullOrEmpty(m_Amt))
            {
                Result = Convert.ToInt32(m_Amt.Replace(",", ""));
            }
           

            return Result;
        }

        static void AddCell(IWorkbook workbook, IRow dataRow, int CellIdx, string Value,string Alignment="C", bool isEmptyRow = false)
        {
            ICell cell = dataRow.CreateCell(CellIdx);
            ICellStyle cellStyle = workbook.CreateCellStyle();

            if (isEmptyRow)
            {
                Value = "";
            }

            cell.SetCellValue(Value);
            cell.CellStyle = GetCellStyle(workbook,Alignment);
        }
        // 獲取表格抬頭樣式
        static ICellStyle GetHeaderCellStyle(IWorkbook workbook ,string Alignment="C")
        {
            ICellStyle cellStyle = workbook.CreateCellStyle();
            if (Alignment == "C")
            {
                cellStyle.Alignment = HorizontalAlignment.Center;
            }
            else if (Alignment == "L")
            {
                cellStyle.Alignment = HorizontalAlignment.Left;
            }
            else if (Alignment == "R")
            { 
                cellStyle.Alignment = HorizontalAlignment.Right;
            }

            cellStyle.VerticalAlignment = VerticalAlignment.Center;
            cellStyle.BorderTop = NPOI.SS.UserModel.BorderStyle.None;
            cellStyle.BorderBottom = NPOI.SS.UserModel.BorderStyle.None;
            cellStyle.BorderLeft = NPOI.SS.UserModel.BorderStyle.None;
            cellStyle.BorderRight = NPOI.SS.UserModel.BorderStyle.None;

            cellStyle.WrapText = true;

            IFont font = workbook.CreateFont();
            font.Boldweight = (short)FontBoldWeight.Bold;
            cellStyle.SetFont(font);

            return cellStyle;
        }


        
        // 獲取資料行樣式
        static ICellStyle GetCellStyle(IWorkbook workbook ,string Alignment = "C"  )
        {
            ICellStyle cellStyle = workbook.CreateCellStyle();

            if (Alignment == "C")
            {
                cellStyle.Alignment = HorizontalAlignment.Center;
            }
            else if (Alignment == "L")
            {
                cellStyle.Alignment = HorizontalAlignment.Left;
            }
            else if (Alignment == "R")
            {
                cellStyle.Alignment = HorizontalAlignment.Right;
            }


            cellStyle.VerticalAlignment = VerticalAlignment.Center;
            cellStyle.BorderTop = NPOI.SS.UserModel.BorderStyle.Thin;
            cellStyle.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            cellStyle.BorderLeft = NPOI.SS.UserModel.BorderStyle.Thin;
            cellStyle.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;

            return cellStyle;
        }


        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult GetAppropriationInfos(SysEntity.Employee p_Employee, Dictionary<string, Object> p_Params)
        {
            SysEntity.TransResult m_TransResult = g_BL_YuRich.GetAppropriationInfos(p_Employee, p_Params);

            if (m_TransResult.isSuccess)
            {
                m_TransResult.ResultEntity = g_FH.DataTableToJson((DataTable)m_TransResult.ResultEntity);
            }

            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult SubmitSave(SysEntity.Employee p_Employee, Dictionary<string, Object> p_Params)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult = g_BL_YuRich.SaveAppropriation(p_Employee, p_Params);
            return m_TransResult;
        }

        [System.Web.Services.WebMethod(enableSession: true)]
        public static SysEntity.TransResult SubmitCheck(SysEntity.Employee p_Employee, Dictionary<string, Object> p_Params)
        {
            SysEntity.TransResult m_TransResult = new SysEntity.TransResult();
            m_TransResult.isSuccess = true;
            int KF_remitAmount = ConverStrToInt(p_Params["KF_remitAmount"].ToString());
            int HandlingFee = ConverStrToInt(p_Params["HandlingFee"].ToString());
            int PathFee = ConverStrToInt(p_Params["PathFee"].ToString());
            int ChkCustTotAmt = KF_remitAmount - HandlingFee - PathFee;
            int CustTotAmt = ConverStrToInt(p_Params["CustTotAmt"].ToString());

            if (ChkCustTotAmt != CustTotAmt)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = "txtCustTotAmt||撥申請人不等於==>撥款金額：" + KF_remitAmount + "-代扣手續費：" + HandlingFee + "-代扣通路費：" + PathFee + "=" + ChkCustTotAmt;
                return m_TransResult;
            }
            int RemitFee = ConverStrToInt(p_Params["RemitFee"].ToString());
            int ActualAmt = ConverStrToInt(p_Params["ActualAmt"].ToString());

            int ChkActualAmt = CustTotAmt - RemitFee;
            if (ChkActualAmt != ActualAmt)
            {
                m_TransResult.isSuccess = false;
                m_TransResult.LogMessage = "txtActualAmt||實撥申請人不等於==>撥申請人：" + CustTotAmt + "-匯款作業費：" + RemitFee +  "=" + ChkActualAmt;
                return m_TransResult;
            }

            return m_TransResult;
        }





    }
}