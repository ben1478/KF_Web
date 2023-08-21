<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FIN0001.aspx.cs" Inherits="KF_Web.FIN0001" %>
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
       
        
        
        <div class="panel timeout">
            <div id="divInfo" runat="server" style="margin: 0px auto; padding-right: 50px; text-align: right;" class="Info">
                <img class="mw30 br64 mr15" alt="avatar" src="../img/avatars/1.jpg" /><asp:Label ID="UserInfo" runat="server" Text=""></asp:Label>
                <asp:TextBox ID="txtAccount" Style="display: none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtCompanyCode" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtDisplayName" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtWorkID" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtSiteFormID" Style="display: none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
                <asp:TextBox ID="txtGroupID" Width="90px" Style="display: none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
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
                                                               
                                                               <input class="btn btn-primary mb10 mr5  notification" id="btnSearch" controlref="0,5,8,12,8,8,8,10,10,10,10,0,10" onclick="ActionModel('FIN0001','Search','GridData');InitSearchInfo('FIN0001','Search','GridData','')"  type="button" value="搜尋" />
                                                              <!--- <input class="btn btn-primary mb10 mr5  notification" id="btnAdd"  onclick="OpenForm()"  type="button" value="維護撥款明細" />--->
                                                               <button style="height:45px"" class="btn btn-primary mb10 mr5  notification" onclick="OpenExpForm(event)" ><img  src="/KF_Web/Img/ExpXls.png" />優先撥款核對表</button>
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
                                                                <input class="form-control"  fieldid="PayDate" texttype="Date" id="QtxtPayDate" style="width: 20%" type="text" />
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

     

        function OpenExpForm(event) {
            
            if ($("#QtxtPayDate").val() == "") {
                AlertMSG("請輸入撥款日期", "QtxtPayDate", true)
                event.preventDefault();
                return;

            }
            // 使用AJAX請求後端C#程式
            $.ajax({
                url: "FIN0001.aspx?DownLoadExcel=Y&PayDate=" + $("#QtxtPayDate").val(), // 指向後端C#程式的URL
                type: "GET",
                dataType: "text", // 請求文本資料
                success: function (data) {
                    if (data === "") {
                        alert($("#QtxtPayDate").val()+";無撥款資料!");
                        return; // 離開函式，避免下面的程式碼繼續執行
                    }
                    // 創建下載連結
                    var downloadLink = document.createElement("a");
                    downloadLink.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + encodeURIComponent(data);
                    downloadLink.download = $("#QtxtPayDate").val() +"-優先撥款核對表.xlsx";
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
        

       
    </script>
</body>

</html>
