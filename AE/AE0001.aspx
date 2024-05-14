<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AE0001.aspx.cs" Inherits="KF_Web.AE0001" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
<link rel="stylesheet" type="text/css" href="../Content/theme.css"/>
<link rel="stylesheet" type="text/css" href="../Content/Main.css"   />
<link rel="stylesheet" type="text/css" href="../Content/jquery-ui.css" />
<link rel='stylesheet' type='text/css' href='../fonts/flaticon/flaticon.css'/>
    <link href="../Scripts/Editor/themes/default/css/umeditor.min.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="../img/favicon.ico"/>
<style type="text/css">    
    
.Link 
{
	text-decoration:underline;
	font-weight: bold;
	color:blue;
	cursor: pointer;
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
         <!--- 定義開啟視窗參數 --->
         <input type="hidden" id="hidMaintainKey" value="FR_id" />
         <input type="hidden" id="hidMenuID" value="" runat="server" />
         <input type="hidden" id="selLanguage" value="TW" />
   

        
        <div class="panel timeout">
            <div id="divInfo" runat="server" style="margin: 0px auto; padding-right: 50px; text-align: right;" class="Info">
                <img class="mw30 br64 mr15" alt="avatar" src="../img/avatars/1.jpg" /><asp:Label ID="UserInfo" runat="server" Text=""></asp:Label>
                <asp:TextBox ID="txtAccount" Style="display: none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtCompanyCode" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtDisplayName" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtWorkID" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtGroupID" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtSiteFormID" Style="display: none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:HiddenField ID="hidIsMobile" runat="server" />
              
                 <input type="hidden"  runat="server" id="hidCase_Company" value="AE" />
                <input type="hidden"  runat="server" id="hidUserIP" value="" />
            </div>
            <div id="divMain" class="Main" runat="server" style="margin: 0px auto; text-align: center;">
                <section>
                    <div id="pagedep" runat="server" style="">
                        <div class="heading-icon">
                            <!-- 以下部門LOGO可選 d-01 至 d-16 -->
                            <img id="imgModule" runat="server" src="" alt="" />
                        </div>
                        <div class="heading-title">
                            <span class=""><i class="fa fa-caret-right" aria-hidden="true"></i><b>
                                <label runat="server" modkey="" id='titleModuleName'></label>
                            </b></span>
                        </div>
                    </div>
                </section>
                <section id="content" class="">
                    <!-- begin: .tray-center -->
                    <div class="tray tray-center" style="padding-right: 5px;">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel">
                                    <div class="panel-heading text-center">

                                        <div class="pull-left">
                                            <div id="divInitButton" class="BtnArea btn-group mb5" runat="server">
                                            
                                                <table id="BaseCtrl" class="" style="width: 100%; font-size: small; border-color: black; border-collapse: collapse;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="text-align: left;">
                                                               
                                                                <input class="btn btn-primary mb10 mr5  notification" id="btnSearch" controlref="0,0,10,10,0,15,10,30,0,10" onclick="ActionModel('AE0001','Search','GridData','','','','','GridCallBack()');InitSearchInfo('AE0001','Search','GridData','')"  type="button" value="搜尋" />
                                                                <input class="btn btn-primary mb10 mr5  notification" id="btnApprove"   onclick="onApprove()"  type="button" value="全部同意" />

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            
                                            </div>

                                        </div>

                                        <span id="PanelTitle" class="panel-title" runat="server"></span>

                                    </div>

                                    <div id="divQueryArea" class="Maintain" runat="server">
                                        <div class="panel">
                                            <div class="panel-body PanelLeft">
                                                <table id="BaseCtrl" class="" style="width: 100%; font-size: small; border-color: black; border-collapse: collapse;">
                                                    <tbody>
                                                      
                                                        


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                     <div id="divGridArea" runat="server">
    
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        
    </form>
    <script type="text/javascript">
        $(function () {
            $("#btnSearch").click();
        });
        
        function GridCallBack() {
            
            $(".scroll").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });
            $("td[fieldid='FR_U_name']").each(function () {
                $(this).closest('tr').find('td:first').append("　<span class='Link' onclick='OpenRemark(\"" + $(this).prev('td').text() + "\")'>詳細</span>");
               
            });
        }
        function OpenUI(p_event) {
            var m_RestInfo = $("tr.Sel td[fieldid='FR_date']").text().slice(0, 16) + "～" + $("tr.Sel td[fieldid='FR_date']").text().slice(16) + ";時數:" + $("tr.Sel td[fieldid='FR_total_hour']").text() 
           

            var m_RestInfo1 =  $("tr.Sel td[fieldid='FR_U_name']").text() + "-" + $("tr.Sel td[fieldid='FR_kind_show']").text() + ";";
            m_RestInfo1 += "備註:" + $("tr.Sel td[fieldid='FR_note']").text();

            //alert($("tr.Sel td[fieldid='FR_U_name']").text())
            var m_html = " <table style='width:100%'><tr><td colspan='4' >　　 <input type='hidden' id='hidFR_id' value='" + $("tr.Sel td[fieldid='FR_id']").text() + "' /> <input type='hidden' id='hidFR_cknum' value='" + $("tr.Sel td[fieldid='FR_cknum']").text() + "' />  </td></tr> "
            m_html += "<tr style='width:100%'> "
            m_html += "     <td style='width:20%'>請假時間:</td> "
            m_html += "     <td style='width:80%;text-align:left' colspan='3'  >     ";
            m_html += m_RestInfo
            m_html += "     </td>"
            m_html += " </tr>  "
            m_html += "<tr> "
            m_html += "     <td style='width:20%'>請假資訊:</td> "
            m_html += "     <td colspan='3' style='text-align:left'  >     ";
            m_html += m_RestInfo1
            m_html += "     </td>"
            m_html += " </tr>  "
            m_html += "<tr> "
            m_html += "     <td style='width:20%'>簽核結果</td> "
            m_html += "     <td colspan='3' style='text-align:left' >    ";
            m_html += "             <input name = 'FR_step_02_sign' checked type = 'radio' id = 'FR_step_02_sign' value = 'FSIGN002' > 同意  ";
            m_html += "             <input name = 'FR_step_02_sign' type = 'radio' id = 'FR_step_02_sign' value = 'FSIGN003' > 不同意"
            m_html += "     </td>"
            m_html += " </tr>  "
            m_html += "     <td style='width:20%'>簽核說明</td> "
            m_html += "     <td colspan='3'  style='text-align:left' >   ";
            m_html += "          <textarea style='width:80%'  rows='3' id='FR_step_02_note' name='FR_step_02_note' ></textarea>       "
            m_html += "     </td>"
            m_html += " </tr>  "
            m_html += " </tr>  "
            m_html += "     <td colspan='4'  style='text-align:center' >   ";
            m_html += "        <input class='btn btn-primary mb10 mr5  notification' id='btnExit'  onclick='onApproveDtl()' type='button' value='確認' />　　<input class='btn btn-alert mb10 mr5 notification' id='btnExit'  onclick='onExit()' type='button' value='離開' />       "
            m_html += "     </td>"
            m_html += " </tr>  "
            m_html += "</table>";

            $('.Main').block({
                theme: true,
                message: "<div class='panel divMaintainForm' id='MaintainForm'> <section  id='content'>" + m_html + "</section><div id='divAttach'><div> </div>",
                showOverlay: false,
                centerY: false,
                centerX: true,
                draggable: true,
                title: $("#PanelTitle").text(),
                themedCSS: {
                    opacity: 1,
                    width: '75%',
                    height: '55%',
                    cursor: 'initial',
                    top: '15%'
                }
            });
        }

        function OpenRemark(p_event) {
            setTimeout("OpenUI('" + p_event +"');", 200);
        }
        function onExit() {
            $('.Main').unblock();
        }

        function onApproveDtl() {
            var m_Employee = { "CompanyCode": "AE", "WorkID": $("#txtWorkID").val(), "Remark": "", "DisplayName": "", "UserIP": $("#hidUserIP").val()  };
            var m_FR_step_sign = $("input[name='FR_step_02_sign']:checked").val();
            var m_FR_note = $("#FR_step_02_note").val();
          
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "AE0001.aspx/AE_ApproveDtl",
                data: JSON.stringify({ "Employee": m_Employee, "FR_id": $("#hidFR_id").val(), "FR_cknum": $("#hidFR_cknum").val(), "FR_step_sign": m_FR_step_sign, "FR_note": m_FR_note }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            m_LogMessage = Result.d.LogMessage;
                            alert(m_LogMessage);
                            $('.Main').unblock();
                            $("#btnSearch").click();
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

        function onApprove() {
            $("#tabGridBodySearch input[type='checkbox']").prop("checked", true);
            var m_Employee = { "CompanyCode": "AE", "WorkID": $("#txtWorkID").val(), "Remark": "", "DisplayName": "", "UserIP": $("#hidUserIP").val() };
            var arrFR_id = [];
            $('#tabGridBodySearch input[type=checkbox]:checked').each(function () {
                arrFR_id.push($(this).val());
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "AE0001.aspx/AE_Approve",
                data: JSON.stringify({ "Employee": m_Employee, "FR_id": arrFR_id }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            m_LogMessage = Result.d.LogMessage;
                            alert(m_LogMessage);
                            $("#btnSearch").click();
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
</body>

</html>
