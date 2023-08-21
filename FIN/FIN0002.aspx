<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FIN0002.aspx.cs" Inherits="KF_Web.FIN0002" %>
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
    
 td.Line {
      border: 1px solid black;
      
	  text-align:center;
    }
     th.Excl {
      border: 1px solid black;
	  text-align:center;
    }   
td.Key
{
  color:red;
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
         <input type="hidden" id="hidMaintainKey" value="form_no,ExamineNo_Pay" />
         <input type="hidden" id="hidMenuID" value="" runat="server" />
         <input type="hidden" id="selLanguage" value="TW" />
         <input type="hidden" id="hidOpenFun" value="OpenMaintain" />
         <input type="hidden" id="hidOpenParam" value="upd" />
        
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
                                                               
                                                               <input class="btn btn-primary mb10 mr5  notification" id="btnSearch" controlref="5,8,12,8,8,8,10,10,10,10,0,10" onclick="ActionModel('FIN0002','Search','GridData');InitSearchInfo('FIN0002','Search','GridData','')"  type="button" value="搜尋" />
                                                               <input class="btn btn-primary mb10 mr5  notification" id="btnAdd"  onclick="OpenForm()"  type="button" value="維護撥款明細" />
                                                               <button style="height:45px"" class="btn btn-primary mb10 mr5  notification" onclick="OpenExpForm(event)" ><img  src="/KF_Web/Img/ExpXls.png" />代裕富撥款明細表</button>
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
                                                         <tr>
                                                            <td class="lbl" style="width: 30%;">
                                                                <label class="col-lg-2 control-label " id="lblPayDate">撥款日期　:</label>
                                                            </td>
                                                            <td>
                                                                <table id="BetTextCreateDate">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="between">
                                                                                <input id="QtxtPayDate_S" texttype="Date" style="width: 90%;" maxlength="10" type="text" class="dte hasDatepicker form-control"/></td>
                                                                            <td class="between">～</td>
                                                                            <td class="between">
                                                                                <input id="QtxtPayDate_E" texttype="Date" style="width: 90%;" maxlength="10" type="text" class="dte hasDatepicker form-control"/></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                             </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                     <div id="divGridArea" runat="server">
    
                                    </div>
                                    <iframe id="downloadFrame" style="display: none;"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </form>
    <script type="text/javascript">

        const funMaintain = {
            OpenMaintain: function (p_action) {
                var p_Params = {};
                if (p_action == "upd")
                {
                    $.each($("#hidMaintainKey").val().split(','), function (idx, Key) {
                        p_Params[Key] = $('tr.Sel td[fieldid="' + Key + '"]').text();
                    });
                }
                var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };
                const url = 'FIN002.html?rdn=' + Math.random();

                // 发送HTTP GET请求以获取HTML文件
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    success: function (htmlString) {
                        $('.Main').block({
                            theme: true,
                            message: "<div class='panel divMaintainForm' id='MaintainForm'> <section class='" + $("#content").attr('CssContent') + "' id='content'>" + htmlString + "</section><div id='divAttach'><div><input id='hidMaintainParam' value='' type='hidden' /> </div>",
                            showOverlay: false,
                            centerY: false,
                            centerX: true,
                            draggable: true,
                            title: "維護撥款明細",
                            themedCSS: {
                                opacity: 1,
                                width: '85%',
                                height: '600px',
                                cursor: 'initial',
                                top: '5%'
                            }
                        });

                        FormLoading();

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "FIN0002.aspx/GetAppropriationInfos",
                            data: JSON.stringify({ "p_Employee": m_Employee, "p_Params": p_Params }),
                            dataType: "json",
                            success: function (Result) {
                                if (Result.d != null) {
                                    if (Result.d.isSuccess) {
                                        var ObjApp = Result.d.ResultEntity.Table;
                                        //開啟維護畫面
                                        $.each(ObjApp, function (Index, Obj) {
                                            SetDataToObj(Obj);
                                        });
                                    }
                                    else {
                                        alert(Result.d.LogMessage);
                                    }
                                   
                                  
                                }
                                $(".divMaintainForm").unblock({ fadeOut: 500 });
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert(xhr.responseText);
                                $(".divMaintainForm").unblock({ fadeOut: 500 });
                            }
                        });

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // 请求失败
                        console.error('Failed to fetch HTML file:', errorThrown);
                    }
                });
            }
        };

        function SetDataToObj(p_Data) {
            var isDisabled = false;
          
            if (p_Data["Transfer_date"] != "" ) {
                isDisabled = true;
                setTimeout(' $("#btnSave").hide();', 100);

            }
            $.each(p_Data, function (key, value) {
                // key 是属性名，value 是对应属性的值
                var m_Obj = $("#BaseCtrl label[fieldid='" + key + "']");
                if (m_Obj.length != 0) {
                    m_Obj.text(value);
                }

                m_Obj = $("#BaseCtrl input[fieldid='" + key + "']");
                if (m_Obj.length != 0) {
                    m_Obj.val(value);
                    if ($("#txtGroupID").val() == "FIN01" || isDisabled ) {
                        m_Obj.attr('disabled', true);
                    }
                }
                
            });

            if ($("#txtGroupID").val() == "AS01") {
                $("#trTransfer_date").hide()
            }
            else if ($("#txtGroupID").val() == "FIN01") {
                
              
                $("#trTransfer_date").show()
                $("#txtTransfer_date").datepicker(g_optTW);
                $("#txtTransfer_date").attr('disabled', false);
            }
        }
       

       
        function FormLoading() {
            $('.divMaintainForm').block({
                theme: true,
                message: '<img src="/KF_Web/Img/loading.gif" />',
                showOverlay: false,
                centerY: false,
                centerX: true,
                draggable: true,
                themedCSS: {
                    opacity: 0.7,
                    width: '85%',
                    height: '40%',
                    cursor: 'initial',
                    top: '1%'
                }
            });
        }

        
        function OpenForm() {
            if ($(".Sel").length == 0) {

                ShowMessage("MSG00004");
                return false;
            }
            funMaintain["OpenMaintain"]("upd");
        }


        function SaveCheck() {
            var m_Result = true;
            var Error = "";
            if ($("#txtGroupID").val() == "AS01" || $("#txtGroupID").val() == "AD01") {
                $.each($("input.Key"), function (idx, Index) {
                    if (Index.value == "") {
                        Error += "請輸入:" + $("#lbl" + Index.id.replace("txt", "")).text().replace("*", "") + " <br>";
                        ErrID = Index.id;
                    }
                });

                var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };
                p_Params = GeneratorAllEntity("BaseCtrl", "");
                p_Params["KF_remitAmount"] = $("#txtKF_remitAmount").text();
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "FIN0002.aspx/SubmitCheck",
                    async: false,
                    data: JSON.stringify({ "p_Employee": m_Employee, "p_Params": p_Params }),
                    dataType: "json",
                    success: function (Result) {
                        if (Result.d != null) {
                            if (Result.d.isSuccess) {

                            }
                            else {
                                Error = Result.d.LogMessage.split("||")[1];
                                ErrID = Result.d.LogMessage.split("||")[0];
                            }
                        }
                        m_Result = Result.d.isSuccess;
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.responseText);
                    }
                });
            }
            else if ($("#txtGroupID").val() == "FIN01") {
                if ($("#txtTransfer_date").val() == "") {
                    Error = "請輸入匯款日期";
                    ErrID = "txtTransfer_date";
                }
            }

            if (Error != "") {
                AlertMSG(Error, ErrID, true)
                m_Result = false;
            }
            return m_Result;
        }





        function OpenExpForm(event) {
            
            if ($("#QtxtPayDate").val() == "") {
                AlertMSG("請輸入撥款日期-起訖", "QtxtPayDate_S", true)
                event.preventDefault();
                return;

            }
            if ($("#QtxtPayDate").val() == "") {
                AlertMSG("請輸入撥款日期-起訖", "QtxtPayDate_E", true)
                event.preventDefault();
                return;

            }
            // 使用AJAX請求後端C#程式
            $.ajax({
                url: "FIN0002.aspx?DownLoadExcel=Y&PayDateS=" + $("#QtxtPayDate_S").val() + "&PayDateE=" + $("#QtxtPayDate_E").val(), // 指向後端C#程式的URL
                type: "GET",
                dataType: "text", // 請求文本資料
                success: function (data) {
                    if (data === "") {
                        alert($("#QtxtPayDate_S").val() + "~" + $("#QtxtPayDate_E").val() +";無撥款明細資料,請維護撥款明細!");
                        return; // 離開函式，避免下面的程式碼繼續執行
                    }
                    // 創建下載連結
                    var downloadLink = document.createElement("a");
                    downloadLink.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + encodeURIComponent(data);
                    downloadLink.download = "代裕富撥款明細表.xlsx";
                    downloadLink.click();
                    event.preventDefault();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                    alert("發生錯誤，無法下載Excel，請重試或聯絡系統管理員。");
                    event.preventDefault();
                }
            });
            event.preventDefault();
        }

        function SubmitSave() {
            var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };
            var p_Params = {};

            if (SaveCheck()) {
                if ($("#txtGroupID").val() == "AS01" || $("#txtGroupID").val() == "AD01") {
                    p_Params = GeneratorAllEntity("BaseCtrl", "");
                }
                else if ($("#txtGroupID").val() == "FIN01") {
                    p_Params = GeneratorAllEntity("BaseCtrl", "");
                    p_Params["APP_STATUS"] = "UPD_Transfer";
                }
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "FIN0002.aspx/SubmitSave",
                    data: JSON.stringify({ "p_Employee": m_Employee, "p_Params": p_Params }),
                    dataType: "json",
                    success: function (Result) {
                        if (Result.d != null) {
                            if (Result.d.isSuccess) {
                                m_LogMessage = Result.d.LogMessage;
                                alert(m_LogMessage);
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
        }
       
    </script>
</body>

</html>
