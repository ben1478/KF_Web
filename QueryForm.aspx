<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="QueryForm.aspx.cs" Inherits="KF_Web.QueryForm" %>
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
<script type="text/javascript" src="Scripts/jquery.blockUI.js" ></script>
<script type="text/javascript" src="Scripts/jquery-ui.js" ></script>
<script type="text/javascript" src="Scripts/GridData.js" ></script>
<link rel="stylesheet" type="text/css" href="Content/admin-forms.css"/>
<link rel="stylesheet" type="text/css" href="Content/flag-icon-css-master/css/flag-icon.min.css"/>
<link rel="stylesheet" type="text/css" href="Content/theme.css"/>
<link rel="stylesheet" type="text/css" href="Content/Main.css"   />
<link rel="stylesheet" type="text/css" href="Content/jquery-ui.css" />
 <link rel="shortcut icon" href="img/favicon.ico"/>
     <style type="text/css">
	.RtnIco
	{
	    width:15px;
	    height:15px;
	    cursor:pointer;
	}
  </style>
    <title>KF Web SYSTEM</title>
</head>
<body>
    <input id="hidQueryMode" runat="server" type="hidden" />

    <input id="hidEventElement" runat="server" type="hidden" />
    <input id="hidControlType" runat="server" type="hidden" />
    <input id="hisSelectText" runat="server" type="hidden" />
    <input id="hisSelectValue" runat="server" type="hidden" />

    <input id="selLanguage" runat="server" type="hidden" />
    <input id="hidControlRef" runat="server" type="hidden" />
    <input id="hidQueryParam" runat="server" type="hidden" />

    <form id="form1" runat="server">
            <div  style="display:none;" id='divSELECT'>
            <select style=" height:150px;width:auto" id="selSelected" multiple="multiple"></select>
            </div>
    <div class="panel">
    <div  id="divMain" class="Main" runat="server" style=" margin: 0px auto;  text-align: center;" >
    <div class="panel-heading text-center">
      <div class="pull-left">
       <div id="divInitButton"  class="BtnArea btn-group mb5"   runat="server">     
    </div>
    
      </div>
     
       <span id="PanelTitle" class="panel-title" runat="server">
                                </span>
      
      </div>
   
    <div id="divQueryArea"  class="Maintain" style="width:95%; height:auto; background-color:White"  runat="server">
    </div>
    <div id="divGridArea" class='QueryForm' style="width:95%; height:600px;" runat="server">
    </div>
    </div>
    </div>
    </form>
</body>
 <script src="Scripts/FunctionHandler.js" type="text/javascript"></script>
 <script src="Scripts/QueryForm.js" type="text/javascript"></script>
</html>
