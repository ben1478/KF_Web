<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="YUR0002.aspx.cs" Inherits="KF_Web.YUR002" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="KF Web SYSTEM" />
<meta name="description" content="KF Web SYSTEM"/>
<meta name="author" content="KF"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js" ></script>

<script type="text/javascript" src="../Scripts/scroll.js" ></script>
<script type="text/javascript" src="../Scripts/bootstrap.min.js" ></script>
<script src="../Scripts/Editor/umeditor.config.js" type="text/javascript"></script>
<script type="text/javascript" src="../Scripts/jquery.blockUI.js" ></script>
<script type="text/javascript" src="../Scripts/jquery-ui.js" ></script>
<script type="text/javascript" src="../Scripts/sortable.js" ></script>
<link rel="stylesheet" type="text/css" href="../Content/admin-forms.css"/>
<link rel="stylesheet" type="text/css" href="../Content/flag-icon-css-master/css/flag-icon.min.css"/>
<link rel="stylesheet" type="text/css" href="../Content/theme.css?12=1"/>
<link rel="stylesheet" type="text/css" href="../Content/Main.css"   />
<link rel="stylesheet" type="text/css" href="../Content/jquery-ui.css" />
<link rel='stylesheet' type='text/css' href='../fonts/flaticon/flaticon.css'/>
<link href="../Scripts/Editor/themes/default/css/umeditor.min.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="../img/favicon.ico"/>
  
    <script type="text/javascript">
        document.write('<script type="text/javascript" src="js/YUR0002.js?vi=' + Math.random() + '"><\/script>');
    </script>

     <script type="text/javascript">

         function GetAreaCode() {
             var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };

             var m_Result = new Object;
             $.ajax({
                 type: "POST",
                 contentType: "application/json; charset=utf-8",
                 url: "YUR0002.aspx/GetAreaCode",
                 data: JSON.stringify({ "Employee": m_Employee }),
                 dataType: "json",
                 success: function (Result) {
                     if (Result.d != null) {
                         if (Result.d.isSuccess) {
                             $.each(Result.d.ResultEntity.Table, function (Idx, Row) {
                                 $('#customer_id_number_areacode').append($('<option>', {
                                     value: Row.item_D_code,
                                     text: Row.item_D_name
                                 }));
                             });
                             
                         }
                         else {
                             alert(Result.d.LogMessage);
                         }
                     }
                 },
                 error: function (xhr, ajaxOptions, thrownError) {
                     alert(xhr.responseText);
                 }
             });
         }
     </script>




<style type="text/css">    
    


tr.InfoHead {
  background:linear-gradient(130deg, #FFBF00 30% ,#FFA500 80%);

}

tr.InfoTitle {
  background-color: #faf7d8;

}

td.Key
{
  color:red;
}
    .dte {
          width:120px !important;
          padding:0px;
    }
.DelChk
{
    width:38px !important;
}
.QueryIco
{
	text-align:center;
}
body.dragging, body.dragging * {
  cursor: move !important;
}

.dragged {
  position: absolute;
  opacity: 0.8;
  z-index: 2000;
}

.placeholder {
  position: absolute;
  width: 0px;    
  height: 0px;   
  border: 5px solid transparent;   
  border-left:  5px solid red;   
}
.placeholder:before {
  position: absolute;
  /** Define arrowhead **/
}
</style>
<title>KF Web SYSTEM</title>
</head>
<body >
    <form id="FormInitial" runat="server">
        <div class="panel timeout" style="text-align:center">
            <div id="divInfo" runat="server" style="margin: 0px auto; padding-right: 50px; text-align: right;" class="Info">
                <img class="mw30 br64 mr15" alt="avatar" src="../img/avatars/1.jpg" /><asp:Label ID="UserInfo" runat="server" Text=""></asp:Label>
                <asp:TextBox ID="txtAccount" Style="display: none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtDisplayName" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtWorkID" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtSiteFormID" Style="display: none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtGroupID" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:HiddenField ID="hidIsMobile" runat="server" />
                 <input type="hidden" id="hidMenuID" value="" runat="server" />
                 <input type="hidden" id="hidWebAPI_Path" value="" runat="server" />
                 
            </div>
           
            <table style="width: 85%;margin:auto" border="1" id="MainTable" class="MainTable" cellspacing="0" cellpadding="3" bgcolor="">
                <tr class="InfoHead" height="35" align="center">
                    <td colspan="4">裕富案件 - 案件狀態:<label id="lblCaseStatusDesc"></label>
                <asp:TextBox ID="txtCompanyCode" class="YRData" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>

                    </td>
                </tr>
                <tr height="35" id='QCSInfo' style="display: none" align="center">
                    <td colspan="4">
                        <table width="100%" border="1" id="tbQCS" cellspacing="0" cellpadding="3">
                            <tr class="InfoHead" align="center">
                                <td colspan="4">裕富審核歷程</td>
                            </tr>
                            <tr class="InfoTitle" align="center">
                                <td style="width: 15%; text-align: center">審核類別</td>
                                <td style="width: 15%; text-align: center">審核結果</td>
                                <td style="width: 50%; text-align: center">審核意見</td>
                                <td style="width: 20%; text-align: center">回覆時間</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr height="35" id='RequestSupplement' style="display: none" class="RequestSupplement" align="center">
                    <td colspan="4">
                        <table width="100%" border="1" id="RSTable" cellspacing="0" cellpadding="3">
                            <tr class="InfoHead" align="center">
                                <td colspan="4">補件</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div id="divRSUpdFile">
                                    </div>
                                    <div id="divRSAddFile">
                                        <input type="file" class="RSfile" id="RS_File1"/><label id="lblRS_File1"></label>
                                        <br>
                                        <input type="file" class="RSfile" id="RS_File2"/><label id="lblRS_File2"></label>
                                        <br>
                                        <input type="file" class="RSfile" id="RS_File3"/><label id="lblRS_File3"></label>
                                        <br>
                                        <input type="file" class="RSfile" id="RS_File4"/><label id="lblRS_File4"></label>
                                    </div>
                                </td>
                                <td colspan="2">補件備註1
                  <textarea id="comment1" class="RSData" name="comment1" rows="1" cols="60"></textarea><br>
                                    補件備註2
                  <textarea id="comment2" class="RSData" name="comment2" rows="1" cols="60"></textarea><br>
                                    補件備註3
                  <textarea id="comment3" class="RSData" name="comment3" rows="1" cols="60"></textarea><br>
                                    補件備註4
                  <textarea id="comment4" class="RSData" name="comment4" rows="1" cols="60"></textarea>
                                </td>
                            </tr>

                            <tr align="center">
                                <td colspan="4">
                                    <button id="btnRS" onclick="btnRSOnClick()" type="button">執行補件</button>
                                    <pre style="display: none" id="RSattachmentFile"></pre>
                                    <pre style="display: none" id="Upd_RSattachmentFile"></pre>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr height="35" id='RSInfo' style="display: none" class="RSInfo" align="center">
                    <td colspan="4">
                        <table width="100%" border="1" id="tbRS" cellspacing="0" cellpadding="3">
                            <tr class="InfoHead" align="center">
                                <td colspan="4">補件歷程</td>
                            </tr>
                            <tr class="InfoTitle" align="center">
                                <td style="width: 10%; text-align: center">補件次數</td>
                                <td colspan="2" style="width: 70%; text-align: center">補件資訊</td>
                                <td style="width: 20%; text-align: center">補件時間</td>
                            </tr>
                            <tr class="InfoTitle" align="center">
                                <td style="width: 10%; text-align: center">補件結果</td>
                                <td colspan="2" style="width: 70%; text-align: center">備註</td>
                                <td style="width: 20%; text-align: center">回覆時間</td>
                            </tr>
                        </table>

                    </td>
                </tr>

                <tr height="35" id='RequestforExam' style="display: none" class="RequestforExam" align="center">
                    <td colspan="4">
                        <table width="100%" border="1" id="RETable" cellspacing="0" cellpadding="3">
                            <tr class="InfoHead" align="center">
                                <td colspan="4">申覆</td>
                            </tr>
                            <tr>
                                <td>申覆備註</td>
                                <td colspan="3">
                                    <textarea id="REcomment" class="REData Key" name="REcomment" rows="2" cols="50"></textarea></td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <div id="divREUpdFile">
                                    </div>
                                    <div id="divREAddFile">
                                        <input type="file" class="REfile" id="RE_File1"><label id="lblRE_File1"></label>
                                        <br>
                                        <input type="file" class="REfile" id="RE_File2"><label id="lblRE_File2"></label>
                                        <br>
                                        <input type="file" class="REfile" id="RE_File3"><label id="lblRE_File3"></label>
                                    </div>
                                </td>
                            </tr>
                            <tr align="center">
                                <td colspan="4">
                                    <button id="btnRE" onclick="btnREOnClick()" type="button">執行申覆</button>
                                    <pre style="display: none" id="REattachmentFile"></pre>
                                    <pre style="display: none" id="Upd_REattachmentFile"></pre>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr height="35" id='REInfo' style="display: none" class="REInfo" align="center">
                    <td colspan="4">
                        <table width="100%" border="1" id="tbRE" cellspacing="0" cellpadding="3">
                            <tr class="InfoHead" align="center">
                                <td colspan="4">申覆歷程</td>
                            </tr>
                            <tr class="InfoTitle" align="center">
                                <td style="width: 10%; text-align: center">申覆次數</td>
                                <td colspan="2" style="width: 70%; text-align: center">申覆資訊</td>
                                <td style="width: 20%; text-align: center">申覆時間</td>
                            </tr>
                            <tr class="InfoTitle" align="center">
                                <td style="width: 10%; text-align: center">申覆結果</td>
                                <td colspan="2" style="width: 70%; text-align: center">備註</td>
                                <td style="width: 20%; text-align: center">回覆時間</td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr height="35" id='RequestPayment' style="display: none" class="RequestPayment" align="center">
                    <td colspan="4">
                        <table width="100%" border="1" id="RPTable" cellspacing="0" cellpadding="3">
                            <tr class="InfoHead" align="center">
                                <td colspan="4">請款請求
                                    請款狀態:<label id="lblRP_StatusDesc"></label>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <div id="divRPUpdFile">
                                    </div>
                                    <div id="divRPAddFile">
                                         <label id="lblSettingBook">請上傳-設定書;檔案名稱規範，填寫申請人姓名+車牌號碼 (陳小明 715-JAX)</label>
                                        <input type="file" class="RPfile" id="RP_File1"/><label id="lblRP_File1"></label>

                                        <br>
                                         <label id="lblSettingBook1">請上傳-指示付款同意書/牌登;檔案名稱規範，填寫審件編號+申請人姓名 (MM09230700001 陳小明)</label>
                                        <input type="file" class="RPfile" id="RP_File2"/><label id="lblRP_File2"></label>
                                        <br>
                                        <label id="lblAgreeBook">請上傳-委託撥款同意書</label>
                                        <input type="file" class="RPfile" id="RP_File3"/><label id="lblRP_File3"></label>
                                    </div>
                                </td>
                            </tr>

                             <tr class="InfoTitle" align="center">
                                <td colspan="4">匯款資訊</td>
                            </tr>
                            <tr>
                                  <td class='lbl Key ' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblBankCode'>匯款銀行代碼(包含分行代碼)</label>
                                </td>
                                <td colspan="3" style='width:30%;text-align:left;'>
                                    <input class='form-control ' id='txtBankCode' pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==7) return false;" style='width:20%;' type='number' />
                                </td>
                            </tr>
                            <tr>
                               
                                <td class='lbl Key' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblBankName'>匯款銀行</label>
                                </td>
                                <td style='width:30%;text-align:left;'>
                                    <input class='form-control' id='txtBankName'  maxlength="25" style='width:40%;' type='text' />
                                </td>
                                <td class='lbl Key' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblBankID'>銀行帳號</label>
                                </td>
                                <td style='width:30%;text-align:left;'>
                                    <input class='form-control ' id='txtBankID'  pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==20) return false;" style='width:40%;' type='number' />
                                </td>
                            </tr>
                            <tr>
                                <td class='lbl Key' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblAccountID'>戶名ID</label>
                                </td>
                                <td style='width:30%;text-align:left;'>
                                    <input class='form-control ' id='txtAccountID'  maxlength="10" style='width:40%;' type='text' />
                                    <input class="btn btn-primary mb10 mr5 notification" id="btnSameAI" ondblclick="return false" onclick="OnClickSame('AccountID')" type="button" value="同申請人"/>
                                </td>
                                <td class='lbl Key' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblAccountName'>戶名</label>
                                </td>
                                <td style='width:30%;text-align:left;'>
                                    <input class='form-control ' id='txtAccountName'  maxlength="10" style='width:40%;' type='text' />
                                    <input class="btn btn-primary mb10 mr5 notification" id="btnSameAN" ondblclick="return false" onclick="OnClickSame('AccountName')" type="button" value="同申請人"/>
                                </td>
                            </tr>
                            <tr class="InfoTitle" align="center">
                                <td colspan="4">金額確認
                                    
                                    <input  id="btnSamePay" ondblclick="return false" onclick="OnClickSame('SamePay')" type="button" value="同原始金額"/></td>
                            </tr>
                            <tr>
                                <td class='lbl Key' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblinstNo'>期數</label>
                                </td>
                                <td style='width:30%;text-align:left;'>
                                     <input class='form-control ' id='txtinstNo' pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==3) return false;" style='width:20%;' type='number' />

                                    
                                </td>
                                <td class='lbl Key' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblinstAmt'>期付金</label>
                                </td>
                                <td style='width:30%;text-align:left;'>
                                     <input class='form-control ' id='txtinstAmt' pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==6) return false;" style='width:20%;' type='number' />
                                </td>
                            </tr>
                             <tr>
                                  <td class='lbl Key ' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblinstCap'>申貸金額</label>
                                </td>
                                <td  style='width:30%;text-align:left;'>
                                    <input class='form-control ' id='txtinstCap' pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==8) return false;" style='width:40%;' type='number' />
                                </td>
                                   <td class='lbl ' style='width:20%;'>
                                    <label class='col-lg-2 control-label ' id='lblremitAmount'>借新還舊金額</label>
                                </td>
                                <td  style='width:30%;text-align:left;'>
                                    <input class='form-control ' id='txtremitAmount' pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==8) return false;" style='width:40%;' type='number' />
                                </td>
                            </tr>
                            

                            <tr align="center">
                                <td colspan="4">
                                    <button id="btnRP" onclick="btnRPOnClick()" type="button">請款請求</button>
                                    <pre style="display: none" id="RPattachmentFile"></pre>
                                    <pre style="display: none" id="Upd_RPattachmentFile"></pre>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr height="35" id='RPInfo' style="display: none" class="RPInfo" align="center">
                    <td colspan="4">
                        <table width="100%" border="1" id="tbRP" cellspacing="0" cellpadding="3">
                            <tr class="InfoHead" align="center">
                                <td colspan="4">請款歷程</td>
                            </tr>
                            <tr class="InfoTitle" align="center">
                                <td style="width: 10%; text-align: center">請款次數</td>
                                <td colspan="2" style="width: 70%; text-align: center">請款資訊</td>
                                <td style="width: 20%; text-align: center">請款時間</td>
                            </tr>
                            <tr class="InfoTitle" align="center">
                                <td style="width: 10%; text-align: center">請款結果</td>
                                <td colspan="2" style="width: 70%; text-align: center">撥款資訊</td>
                                <td style="width: 20%; text-align: center">回覆時間</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="InfoHead" height="35" align="center">
                    <td colspan="4">基本資料</td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">案件單號</td>
                    <td width="40%" align="left">

                        <input type="text" class="YRData" runat="server" id="form_no" value="" readonly="readonly"  size="12" maxlength="12"/>
                    </td>
                    <td width="10%">申請日期</td>
                    <td width="40%" align="left">

                        <input type="text"   id="Add_date" runat="server" disabled readonly size="12" maxlength="12"/>
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_customer_name">中文姓名</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData Key" id="customer_name" size="15" maxlength="20">
                    </td>
                    <td width="10%" class="Key" id="TD_customer_idcard_no">身分證字號</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData Key" id="customer_idcard_no" size="12" maxlength="10">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key"  id="TD_customer_birthday">出生日期</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData dte Key" id="customer_birthday" style="" maxlength="10"/>
                    </td>
                    <td width="10%"  id="TD_marital">婚姻狀況</td>
                    <td width="40%" align="left">
                        <input type="checkbox" class="KFData Key" name="marital" id="marital1" value="N">未婚
           
            <input type="checkbox" class="KFData" name="marital" id="marital2" value="Y">已婚
            
            <input type="checkbox" class="KFData" name="child" id="child" value="Y">子女
            <input type="text" class="KFData" id="childcount" size="2" maxlength="2">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_customer_id_number_status">身分證/初補換</td>
                    <td width="40%" align="left">
                        <input type="checkbox" class="YRData Key" name="customer_id_number_status" id="status1" value="1">初發
            
            <input type="checkbox" class="YRData" name="customer_id_number_status" id="status2" value="2">補發
            
            <input type="checkbox" class="YRData" name="customer_id_number_status" id="status3" value="3">換發
            <br>
                        <label id="TD_customer_id_issue_date">身分證初補換日</label>
                        <input type="text" class="YRData dte Key" id="customer_id_issue_date" size="6" maxlength="10">
                    </td>
                    <td width="10%" class="Key" id="TD_customer_id_number_areacode">發證地點</td>
                    <td width="40%" align="left">
                        <select id="customer_id_number_areacode" class="YRData Key" type="select" name="customer_id_number_areacode">
                        </select>
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">戶籍電話</td>
                    <td width="40%" align="left">區碼<input type="text" class="YRData" id="customer_resident_tel_code" size="2" maxlength="3" />
                        電話<input type="text" class="YRData" id="customer_resident_tel_num" size="8" maxlength="8" />
                        分機<input type="text" class="YRData" id="customer_resident_tel_ext" size="2" maxlength="4" />
                    </td>
                    <td width="10%">住宅電話</td>
                    <td width="40%" align="left">區碼<input type="text" class="YRData" id="customer_mail_tel_code" size="2" maxlength="3" />
                        電話<input type="text" class="YRData" id="customer_mail_tel_num" size="8" maxlength="8" />
                        分機<input type="text" class="YRData" id="customer_mail_tel_ext" size="2" maxlength="4" />
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_customer_mobile_phone">行動電話</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData Key" id="customer_mobile_phone" size="15" maxlength="10">
                    </td>
                    <td width="10%"  id="TD_customer_edutation_status">教育程度</td>
                    <td width="40%" align="left">
                        <input type="checkbox" class="YRData Key" name="customer_edutation_status" id="customer_edutation_status1" value="1031">
                        <label for="customer_edutation_status1">博士</label>
                        <input type="checkbox" class="YRData" name="customer_edutation_status" id="customer_edutation_status2" value="103">
                        <label for="customer_edutation_status2">碩士</label>
                        <input type="checkbox" class="YRData" name="customer_edutation_status" id="customer_edutation_status3" value="104">
                        <label for="customer_edutation_status3">大學</label>
                        <input type="checkbox" class="YRData" name="customer_edutation_status" id="customer_edutation_status4" value="1041">
                        <label for="customer_edutation_status4">專科</label>
                        <br>
                        <input type="checkbox" class="YRData" name="customer_edutation_status" id="customer_edutation_status5" value="105">
                        <label for="customer_edutation_status5">高中職</label>
                        <input type="checkbox" class="YRData" name="customer_edutation_status" id="customer_edutation_status6" value="100">
                        <label for="customer_edutation_status6">其他</label>
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_customer_resident_address">戶籍地址</td>
                    <td colspan="3" width="40%" align="left">郵遞區號
                        <input type="text" class="YRData" id="customer_resident_postalcode" readonly onclick="addrInputer(event,'customer_resident');" size="3" maxlength="6">
                        縣市<input type="text" class="YRData" id="customer_resident_addcity" readonly onclick="addrInputer(event,'customer_resident');" size="8" maxlength="8">
                        鄉鎮<input type="text" class="YRData" id="customer_resident_addregion" readonly onclick="addrInputer(event,'customer_resident');" size="8" maxlength="8">
                        <br>
                        地址<input type="text" class="YRData Key" id="customer_resident_address"  size="80" maxlength="150">
                        
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_customer_mail_address">通訊地址</td>
                    <td colspan="3" width="40%" align="left">
                        <input type="checkbox" class="YRData" name="customer_mail_identical" id="customer_mail_identical" value="Y">
                        <label for="customer_mail_identical">同戶籍地址</label>
                        <br>
                        郵遞區號
                        <input type="text" class="YRData" id="customer_mail_postalcode" readonly onclick="addrInputer(event,'customer_mail');" size="3" maxlength="6">
                        縣市<input type="text" class="YRData" id="customer_mail_addcity" readonly onclick="addrInputer(event,'customer_mail');" size="8" maxlength="8">
                        鄉鎮<input type="text" class="YRData" id="customer_mail_addregion" readonly onclick="addrInputer(event,'customer_mail');" size="8" maxlength="8">
                        <br>
                        地址<input type="text" class="YRData Key" id="customer_mail_address" size="80" maxlength="150">
                        
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">居住時間</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="customer_dwell_year" size="3" maxlength="2">
                        年
            <select title="居住時間-月" class="YRData" type="select" id="customer_dwell_month">
                <option value="0">0</option>
            </select>月
            
                    </td>
                    <td width="10%" class="Key" id="TD_customer_dwell_status">居住狀況</td>
                    <td width="40%" align="left">
                        <input type="checkbox" class="YRData Key" name="customer_dwell_status" id="customer_dwell_status1" value="1">本人名下
            
            <input type="checkbox" class="YRData" name="customer_dwell_status" id="customer_dwell_status2" value="2">配偶名下
            
            <input type="checkbox" class="YRData" name="customer_dwell_status" id="customer_dwell_status3" value="3">親友
            
            <input type="checkbox" class="YRData" name="customer_dwell_status" id="customer_dwell_status4" value="4">租賃
            <br>
                        <input type="checkbox" class="YRData" name="customer_dwell_status" id="customer_dwell_status5" value="5">宿舍
            <input type="checkbox" class="YRData" name="customer_dwell_status" id="customer_dwell_status6" value="6">其他
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_customer_check_address">帳單地址</td>
                    <td colspan="3" width="40%" align="left">
                        <input type="checkbox" class="YRData" name="customer_check_identical" id="customer_check_identical" value="Y">
                        <label for="customer_check_identical">同通訊地址</label>
                        <br>
                        郵遞區號
                        <input type="text" class="YRData" id="customer_check_postalcode" readonly onclick="addrInputer(event,'customer_check');" size="3" maxlength="6">
                        縣市<input type="text" class="YRData" id="customer_check_addcity" readonly onclick="addrInputer(event,'customer_check');" size="8" maxlength="8">
                        鄉鎮<input type="text" class="YRData" id="customer_check_addregion" readonly onclick="addrInputer(event,'customer_check');" size="8" maxlength="8">
                        <br>
                        地址<input type="text" class="YRData Key" id="customer_check_address"   size="80" maxlength="150">
                       
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_payment_mode">繳款方式</td>
                    <td width="40%" align="left">
                        <input type="checkbox" class="YRData Key" name="payment_mode" id="payment_mode1" value="3">
                        電子帳單
            <br>
                        <input type="checkbox" class="YRData" name="payment_mode" id="payment_mode2" value="5">
                        簡訊條碼繳款
                    </td>
                    <td width="10%" id="TD_customer_email">E-mail</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="customer_email" size="30" maxlength="150">
                    </td>
                </tr>
                <tr class="InfoHead" height="35" align="center">
                    <td colspan="4">職業資料</td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_customer_company_name">公司名稱</td>
                    <td width="40%" align="left">
                        <input type="checkbox" class="YRData" style="display: none" name="customer_profession_status" id="customer_profession_status1" value="1">
                        <!--無-->

                        <input type="checkbox" class="YRData" name="customer_profession_status" id="customer_profession_status2" value="2">
                        家管
            <br>
                        <input type="text" class="YRData Key" id="customer_company_name" size="40" maxlength="50">
                    </td>
                    <td width="10%" class="Key" id="TD_customer_company_tel">公司電話</td>
                    <td width="40%" align="left">
                        <label id="TD_customer_company_tel_code" style="display: none">職業資料-公司區碼</label>
                        區碼
                        <input type="text" class="YRData Key" id="customer_company_tel_code" size="2" maxlength="3">
                        <label id="TD_customer_company_tel_num" style="display: none">職業資料-公司電話</label>
                        電話 
                        <input type="text" class="YRData Key" id="customer_company_tel_num" size="8" maxlength="8">
                        分機<input type="text" class="YRData" id="customer_company_tel_ext" size="2" maxlength="4">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">公司地址</td>
                    <td colspan="3" width="40%" align="left">郵遞區號
                        <input type="text" class="YRData" id="customer_company_postalcode" readonly onclick="addrInputer(event,'customer_company');" size="3" maxlength="6">
                        縣市<input type="text" class="YRData" id="customer_company_addcity" readonly onclick="addrInputer(event,'customer_company');" size="8" maxlength="8">
                        鄉鎮<input type="text" class="YRData" id="customer_company_addregion" readonly onclick="addrInputer(event,'customer_company');" size="8" maxlength="8">
                        <br>
                        地址<input type="text" class="YRData" id="customer_company_address"   size="80" maxlength="150">
                       
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">職業狀態</td>
                    <td colspan="3" width="40%" align="left">職稱
                        <input type="text" class="YRData" id="customer_job_type" size="15" maxlength="100">
                        年資
                        <input type="text" class="YRData" id="customer_work_year" size="3" maxlength="3">年
            <select title="年資-月" class="YRData" type="select" id="customer_work_month">
                <option value="0">0</option>
            </select>月
          
            &nbsp; &nbsp; 月薪<input type="number" class="YRData" id="customer_month_salary" size="8" maxlength="8">
                    </td>
                </tr>
                <tr class="InfoHead" height="35" align="center">
                    <td colspan="4">銀行資料</td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">辦卡狀態</td>
                    <td colspan="3" width="40%" align="left">
                        <input type="checkbox" class="YRData" name="customer_creditcard_status" id="customer_creditcard_status1" value="1">
                        沒辦過卡            
           <input type="checkbox" class="YRData" name="customer_creditcard_status" id="customer_creditcard_status2" value="2">
                        無卡自停            
           <input type="checkbox" class="YRData" name="customer_creditcard_status" id="customer_creditcard_status3" value="3">
                        協商繳款中
           <br>
                        <input type="checkbox" class="YRData" name="customer_creditcard_status" id="customer_creditcard_status4" value="4">
                        其他
           <input type="text" class="YRData" id="customer_creditcard_status_remark" size="80" maxlength="150">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">發卡銀行</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="customer_creditcard_bank" size="30" maxlength="80">
                    </td>
                    <td width="10%">有效日期</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="customer_creditcard_validdate_year" size="2" maxlength="2">
                        年(西元年兩碼)
            <select title="有效日期-月" class="YRData" type="select" id="customer_creditcard_validdate_month">
                </select>
                        月
                    </td>
                </tr>
                <tr class="InfoHead" height="35" align="center">
                    <td colspan="4">連保資料</td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_guarantor_option">連保選項</td>
                    <td colspan="3" width="40%" align="left">
                        <input type="checkbox" class="YRData Key" name="guarantor_option" id="guarantor_option1" value="1">
                        連帶保證人(需付保證人身分證正反面影本及簽名)         
           <input type="checkbox" class="YRData" name="guarantor_option" id="guarantor_option2" value="2">
                        配偶資料僅供參考
           <input type="checkbox" class="YRData" name="guarantor_option" id="guarantor_option3" value="3">
                        法定代理人
           <br>
                        <input type="checkbox" class="YRData" name="guarantor_option" id="guarantor_option4" value="4">
                        商品實際使用人
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" id="TD_guarantor_name">姓名</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="guarantor_name" size="10" maxlength="10">
                    </td>
                    <td width="10%" id="TD_guarantor_relation">關係</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="guarantor_relation" size="10" maxlength="10">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" id="TD_guarantor_idcard_no">身分證字號</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="guarantor_idcard_no" size="10" maxlength="10">
                    </td>
                    <td width="10%" id="TD_guarantor_birthday">出生日期</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData dte" id="guarantor_birthday" size="10" maxlength="10">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">住家電話</td>
                    <td width="40%" align="left">區碼<input type="text" class="YRData" id="guarantor_resident_tel_code" size="2" maxlength="3">
                        電話<input type="text" class="YRData" id="guarantor_resident_tel_num" size="8" maxlength="8">
                        分機<input type="text" class="YRData" id="guarantor_resident_tel_ext" size="2" maxlength="4">
                    </td>
                    <td width="10%" id="TD_guarantor_mobile_phone">行動電話</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="guarantor_mobile_phone" size="15" maxlength="10">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" id="TD_guarantor_company_name">公司名稱</td>
                    <td width="40%" align="left">
                        <input type="checkbox" class="KFData" style="display: none" name="guarantor_profession_status" id="guarantor_profession_status1" value="1">
                        <!--無-->
                        <input type="checkbox" class="KFData" name="guarantor_profession_status" id="guarantor_profession_status2" value="2">
                        家管 
                        <br>

                        <input type="text" class="YRData" id="guarantor_company_name" size="40" maxlength="50">
                    </td>
                    <td width="10%" id="TD_guarantor_company">公司電話</td>
                    <td width="40%" align="left">
                        <label id="TD_guarantor_company_tel_code" style="display: none">保人資訊-公司區碼</label>
                        區碼<input type="text" class="YRData" id="guarantor_company_tel_code" size="2" maxlength="3">
                        <label id="TD_guarantor_company_tel_num" style="display: none">保人資訊-公司電話</label>
                        電話<input type="text" class="YRData" id="guarantor_company_tel_num" size="8" maxlength="8">
                        分機<input type="text" class="YRData" id="guarantor_company_tel_ext" size="2" maxlength="4">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">公司地址</td>
                    <td colspan="3" width="40%" align="left">郵遞區號
                        <input type="text" class="YRData" id="guarantor_postalcode" readonly onclick="addrInputer(event,'guarantor');" size="3" maxlength="6">
                        縣市<input type="text" class="YRData" id="guarantor_addcity" readonly onclick="addrInputer(event,'guarantor');" size="8" maxlength="8">
                        鄉鎮<input type="text" class="YRData" id="guarantor_addregion" readonly onclick="addrInputer(event,'guarantor');" size="8" maxlength="8">
                        <br>
                        地址<input type="text" class="YRData" id="guarantor_address" readonly onclick="addrInputer(event,'guarantor');" size="80" maxlength="150">
                        <input type="button" value="..." class="btnAddress" onclick="addrInputer(event,'guarantor');">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">職稱</td>
                    <td colspan="3" width="40%" align="left">
                        <input type="text" class="YRData" id="guarantor_job_type" size="15" maxlength="100">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key">上傳附件</td>
                    <td colspan="3" width="40%" align="left">

                        <div id="divUpdFile">
                        </div>
                        <div id="divAddFile">
                            <input type="file" class="file" id="attachmentFile1" /><label id="lblattachmentFile1"></label>
                            <br>
                            <input type="file" class="file" id="attachmentFile2" /><label id="lblattachmentFile2"></label>
                            <br>
                            <input type="file" class="file" id="attachmentFile3" /><label id="lblattachmentFile3"></label>
                        </div>
                        <pre style="display: none" id="attachmentFile"></pre>
                        <pre style="display: none" id="Upd_attachmentFile"></pre>

                        <button style="display: none" onclick="convertFiles()" type="button">轉換</button>

                    </td>
                </tr>


                <tr class="InfoHead" height="35" align="center">
                    <td colspan="4">聯絡人一</td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">姓名</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="contact_person_name_i" size="10" maxlength="10">
                    </td>
                    <td width="10%">關係</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="contact_person_relation_i" size="10" maxlength="10">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">住家電話</td>
                    <td width="40%" align="left">區碼<input type="text" class="YRData" id="contact_person_areacode_i" size="2" maxlength="3">
                        電話<input type="text" class="YRData" id="contact_person_tel_i" size="8" maxlength="8">
                        分機<input type="text" class="YRData" id="contact_person_tel_ext_i" size="2" maxlength="4">
                    </td>
                    <td width="10%">行動電話</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="contact_person_mobile_phone_i" size="15" maxlength="10">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">公司名稱</td>
                    <td width="40%" align="left">
                        <input type="text" class="KFData" id="contact_person_company_name_i" size="40" maxlength="50">
                    </td>
                    <td width="10%">公司電話</td>
                    <td width="40%" align="left">區碼<input type="text" class="YRData" id="contact_person_company_areacode_i" size="2" maxlength="3">
                        電話<input type="text" class="YRData" id="contact_person_company_tel_i" size="8" maxlength="8">
                        分機<input type="text" class="YRData" id="contact_person_company_tel_ext_i" size="2" maxlength="4">
                    </td>
                </tr>
                <tr class="InfoHead" height="35" align="center">
                    <td colspan="4">聯絡人二</td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">姓名</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="contact_person_name_ii" size="10" maxlength="10">
                    </td>
                    <td width="10%">關係</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="contact_person_relation_ii" size="10" maxlength="10">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">住家電話</td>
                    <td width="40%" align="left">區碼<input type="text" class="YRData" id="contact_person_areacode_ii" size="2" maxlength="3">
                        電話<input type="text" class="YRData" id="contact_person_tel_ii" size="8" maxlength="8">
                        分機<input type="text" class="YRData" id="contact_person_tel_ext_ii" size="2" maxlength="4">
                    </td>
                    <td width="10%">行動電話</td>
                    <td width="40%" align="left">
                        <input type="text" class="YRData" id="contact_person_mobile_phone_ii" size="15" maxlength="10">
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">公司名稱</td>
                    <td width="40%" align="left">
                        <input type="text" class="KFData" id="contact_person_company_name_ii" size="40" maxlength="50">
                    </td>
                    <td width="10%">公司電話</td>
                    <td width="40%" align="left">區碼<input type="text" class="YRData" id="contact_person_company_areacode_ii" size="2" maxlength="3">
                        電話<input type="text" class="YRData" id="contact_person_company_tel_ii" size="8" maxlength="8">
                        分機<input type="text" class="YRData" id="contact_person_company_tel_ext_ii" size="2" maxlength="4">
                    </td>
                </tr>
                <tr class="InfoHead" height="35" align="center">
                    <td colspan="4">商品資訊</td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_product_category_id" >商品品牌</td>
                    <td width="40%" align="left">
                        <select title="商品品牌" class="YRData" type="select" id="product_category_id" onchange="OnChangPCI()"></select>
                    </td>
                    <td width="10%">商品名稱</td>
                    <td width="40%" align="left">
                        <select title="商品名稱" class="YRData" type="select" id="product_id"></select>
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">業務別</td>
                    <td width="40%" align="left">
                        <select title="業務別" class="YRData" type="select" id="bus_type"></select>
                        <!--- 業務別名稱 --->
                        <input type="hidden" class="YRData" id="bus_type_name" />

                    </td>
                    <td width="10%">專案</td>
                    <td width="40%" align="left">
                        <select title="專案" class="YRData" type="select" id="promotion_no"></select>
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_car_no">車牌號碼</td>
                    <td width="40%" colspan="3" align="left">
                        <input type="text" class="KFData Key" id="car_no" size="10" maxlength="8"/>
                       
                    </td>
                </tr>

                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_periods_num">期數 </td>
                    <td width="40%" align="left">
                        <input type="number" style="width:50px" class="YRData Key" id="periods_num" size="3" maxlength="3">
                    </td>
                    <td width="10%" class="Key" id="TD_payment">每期應繳金額</td>
                    <td width="40%" align="left">
                        <input type="number" class="YRData Key " id="payment" size="8" maxlength="6">
                    </td>
                </tr>
               
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_deposit">頭款(訂金) </td>
                    <td width="40%" align="left">
                        <input type="number" class="YRData Key" id="deposit" size="8" maxlength="6">
                    </td>
                    <td width="10%" class="Key" id="TD_staging_total_price">分期總額</td>
                    <td width="40%" align="left">
                        <input type="number" class="YRData Key" id="staging_total_price" size="7" maxlength="8"/>
                    </td>
                </tr>
                 <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%" class="Key" id="TD_staging_amount">辦理分期金額</td>
                    <td width="40%" colspan="3" align="left">
                        <input type="number" class="YRData Key" id="staging_amount" size="8" maxlength="6">
                       <label id="lblstaging_amount" style="color:red"></label>
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="25" align="center">
                    <td width="10%">經銷商備註</td>
                    <td width="40%" colspan="3" align="left">
                        <textarea id="dealer_note" class="YRData" name="dealer_note" rows="3" cols="100"></textarea>
                        <br>
                        指定照會時間
                        <input type="text" class="YRData dte" id="dealer_note_date_yyyymm" size="7" maxlength="8">
                        &nbsp;&nbsp;
        <select title="照會時間-時" class="YRData" type="select" id="dealer_note_date_hh">
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
        </select>時&nbsp;&nbsp;
        
        <select title="照會時間-分" class="YRData" type="select" id="dealer_note_date_mm">
            <option value="00">00</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
        </select>分
                    </td>
                </tr>
                <tr bgcolor="#FFFFFF" height="35" align="center">
                    <td align="center" colspan="4">
                        <!--- 撥款對象 --->
                        <input type="hidden" class="YRData" id="payee_type" value="10" />
                        <!--- 撥款人帳戶名稱 --->
                        <input type="hidden" class="YRData" id="payee_account_name" />
                        <!--- 撥款人身分證字號 --->
                        <input type="hidden" class="YRData" id="payee_account_idno" />
                        <!--- 撥款銀行代碼 --->
                        <input type="hidden" class="YRData" id="payee_bank_code" />
                        <!--- 撥款銀行分行代碼 --->
                        <input type="hidden" class="YRData" id="payee_bank_detail_code" />
                        <!--- 撥款帳號 --->
                        <input type="hidden" class="YRData" id="payee_account_num" />
                        <!--- 商品利率選項  --->
                        <input type="hidden" class="YRData" id="product_rate_option" />
                        <!--- 商品案件選項 --->
                        <input type="hidden" class="YRData" id="product_case_option" />
                        <!--- 通路商代號 --->
                        <input type="hidden" class="YRData" id="dealer_no" value="MM09" />
                        <!--- 通路商統編 --->
                        <input type="hidden" class="YRData" id="dealer_id_no" value="52611690" />
                        <!--- 經銷商或債權讓與人名稱 --->
                        <input type="hidden" class="YRData" id="dealer_name" value="國?租賃股份有限公司" />
                        <!--- 經銷商或債權讓與人電話 --->
                        <input type="hidden" class="YRData" id="dealer_tel" value="0927780125" />
                        <!--- 經銷商或債權讓與人傳真 --->
                        <input type="hidden" class="YRData" id="dealer_fax" />
                        <!--- 據點/人員 ID --->
                        <input type="hidden" class="YRData" id="contact_id_no" />
                        <!--- 據點/人員--->
                        <input type="hidden" class="YRData" id="contact_name" value="國?租賃股份有限公司" />
                        <!--- 據點代號--->
                        <input type="hidden" class="YRData" id="dealer_branch_no" value="0001" />
                        <!--- 同經銷商或債權讓與人--->
                        <input type="hidden" class="YRData" id="dealer_branch_name_identical" />
                        <!--- 經辦店名稱 --->
                        <input type="hidden" class="YRData" id="dealer_branch_name" value="國?租賃股份有限公司" />
                        <!--- 經辦店電話  --->
                        <input type="hidden" class="YRData" id="dealer_branch_tel" value="0927780125" />
                        <!--- 經辦店手機  --->
                        <input type="hidden" class="YRData" id="contact_phone" value="0927780125" />
                        <!--- 經辦店備註選項  --->
                        <input type="hidden" class="YRData" id="dealer_note_code" />
                        <!--- 負責人ID --->
                        <input type="hidden" class="YRData" id="company_principal_id" />
                        <!--- 負責人姓名 --->
                        <input type="hidden" class="YRData" id="company_principal_name" />
                        <!--- 撥佣對象 通路商統編或是業務身分證字號  --->
                        <input type="hidden" class="YRData" id="commission_target" value="52611690" />

                        <input type="hidden"  runat="server" id="hidCase_Company" value="YL" />

                        

                        <!--- 負責人姓名 --->
                        <input type="hidden" runat="server" id="Action" value="upd" />
                        <input type="hidden" id="casestatus" />
                        <input type="hidden" id="rp_status" />

                        <input type="hidden" id="TransactionId" />
                        <button id="btnSubmit" onclick="btnSubmitOnClick()" type="button">確定送出</button>
                        <div id="divDownload"></div>
                    </td>
                </tr>
            </table>



        </div>


    </form>
   
  
</body>

</html>
