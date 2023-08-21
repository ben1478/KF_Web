<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ACC0002.aspx.cs" Inherits="KF_Web.ACC0002" %>
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

   
    <div class="panel timeout">
    <div id="divInfo" runat="server" style=" margin: 0px auto; padding-right:50px; text-align: right;" class="Info">
    <img class="mw30 br64 mr15" alt="avatar" src="../img/avatars/1.jpg"/><asp:Label ID="UserInfo" runat="server"  Text=""></asp:Label> 
    <asp:TextBox ID="txtAccount" style="display:none"  ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtCompanyCode" Width="90px" style="display:none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtDisplayName" Width="90px" style="display:none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtWorkID" Width="90px" style="display:none"  Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtSiteFormID" style="display:none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
   <asp:HiddenField ID="hidIsMobile" runat="server" />

   
            </div>
     
        <div id="divMain" class="Main" runat="server" style=" margin: 0px auto;  text-align: center;" >
         <section>
         <div  id="pagedep" runat="server" style="">
		   <div class="heading-icon">
		   <!-- 以下部門LOGO可選 d-01 至 d-16 -->
		   <img id="imgModule"  runat="server" src="" alt=""/></div>
		   <div class="heading-title">
		   	<span class=""><i class="fa fa-caret-right" aria-hidden="true"></i><b><label runat="server" ModKey="" id='titleModuleName'></label></b></span>
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
       <div id="divInitButton"  class="BtnArea btn-group mb5"   runat="server">
     
    </div>
    
      </div>
     
       <span id="PanelTitle" class="panel-title" runat="server">
                                </span>
      
      </div>
   
    <div id="divQueryArea"  class="Maintain"   runat="server">
    <div class="panel"> 
        <div class="panel-body PanelLeft">
            <table id="BaseCtrl" class="" style="width:100%;font-size:small;border-color: black; border-collapse: collapse;">
                <tbody>
                    <tr>
                        <td class="lbl" style="width:30%;">
                            <label class="col-lg-2 control-label " id="lblWorkID">登入帳號　:</label>
                        </td>
                        <td style="width:70%;text-align:left;">
                            <label class="lbl"  id="spWorkID"  runat="server" ></label>
                        </td> 
                    </tr>
                    <tr>
                        <td class="lbl" style="width:30%;">
                            <label class="col-lg-2 control-label AllowEmpty " id="lblDisplayName">*顯示名稱　:</label>
                        </td>
                        <td style="width:70%;text-align:left;">
                            <input class="form-control " id="DisplayName" runat="server" style="width:60%;" maxlength="30" type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="lbl" style="width:30%;">
                            <label class="col-lg-2 control-label " id="lblCompanyName">公司名稱　:</label>
                        </td>
                        <td style="width:70%;text-align:left;">
                            <input class="form-control" id="txtCompanyName" runat="server" style="width:60%;" maxlength="30" type="text"/>
                        </td>
                    </tr>
                      <tr>
                        <td class="lbl" style="width:30%;">
                            <label class="col-lg-2 control-label " id="lblRemark">帳號備註　:</label>
                        </td>
                        <td style="width:70%;text-align:left;">
                            <input class="form-control" id="txtRemark" runat="server" style="width:60%;" maxlength="30" type="text"/>
                        </td>
                    </tr>
                     <tr>
                        <td class="lbl" style="width:30%;">
                            <label class="col-lg-2 control-label " id="lblPassword">密碼變更　:</label>
                        </td>
                        <td style="width:70%;text-align:left;">
                            <input  type="password" class="form-control" id="txtPassword" style="width:40%;" maxlength="30" type="text"/>
                        </td>
                    </tr>
                     <tr>
                        <td class="lbl" style="width:30%;">
                            <label class="col-lg-2 control-label " id="lblConfPassword">確認密碼　:</label>
                        </td>
                        <td style="width:70%;text-align:left;">
                            <input  type="password" class="form-control" id="txtConfPassword" style="width:40%;" maxlength="30"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align:center">
                         <input class="btn btn-primary mb10 mr5  notification"  id="btnSave" ondblclick="return false" onclick="SaveEmployee()" type="button" value="存檔"/>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
       </div>
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
       

        


        function SaveEmployee()
        {
            var m_Employee = { "CompanyName": $("#txtCompanyName").val(), "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };

            var m_Result = new Object;
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "ACC0001.aspx/SaveEmployee",
                data: JSON.stringify({ "Employee": m_Employee, "Password": $('#txtPassword').val() }),
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


        function GetEmployeeInfo() {
            var m_Employee = { "Account": $("#txtAccount").val(), "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "CurrentLanguage": $('#selLanguage').val(), "CurrentSiteForm": $('#txtSiteFormID').val(), "DisplayName": $('#txtDisplayName').val() };

            return m_Employee;
        }
        
    </script>
   
</body>

</html>
