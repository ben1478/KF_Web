<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="YUR0003.aspx.cs" Inherits="KF_Web.YUR0003" %>
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
         <input type="hidden" id="hidMaintainKey" value="form_no,ExamineNo,CaseStatus" />  <!--- 取得Grid裡面的值 --->
         <input type="hidden" id="hidMenuID" value="" runat="server" />
         <input type="hidden" id="selLanguage" value="TW" />
         <input type="hidden" id="hidOpenFun" value="OpenMaintain" /><!--- funMaintain對應的屬性 --->
         <input type="hidden" id="hidOpenParam" value="upd" />

        
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
                                                               
                                                                <input class="btn btn-primary mb10 mr5  notification" id="btnSearch" controlref="0,20,20,20,20,20,0,0,0" onclick="ActionModel('YUR0001','Search','GridData');InitSearchInfo('YUR0001','Search','GridData','')"  type="button" value="搜尋" />

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
                                                                <label class="col-lg-2 control-label " id="lblIsAwait">回覆狀態</label>
                                                            </td>
                                                            <td>

                                                                <select id="QselIsAwait" fieldid="IsAwait" type="select" name="QselIsAwait" >
                                                                    <option value="Y">待回覆</option>
                                                                    <option value="N">已回覆</option>
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
            OpenMaintain: function () {
                var p_Params = {};

                $.each($("#hidMaintainKey").val().split(','), function (idx, Key) {
                    p_Params[Key] = $('tr.Sel td[fieldid="' + Key + '"]').text();
                });

                var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val() };
                FormLoading();

                var htmlString = "";
                htmlString += " <div class='panel-heading text-center' style='max-width: 1400px; min-width: 800px;'> ";
                htmlString += " <div class='pull-left'> ";
                htmlString += "        <div class='BtnArea' id='divInitButton' style='width: 95%; padding-top: 3px; padding-bottom: 3px;'> ";
                htmlString += "            <table style='border-color: black; width: 100%; font-size: small; border-collapse: collapse;'> ";
                htmlString += "                <tr> ";
                htmlString += "                    <td style='text-align: left;' nowrap='nowrap'> ";
                htmlString += "                        <input class='btn btn-alert mb10 mr5 notification' id='btnExit' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")' onclick='CloseMaintain()' type='button' value='離開' />  ";
                htmlString += "                        <input class='btn btn-primary mb10 mr5 notification' id='btnUpdate' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")' onclick='OnclickUpdate()' type='button' value='更新' />  ";
                htmlString += "                    </td> ";
                htmlString += "                </tr> ";
                htmlString += "            </table> ";
                htmlString += "        </div> ";
                htmlString += " </div> ";
                htmlString += " <div class='pull-right'> ";
                htmlString += "      <span class='panel-controls'> ";
                htmlString += "          <img src='/KF_Web/Img/exit.png' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")' onclick='CloseMaintain()' /> ";
                htmlString += "      </span>  ";
                htmlString += " </div> ";
                htmlString += " <span id='MantainTitle' class='panel-title'></span> ";
                htmlString += " </div>  ";
                htmlString += " <table id='BaseCtrl' class='' style='width:95%;font-size:small;border-color: black; border-collapse: collapse;'>  ";
                htmlString += "      <tr> ";
                htmlString += "         <td class='lbl' style='width:20%;'>";
                htmlString += "             <label class='col-lg-2 control-label ' id='lblInfo'>Info</label>  ";
                htmlString += "         </td>";
                htmlString += "         <td style='width:80%;text-align:left;'> ";
                htmlString += "             <input class='form-control' id='txtExamineNo' disabled='disabled'  style='width:30%;' value='" + p_Params["ExamineNo"]  +"' type='text' />  ";
                htmlString += "             <input class='form-control' id='txtform_no'  disabled='disabled' style='width:30%;' value='" + p_Params["form_no"] + "' type='text' />  ";
                htmlString += "             <input type='hidden' id='hidCaseStatus' value='" + p_Params["CaseStatus"] + "' /> ";
                htmlString += "         </td>";
                htmlString += "     </tr>  ";
                htmlString += "      <tr> ";
                htmlString += "         <td class='lbl' style='width:20%;'>";
                htmlString += "             <label class='col-lg-2 control-label ' id='lblResponse'>Response</label>  ";
                htmlString += "         </td>";
                htmlString += "         <td style='width:80%;text-align:left;height:300px'> ";
                htmlString += "             <textarea style='height: 300px!important; ' id='txtResponse' name='txtResponse' rows='12' cols='100'></textarea>  ";
                htmlString += "         </td>";
                htmlString += "     </tr>  ";
                htmlString += "      <tr> ";
                htmlString += "         <td class='lbl' style='width:20%;'>";
                htmlString += "             <label class='col-lg-2 control-label ' id='lblError'>Error</label>  ";
                htmlString += "         </td>";
                htmlString += "         <td style='width:80%;text-align:left;'> ";
                htmlString += "             <textarea style='height: 100px!important; ' id='txtError' name='txtError' rows='2' cols='100'></textarea>  ";
                htmlString += "         </td>";
                htmlString += "     </tr>  ";


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
                p_Params["isUpdDB"] = "N";
                CallAPI(m_Employee, p_Params);
               
            }
        };


        function OnclickUpdate()
        {
            
            var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val() };
            var m_Params = { "ExamineNo": $("#txtExamineNo").val(), "form_no": $("#txtform_no").val(), "isUpdDB": "Y", "CaseStatus": $("#hidCaseStatus").val() };
           
            CallAPI(m_Employee, m_Params);
        }

        function CallAPI(p_Employee, p_Params) {
            $.ajax({
                url: "YUR0003.aspx?CallAPI=Y",
                type: 'POST',
                data: JSON.stringify({ "Employee": p_Employee, "Params": p_Params }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    if (result.isSuccess) {
                        $("#txtResponse").val(JSON.stringify(result.ResultEntity));
                        var objJSON = jQuery.parseJSON(result.ResultEntity);
                        if (objJSON.objResult.code == "S001") {
                            if (p_Params["isUpdDB"] == "Y") {

                                alert('更新成功!!transactionId:' + objJSON.objResult.transactionId)
                            }
                        }
                    }
                    else {
                        $("#txtError").val(result.LogMessage);
                        $("#btnUpdate").hide();
                    }
                    $(".divMaintainForm").unblock({ fadeOut: 500 });
                },
                error: function (xhr, status, error) {
                    $("#txtError").val(result.ResultMsg);
                    $(".divMaintainForm").unblock({ fadeOut: 500 });
                }
            });
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

    </script>
</body>

</html>
