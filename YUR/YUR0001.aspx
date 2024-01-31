<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="YUR0001.aspx.cs" Inherits="KF_Web.YUR0001" %>
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
         <input type="hidden" id="hidMaintainKey" value="form_no,CaseStatus" />
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
                                                               
                                                                <input class="btn btn-primary mb10 mr5  notification" id="btnSearch" controlref="0,15,15,15,10,15,20,0,0,0" onclick="ActionModel('YUR0001','Search','GridData');InitSearchInfo('YUR0001','Search','GridData','')"  type="button" value="搜尋" />
                                                                <input class="btn btn-primary mb10 mr5  notification" id="btnAdd" style="display:none"  onclick="OpenForm()"  type="button" value="新增進件" />

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
                                                                <label class="col-lg-2 control-label " id="lblFromNo">案件編號　:</label>
                                                            </td>
                                                            <td>
                                                                <input class="form-control"  fieldid="form_no" id="Qtxtform_no" style="width: 20%" type="text" selecteddata=""/>
                                                               </td>
                                                        </tr>
                                                     <!---   <tr>
                                                            <td class="lbl" style="width: 30%;">
                                                                <label class="col-lg-2 control-label " id="lblWorkID">申請人　:</label>
                                                            </td>
                                                            <td>
                                                                <input class="form-control" onchange="QueryOnChange('QQryWorkID','Q')" fieldid="WorkID" id="QQryWorkID" style="width: 20%" type="text" selecteddata=""/>
                                                                <img name="QQryWorkID" class="hand" onclick="OpenQueryForm('QQryWorkID','Query','Q0007','WorkID,DisplayName','','Q')" src="../Img/Query.png" alt="Query" height="20" width="20"/><label id="lblDisplayName"></label></td>
                                                        </tr>--->
                                                        <tr>
                                                            <td class="lbl" style="width: 30%;">
                                                                <label class="col-lg-2 control-label " id="lblCreateDate">申請日期　:</label></td>
                                                            <td style="width: 70%; text-align: left;">
                                                                <table id="BetTextCreateDate">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="between">
                                                                                <input id="Qtxtadd_date_S" texttype="Date" style="width: 90%;" maxlength="10" type="text" class="dte"/></td>
                                                                            <td class="between">～</td>
                                                                            <td class="between">
                                                                                <input id="Qtxtadd_date_E" texttype="Date" style="width: 90%;" maxlength="10" type="text" class="dte"/></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                         <tr>
                                                            <td class="lbl" style="width: 30%;">
                                                                <label class="col-lg-2 control-label " id="lblCaseStatus">案件狀態　:</label></td>
                                                            <td style="width: 70%; text-align: left;">
                                                                  <select id="QselCaseStatus" fieldid="CaseStatus" type="select" name="QselCaseStatus" >
                                                                    <option value="">All</option>
                                                                    <option value="1">裕富收件</option>
                                                                    <option value="2">核准</option>
                                                                    <option value="3">婉拒</option>
                                                                    <option value="4">附條件</option>
                                                                    <option value="5">待補</option>
                                                                    <option value="RS">補件中</option>
                                                                    <option value="RP">請款中</option>
                                                                    <option value="AP">已撥款</option>
                                                                </select>
                                                            </td>
                                                        </tr>


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
        const funMaintain = {
            OpenMaintain: function (p_action) {
                var m_URL = "YUR0002.aspx?action=" + p_action;

                var m_Title = "裕富案件";
                var m_MenuID = $("#hidMenuID").val();

                m_URL += "&MenuID=" + m_MenuID;
                if (p_action != "add") {
                    $.each($("#hidMaintainKey").val().split(','), function (idx, Key) {
                        m_URL += "&" + Key + "=" + $('tr.Sel td[fieldid="' + Key + '"]').text();
                    });
                }
                
                WinParam = GetOpenParam();
                window.open(m_URL, m_Title, 'scrollbars=yes,' + WinParam);
            }
        };

        function OpenForm() {
            funMaintain["OpenMaintain"]("add");
        }



    </script>
</body>

</html>
