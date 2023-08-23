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
using System.Data.SqlClient;

namespace KF_Web
{
    public partial class FIN0001 : CusBasePage
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
               
                if (!string.IsNullOrEmpty(Request["DownLoadExcel"]))
                {
                    SysEntity.Employee m_Employee = new SysEntity.Employee();
                    SysEntity.TransResult m_TransResult = GetLoinUser(Request);

                    if (m_TransResult.isSuccess)
                    {
                        m_Employee = (SysEntity.Employee)m_TransResult.ResultEntity;
                        string form_nos = "";

                        if (!string.IsNullOrEmpty(Request["form_nos"]))
                        {
                            form_nos = Request["form_nos"].ToString();
                        }
                        Dictionary<string, Object> p_Params = new Dictionary<string, Object>();
                        Int32 m_idx = 0;
                        foreach (string ExamineNo in form_nos.Split(','))
                        {
                            p_Params.Add("form_no" + m_idx.ToString(), ExamineNo);
                            m_idx++;
                        }
                      

                        SysEntity.TransResult m_DateResult = g_BL_YuRich.GetApprExcelInfo(m_Employee, p_Params);
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
                            ISheet sheet = workbook.CreateSheet("優撥明細");

                            int headerColSpan = 12; // 設定抬頭要跨越的欄數，這裡為3
                                                   // 表格抬頭
                            IRow headerRow1 = sheet.CreateRow(0);
                            ICell headerCell1 = headerRow1.CreateCell(0);
                            headerCell1.SetCellValue("優先撥款核對表");
                            headerCell1.CellStyle = GetHeaderCellStyle(workbook);

                            IRow headerRow2 = sheet.CreateRow(1);
                            ICell headerCell2 = headerRow2.CreateCell(0);
                            headerCell2.SetCellValue("廠商:國峯租賃股份有限公司  聯繫電話：02-23121268  優撥日期："  );
                            headerCell2.CellStyle = GetHeaderCellStyle(workbook);
                            // 設定水平合併
                            sheet.AddMergedRegion(new CellRangeAddress(0, 0, 0, headerColSpan - 1));
                            sheet.AddMergedRegion(new CellRangeAddress(1, 1, 0, headerColSpan - 1));


                            string[] arrHeader = { "序", "業務別", "審件編號", "客戶姓名", "身分證號", "車號", "期數", "期付金", "申貸金額", "借新還舊金額", "他行代償金額", "備註" };
                            // 表頭
                            IRow headerRow3 = sheet.CreateRow(2);
                            int HeadIdx = 0;
                            foreach (string m_Header in arrHeader)
                            {
                                ICell cell1 = headerRow3.CreateCell(HeadIdx);
                                cell1.SetCellValue(m_Header);
                                cell1.CellStyle = GetHeaderCellStyle(workbook);
                                HeadIdx++;
                            }
                            // 資料行
                            int RowCount = dtAPPInfo.Rows.Count + 5;
                            for (int i = 0; i < RowCount; i++)
                            {
                                bool isEmptyRow = false;
                                if (i + 1 > dtAPPInfo.Rows.Count)
                                {
                                    isEmptyRow = true;
                                }
                                IRow dataRow = sheet.CreateRow(i + 3);

                                AddCell(workbook, dataRow, 0, (i + 1).ToString());
                                AddCell(workbook, dataRow, 1, isEmptyRow ? "" : dtAPPInfo.Rows[i]["promoName"].ToString());
                                AddCell(workbook, dataRow, 2, isEmptyRow ? "" : dtAPPInfo.Rows[i]["ExamineNo_Pay"].ToString());
                                AddCell(workbook, dataRow, 3, isEmptyRow ? "" : dtAPPInfo.Rows[i]["customer_name"].ToString());
                                AddCell(workbook, dataRow, 4, isEmptyRow ? "" : dtAPPInfo.Rows[i]["customer_idcard_no"].ToString());
                                AddCell(workbook, dataRow, 5, isEmptyRow ? "" : dtAPPInfo.Rows[i]["car_no"].ToString());
                                AddCell(workbook, dataRow, 6, isEmptyRow ? "" : dtAPPInfo.Rows[i]["instNo"].ToString());
                                AddCell(workbook, dataRow, 7, isEmptyRow ? "" : dtAPPInfo.Rows[i]["instAmt"].ToString());
                                AddCell(workbook, dataRow, 8, isEmptyRow ? "" : dtAPPInfo.Rows[i]["instCap"].ToString());
                                AddCell(workbook, dataRow, 9, isEmptyRow ? "" : dtAPPInfo.Rows[i]["remitAmount"].ToString());
                                AddCell(workbook, dataRow, 10, "");
                                AddCell(workbook, dataRow, 11, "");
                            }


                            // 表尾文字
                            int rowCount = sheet.LastRowNum;
                            IRow footerRow;
                            ICell footerCell;

                            for (int i = 1; i <= 6; i++)
                            {
                                string m_Text = "";
                                switch (i)
                                {
                                    case 1:
                                        m_Text = "注意事項：";
                                        break;
                                    case 2:
                                        m_Text = "※收件時間：依照OA優先撥款流程「優撥回傳時間表」。";
                                        break;
                                    case 3:
                                        m_Text = "※回件時間：正本回件五個工作日未完成回件者(以撥款日起算)，累計達2件(含)以上，則調整回原撥款模式(正本回件撥款N+1)，裕富數位資融將保留優先撥款機制合作權利。";
                                        break;
                                    case 4:
                                        m_Text = "※假日及例假日無撥款服務。";
                                        break;
                                    case 5:
                                        m_Text = "※撥款文件需備齊，設定書請另外獨立一份PDF檔。";
                                        break;
                                    case 6:
                                        m_Text = "※正本回件時，請依優撥EXCEL明細檔的案件序號排列後寄回(由序號1開始排序)。";
                                        break;
                                }
                                footerRow = sheet.CreateRow(rowCount + i);
                                footerCell = footerRow.CreateCell(0);
                                footerCell.SetCellValue(m_Text);
                                // 表尾文字跨越3欄
                                CellRangeAddress cellRange = new CellRangeAddress(rowCount + i, rowCount + i, 0, headerColSpan - 1);
                                sheet.AddMergedRegion(cellRange);
                                // 表尾文字靠左
                                ICellStyle leftAlignCellStyle = workbook.CreateCellStyle();
                                leftAlignCellStyle.Alignment = HorizontalAlignment.Left;
                                footerCell.CellStyle = leftAlignCellStyle;
                            }



                            // 自動調整列寬
                            for (int i = 0; i < arrHeader.Length - 1; i++)
                            {
                                sheet.AutoSizeColumn(i);
                                int originalWidth = sheet.GetColumnWidth(i); // 假設這裡取得第1欄的寬度
                                int newWidth = (int)(originalWidth * 1.30);
                                sheet.SetColumnWidth(i, newWidth);
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

                if (!string.IsNullOrEmpty(Request["DownLoadExcel1"]))
                {
                    SysEntity.Employee m_Employee = new SysEntity.Employee();
                    SysEntity.TransResult m_TransResult = GetLoinUser(Request);
                    m_Employee = (SysEntity.Employee)m_TransResult.ResultEntity;
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

        static void AddCell(IWorkbook workbook, IRow dataRow, int CellIdx,string Value, bool isEmptyRow=false)
        {
            ICell cell = dataRow.CreateCell(CellIdx);
            if (isEmptyRow)
            {
                Value = "";
            }
            cell.SetCellValue(Value);
            cell.CellStyle = GetCellStyle(workbook);
        }

        // 獲取表格抬頭樣式
        static ICellStyle GetHeaderCellStyle(IWorkbook workbook)
        {
            ICellStyle cellStyle = workbook.CreateCellStyle();
            cellStyle.Alignment = HorizontalAlignment.Center;
            cellStyle.VerticalAlignment = VerticalAlignment.Center;
            cellStyle.BorderTop = NPOI.SS.UserModel.BorderStyle.Thin;
            cellStyle.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            cellStyle.BorderLeft = NPOI.SS.UserModel.BorderStyle.Thin;
            cellStyle.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;

            cellStyle.WrapText = true;

            IFont font = workbook.CreateFont();
            font.Boldweight = (short)FontBoldWeight.Bold;
            cellStyle.SetFont(font);
            cellStyle.Alignment = HorizontalAlignment.Center;
            cellStyle.VerticalAlignment = VerticalAlignment.Center;

           

            return cellStyle;
        }


        
        // 獲取資料行樣式
        static ICellStyle GetCellStyle(IWorkbook workbook)
        {
            ICellStyle cellStyle = workbook.CreateCellStyle();
            cellStyle.Alignment = HorizontalAlignment.Center;
          
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

            foreach (KeyValuePair<string, Object> item in p_Params)
            {
                string ItemNa = item.Key;
                string ItemVal = item.Value.ToString();
            }



            m_TransResult.isSuccess = false;
            m_TransResult.LogMessage = "TEST";

            return m_TransResult;
        }


    }
}