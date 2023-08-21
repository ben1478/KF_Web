<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GeneratorWeb.aspx.cs" Inherits="KF_Web.GeneratorWeb" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="keywords" content="KF Web SYSTEM" />
<meta name="description" content="KF Web SYSTEM"/>
<meta name="author" content="KF"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="Scripts/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="Scripts/scroll.js" ></script>
<script type="text/javascript" src="Scripts/bootstrap.min.js" ></script>
<script src="Scripts/Editor/umeditor.config.js" type="text/javascript"></script>
<script type="text/javascript" src="Scripts/jquery.blockUI.js" ></script>
<script type="text/javascript" src="Scripts/jquery-ui.js" ></script>
<script type="text/javascript" src="Scripts/sortable.js" ></script>
<link rel="stylesheet" type="text/css" href="Content/admin-forms.css"/>
<link rel="stylesheet" type="text/css" href="Content/flag-icon-css-master/css/flag-icon.min.css"/>
<link rel="stylesheet" type="text/css" href="Content/theme.css"/>
<link rel="stylesheet" type="text/css" href="Content/Main.css"   />
<link rel="stylesheet" type="text/css" href="Content/jquery-ui.css" />
<link rel='stylesheet' type='text/css' href='fonts/flaticon/flaticon.css'/>
    <link href="Scripts/Editor/themes/default/css/umeditor.min.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="img/favicon.ico"/>
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
    <img class="mw30 br64 mr15" alt="avatar" src="img/avatars/1.jpg"/><asp:Label ID="UserInfo" runat="server"  Text=""></asp:Label> 
    <asp:TextBox ID="txtAccount" style="display:none"  ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtCompanyCode" Width="90px" style="display:none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtDisplayName" Width="90px" style="display:none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtWorkID" Width="90px" style="display:none"  Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtSiteFormID" style="display:none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>
   <asp:HiddenField ID="hidIsMobile" runat="server" />
    <select id="selLanguage" runat="server" style="display:none"  onchange="GetLanguageByPage()">
        <option value="TW">中文</option>
        <option value="US">English</option>
    </select>
   
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

            $(".Maintain #BaseCtrl").closest('.panel-body').after("<div class='QueryIco'><i id='imgQIco' class='fa fa-arrow-up hand' onclick='QueryIcoCtrl(this)' aria-hidden='true'></i> </div>");
        });
       
        
    </script>
   
</body>

</html>
