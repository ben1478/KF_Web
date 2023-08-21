<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PreviewForm.aspx.cs" Inherits="KF_Web.PreviewForm" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=11" />
<meta name="keywords" content="KF Web SYSTEM" />
<meta name="description" content="KF Web SYSTEM"/>
<meta name="author" content="KF"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="Scripts/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="Scripts/scroll.js" ></script>
<script type="text/javascript" src="Scripts/bootstrap.min.js" ></script>
<script type="text/javascript" src="Scripts/jquery.blockUI.js" ></script>
<script type="text/javascript" src="Scripts/jquery-ui.js" ></script>
<script type="text/javascript" src="Scripts/GridData.js" ></script>
<script type="text/javascript" src="Scripts/sortable.js" ></script>
<link rel="stylesheet" type="text/css" href="Content/admin-forms.css"/>
<link rel="stylesheet" type="text/css" href="Content/flag-icon-css-master/css/flag-icon.min.css"/>
<link rel="stylesheet" type="text/css" href="Content/theme.css"/>
<link rel="stylesheet" type="text/css" href="Content/Main.css"   />
<link rel="stylesheet" type="text/css" href="Content/jquery-ui.css" />

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
.Preview
{
    background:#FF8F59;
    height:40px;
    font-size:large;
    font-weight:bold;
    color:Black;
}

.History
{
    background:#FF9797;
    height:40px;
    font-size:large;
    font-weight:bold;
    color:Black;
}

</style>
    <title>KF Web SYSTEM</title>
   
</head>


<body>
     <form id="form1" runat="server">
  <div class="panel timeout">
      <input id="hidTempKey" runat="server" type="hidden" />
      <input id="hidMode" runat="server" type="hidden" />

   <div id="divInfo" runat="server" style=" margin: 0px auto; padding-right:50px; text-align: right;" class="Info">
  
     
   <img class="mw30 br64 mr15" alt="avatar" src="img/avatars/1.jpg"/><asp:Label ID="Label2" runat="server"  Text="　Ben Lu　-　10003180　"></asp:Label> <asp:TextBox ID="txtAccount" style="display:none"  ReadOnly="true" runat="server" 
         AutoPostBack="True"></asp:TextBox>
    
    
    <asp:TextBox ID="txtCompanyCode" Width="90px" style="display:none" Enabled="false" runat="server" 
        AutoPostBack="True"></asp:TextBox>
   
    <asp:TextBox ID="txtWorkID" Width="90px" style="display:none"  Enabled="false" runat="server" 
         AutoPostBack="True"></asp:TextBox>
         
          <asp:TextBox ID="txtSiteFormID" style="display:none" ReadOnly="true" runat="server" 
         AutoPostBack="True"></asp:TextBox>  <select id="selLanguage" onchange="GetLanguageByPage()">
        <option value="TW">中文</option>
        <option value="US">English</option>
        <option value="JP">日文</option>
    </select>

            </div>
         
        <div  id="divMain" class="Main" runat="server" style=" margin: 0px auto;  text-align: center;" >
      <div class="panel-heading text-center">
      
      <div class="pull-left">
       <div id="divInitButton"  class="BtnAreaP btn-group mb5"   runat="server">
    </div>
    
      </div>
       <div class="pull-right">
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
  
    </form>
     <script src="Scripts/FunctionHandler.js" type="text/javascript"></script>
    <script src="Scripts/ValidatedHandler.js" type="text/javascript"></script>
     <script type="text/javascript">
         $(function () {
             SetPreviewForm(".pull-right");
             $(".Maintain #BaseCtrl").closest('.panel-body').after("<div class='QueryIco'><i id='imgQIco' class='fa fa-arrow-up hand' onclick='QueryIcoCtrl(this)' aria-hidden='true'></i> </div>");
         });
        
        
     </script>
</body>
</html>
