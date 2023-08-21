<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MenuSet.aspx.cs" Inherits="KF_Web.MenuSet" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="zh-tw" >
	<head>
	<!-- Meta, title, CSS, favicons, etc. -->
	
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>KF Web-國峯租賃</title>
	<meta name="keywords" content="KF Web" />
	<meta name="description" content="KF Web" />
	<meta name="author" content=" Kuo Fong Co" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<!-- Font CSS (Via CDN) -->
	
	<link rel='stylesheet' type='text/css' href='fonts/flaticon/flaticon.css'/>
	<!-- Theme CSS -->
	<link rel="stylesheet" type="text/css" href="Content/flag-icon-css-master/css/flag-icon.min.css"/>
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome/font-awesome.css"/>
	<link rel="stylesheet" type="text/css" href="Content/theme.css"/>
	<link rel="stylesheet" type="text/css" href="Content/Main.css"/>
	<!-- Admin Forms CSS -->
	<link rel="stylesheet" type="text/css" href="Content/admin-forms.css"/>
	<!-- Favicon -->
	<link rel="shortcut icon" href="img/favicon.ico"/>

	<script  type="text/javascript" src="Scripts/jquery/jquery-1.11.1.min.js"></script>
	<script  type="text/javascript" src="Scripts/jquery/jquery_ui/jquery-ui.min.js"></script>
   <script type="text/javascript" src="Scripts/jquery.blockUI.js" ></script>
        <link rel="stylesheet" type="text/css" href="Content/jquery-ui.css" />
        <style type="text/css">

            #sidebar_left {
                color: #fff;
                font-size: 18px;
                position: absolute;
                top: 100px;
                left: 0;
                width: 280px;
                height: auto;
                min-height: 300px;
                padding-top:20px;
              left: 50px
            }

            .hand {
                cursor: pointer;
            }

            .Carousel {
                Max-Height: 600px;
                Max-Width: 1550px;
            }

            .DivMain {
                display: inline-block;
                height: 100%;
                vertical-align: middle;
            }

            .fa-book {
                padding-right: 15px
            }

            .sidebar-menu > li > ul {
                clear: both;
                display: block;
                width: 280px;
                height: auto;
            }

            .nav > li {
                position: relative;
                display: block;
                line-height: 2;
            }

                .nav > li > span {
                    padding-left: 30px
                }

                #sidebar_left.affix {
  position:sticky;
}
        </style>
</head>
   
<body>

    <form id="FormInitial" runat="server">
        <div class="panel timeout">
            <div id="divInfo" runat="server" style="margin: 0px auto; padding-right: 50px; text-align: right;" class="Info">
                <img class="mw30 br64 mr15" alt="avatar" src="img/avatars/1.jpg" /><asp:Label ID="UserInfo" runat="server" Text=""></asp:Label>
                <input type="hidden" id="txtWorkID" runat="server" />
                <input type="hidden" id="txtCompanyCode" runat="server" />
                <input type="hidden" id="txtDisplayName" runat="server" />
                <input type="hidden" id="txtSiteFormID" runat="server" />
            </div>

            <div id="divMain" class="Main" runat="server" style="margin: 0px auto; text-align: center;">
                <section style="padding-top:30px">
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
                                                                <label class="col-lg-2 control-label " style="width:80%" id="lblSite">公司別　:</label>
                                                            </td>
                                                            <td style="width: 70%; text-align: left;">
                                                                <select id="selSite" type="select" name="selSite" onchange="OchangSite()">
                                                                    <option value="1000">國峯</option>
                                                                    <option value="2000">湧立</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                


                                            </div>
                                        </div>
                                    </div>
                                  
                                    <aside id="sidebar_left"  class="nano nano-primary affix">
                                        <!-- Start: Sidebar Left Content -->
                                        <div id="divMainMenu" runat="server" class="sidebar-left-content nano-content divMainMenu">
                                            <!-- Start: Sidebar Left Menu -->

                                            <!-- End: Sidebar Menu -->
                                            <!-- Start: Sidebar Collapse Button -->
                                            <div class="sidebar-toggle-mini">
                                                <a href="#"><span class="fa fa-sign-out"></span></a>
                                            </div>
                                            <!-- End: Sidebar Collapse Button -->
                                        </div>
                                        <!-- End: Sidebar Left Content -->
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- Theme Javascript -->
        <script type="text/javascript" src="Scripts/utility/utility.js"></script>
        <script type="text/javascript" src="Scripts/main.js"></script>
        <!-- Widget Javascript -->
        <script type="text/javascript">

            function GetEmployeeInfo()
            {
                var m_Employee = new Object;
                if ($("#CompanyCode").val() != "" && $("#txtWorkID").val() != "")
                {
                    m_Employee["isSuccess"] = true;
                    m_Employee["Entity"] = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "CurrentSiteForm": $('#txtSiteFormID').val(), "DisplayName": $('#txtDisplayName').val() };
                }
                else
                {
                    m_Employee["isSuccess"] = false;
                }
                return m_Employee;
            }

            function ClickAdd(p_MenuID, p_ModuleKey)
            {
                var m_ModuleKey = "";
                if (p_ModuleKey) {
                    m_ModuleKey = p_ModuleKey;
                }
                var m_Employee = GetEmployeeInfo();
                var MenuType = "M";
                var AddText = "新增模組";
                if (p_MenuID != "0")
                {
                    MenuType = "Fu";
                    AddText = "新增功能";
                }
                var m_Html = '<section class="dep-15" id="contentM">';
                m_Html += '    <div class="panel-heading text-center" style="max-width: 1400px; min-width: 1000px;"> ';
                m_Html += '        <div class="pull-left"> ';
                m_Html += '            <div class="BtnArea" id="divInitButton" style="width: 95%; padding-top: 3px; padding-bottom: 3px;"> ';
                m_Html += '                <table style="border-color: black; width: 100%; font-size: small; border-collapse: collapse;"> ';
                m_Html += '                    <tbody> ';
                m_Html += '                        <tr> ';
                m_Html += '                            <td style="text-align: left;" nowrap="nowrap"> ';
                m_Html += "                                <input class='btn btn-primary mb10 mr5 notification' id='btnAdd' ondblclick='return false' onclick='AddDetils(\"" + MenuType + "\",\"" + m_ModuleKey +"\")' type='button' value='" + AddText +"'/>  ";
                m_Html += '                                <input class="btn btn-alert mb10 mr5 notification" id="btnExit" onclick="unBlock()" type="button" value="離開"/>                               ';
                m_Html += '                            </td>                                                                                                                                            ';
                m_Html += '                        </tr>                                                                                                                                                ';
                m_Html += '                    </tbody>                                                                                                                                                 ';
                m_Html += '                </table>                                                                                                                                                     ';
                m_Html += '            </div>                                                                                                                                                           ';
                m_Html += '        </div>                                                                                                                                                               ';
                m_Html += '        <div class="pull-right"><span class="panel-controls">                                                                                                                ';
                m_Html += '            <img src="Img/exit.png"   onclick="unBlock()">                                   ';
                m_Html += '        </span></div>                                                                                                                                                        ';
                m_Html += '        <span id="MantainTitle" class="panel-title"></span></div>                                                                                                            ';
                m_Html += '    <table  class="tabGridHead table table-striped" style="min-width:1000px;width:100%;">                                                     ';
                m_Html += '        <tbody>                                                                                                                                                              ';
                m_Html += '            <tr>                                                                                                                                                             ';
                m_Html += '               <th class="DelChk" style="width: 8%;"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></th>                                                                                                                                                          ';
                if (MenuType == "M") {
                    m_Html += '                <th class="lbl" style="width: 36%;"> ';
                    m_Html += '                    <label  id="lblMenuID">選單代號</label>';
                    m_Html += '                 </th>';

                    m_Html += '                <th  class="lbl" style="width: 36%; ">          ';
                    m_Html += '                    <label  id="lblModuleKey">模組名稱</label>';
                    m_Html += '                 </th>';

                    m_Html += '                <th class="lbl" style="width: 20%;">               ';
                    m_Html += '                    <label  id="lblMenuIndex">排序號碼</label>';
                    m_Html += '                 </th>';
                }
                else {
                    m_Html += '                <th class="lbl" style="width: 24%;"> ';
                    m_Html += '                    <label  id="lblMenuID">選單代號</label>   <input type="hidden" id="MenuParentID" value="' + p_MenuID +'" />';
                    m_Html += '                 </th>';

                    m_Html += '                <th  class="lbl" style="width: 24%; ">          ';
                    m_Html += '                    <label  id="lblModuleKey">模組名稱</label>';
                    m_Html += '                 </th>';

                    m_Html += '                <th class="lbl" style="width: 24%;">               ';
                    m_Html += '                    <label  id="lblFormID">程式代碼</label>';
                    m_Html += '                 </th>';

                     m_Html += '                <th class="lbl" style="width: 20%;">               ';
                    m_Html += '                    <label  id="lblMenuIndex">排序號碼</label>';
                    m_Html += '                 </th>';
                }
                m_Html += '            </tr>                                                                                                                                                            ';
                m_Html += '            </tbody>                                                                                                                                                            ';
                m_Html += '            </table>                                                                                                                                                            ';
              
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "MenuSet.aspx/GetMainMenuInfo",
                    data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "MenuType": MenuType, "SiteID": $('#selSite').val(), "MenuID": p_MenuID }),
                    dataType: "json",
                    success: function (Result) {
                        if (Result.d != null) {
                            if (Result.d.isSuccess) {
                                m_Result = Result.d.ResultEntity;
                                var m_Rows = '<div id="divDtls" style="min-width:1000px;min-height:600px;width:100%" ><table  id="DtlTableDtls" class="DtlTable table table-bordered" style="min-width:1000px;height:auto;width:100%">';
                                

                                $.each(m_Result, function (idx, MainMenu) {
                                    var m_Edit = "<td  class='DelChk'  style='width: 8%;'>";
                                    m_Edit += "<span class='glyphicon glyphicon-pencil' title='修改' onclick = 'ModifyDetils(\"Row" + idx + "\",\"" + MenuType + "\")' ></span>　";
                                    m_Edit += "<span class='glyphicon glyphicon-user' title='授權' onclick = 'ReflashAuthMenu(\"" + MainMenu.MenuID + "\")' ></span>　";
                                    m_Edit += "<span class='fa fa-trash' title='刪除' onclick = 'DelDetils(\"" + MainMenu.MenuID + "\")' ></span></td>  ";

                                    m_Rows += ' <tr id="Row' + idx +'">';
                                    m_Rows += m_Edit;
                                    if (MenuType == "M") {
                                        m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="1" field="MenuID" value="' + MainMenu.MenuID + '" style="width:36%">' + MainMenu.MenuID + '</td>';
                                        m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="0" field="ModuleKey" value="' + MainMenu.ModuleKey + '" style="width:36%">' + MainMenu.MenuDesc + '</td>';
                                        m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="0" field="MenuIndex" value="' + MainMenu.MenuIndex + '" style="width:20%">' + MainMenu.MenuIndex + '</td>';
                                    }
                                    else {
                                        m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="1" field="MenuID" value="' + MainMenu.MenuID + '" style="width:24%">' + MainMenu.MenuID + '</td>';
                                        m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="0" field="ModuleKey" value="' + MainMenu.ModuleKey + '" style="width:24%">' + MainMenu.MenuDesc + '</td>';
                                        m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="0" field="FormID" value="' + MainMenu.FormID + '" style="width:24%">' + MainMenu.FormDesc + '</td>';
                                        m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="0" field="MenuIndex" value="' + MainMenu.MenuIndex + '" style="width:20%">' + MainMenu.MenuIndex + '</td>';
                                    }
                                   
                                    m_Rows += ' </tr>';
                                });

                                m_Html += m_Rows;
                                m_Html += '    </table>     </div>                                                                                                                                                                  ';
                                m_Html += '</section>';  

                                $('.Main').block({
                                    theme: true,
                                    message: "<div class='panel divMaintainForm' id='MaintainForm'> <section class='dep-15' id='content'>" + m_Html + "</section><div id='divAttach'><div><input id='hidMaintainParam' value='' type='hidden' /> </div>",
                                    showOverlay: false,
                                    centerY: false,
                                    centerX: true,
                                    draggable: true,
                                    title: $("#PanelTitle").text(),
                                    themedCSS: {
                                        opacity: 1,
                                        width: '85%',
                                        height: '800px',
                                        cursor: 'initial',
                                        top: '5%'
                                    }
                                });
                            }
                            else {
                               
                            }
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("GetMainMenuInfo Error");
                       
                    }
                });
            }

            function GetMaintainHtml(p_ActType, p_MenuType, p_objMenuInfo) {
                var m_Employee = GetEmployeeInfo();
                var isPass = false;
                var EditHtml = "";
                var m_ReadOnly = "";
                if (p_ActType == "upd") {
                    m_ReadOnly = "readonly='true' disabled='disabled'";
                }
                var m_ModuleKeyReadOnly = "readonly='true' disabled='disabled'";
                if (p_MenuType == "M" && p_ActType == "add") {
                    m_ModuleKeyReadOnly = "";
                }
                var m_selModuleKey = '';
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "MenuSet.aspx/GetModuleKey",
                    async: false,
                    data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "SiteID": $('#selSite').val(), "ActType": p_ActType, "MenuType": p_MenuType }),
                    dataType: "json",
                    success: function (Result) {
                        if (Result.d != null) {
                            if (Result.d.isSuccess) {
                                m_Result = Result.d.ResultEntity;
                                m_selModuleKey = ' <select  type="select"  id="selModuleKey" name="selModuleKey" ' + m_ModuleKeyReadOnly +'> ';
                                $.each(m_Result, function (idx, ModuleInfo) {
                                    var m_selected = "";
                                    if (p_objMenuInfo.ModuleKey == ModuleInfo.ModuleKey) {
                                        m_selected = "selected='selected'";
                                    }
                                    m_selModuleKey += '<option  ' + m_selected + ' value="' + ModuleInfo.ModuleKey + '">' + ModuleInfo.ModuleName + '</option>';
                                });
                                m_selModuleKey += ' </select> ';
                                isPass = true;
                            }
                            else {
                                alert("GetModuleKey Error!! " + Result.d.LogMessage);
                            }
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("GetModuleKey Error");
                    }
                });


                var m_selFormInfo = '';
                if (p_MenuType == "Fu") {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "MenuSet.aspx/GetMenuForm",
                        async: false,
                        data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "ActType": p_ActType }),
                        dataType: "json",
                        success: function (Result) {
                            if (Result.d != null) {
                                if (Result.d.isSuccess) {
                                    m_Result = Result.d.ResultEntity;
                                    m_selFormInfo = ' <select  type="select"  id="selFormInfo" name="selFormInfo"> ';
                                    $.each(m_Result, function (idx, FormInfo) {
                                        var m_selected = "";
                                        if (p_objMenuInfo.FormID == FormInfo.FormID) {
                                            m_selected = "selected='selected'";
                                        }
                                        m_selFormInfo += '<option  ' + m_selected + ' value="' + FormInfo.FormID + '">' + FormInfo.Description + '</option>';
                                    });
                                    m_selFormInfo += ' </select> ';
                                }
                                else {
                                    alert("GetMenuForm Error" + Result.d.LogMessage + ";please try again later. ");

                                }
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            alert("GetMenuForm Error");
                        }
                    });
                }


                EditHtml += " <table id='DetailFormCtrl' class='' style='width:95%;font-size:small;border-color: black; border-collapse: collapse;'>";
                EditHtml += " <tr>   ";
                EditHtml += "      <td style='width:30%;text-align:left;'><label class='col-lg-2 control-label'>選單代號</label></td>";
                EditHtml += "      <td style='width:70%;text-align: left;' ><input class='form-control'  id='DtltxtMenuID' value='" + p_objMenuInfo.MenuID + "'  " + m_ReadOnly + " type='text'></td> ";
                EditHtml += "</tr>";
                EditHtml += " <tr>   ";
                EditHtml += "      <td style='width:30%;text-align:left;'><label class='col-lg-2 control-label'>模組名稱</label></td>";
                EditHtml += "      <td style='width:70%;text-align: left;' >" + m_selModuleKey + "</td> ";
                EditHtml += "</tr>";

                if (p_MenuType == "Fu") {
                    EditHtml += " <tr>   ";
                    EditHtml += "      <td style='width:30%;text-align:left;'><label class='col-lg-2 control-label'>功能名稱</label></td>";
                    EditHtml += "      <td style='width:70%;text-align: left;' >" + m_selFormInfo + "</td> ";
                    EditHtml += "</tr>";
                }

                EditHtml += " <tr>   ";
                EditHtml += "      <td style='width:30%;text-align:left;'><label class='col-lg-2 control-label'>排序號碼</label></td>";
                EditHtml += "      <td style='width:70%;text-align: left;' ><input class='form-control' id='DtltxtMenuIndex' value='" + p_objMenuInfo.MenuIndex + "'  type='text'></td> ";
                EditHtml += "</tr>";
                EditHtml += " <tr>   ";
                EditHtml += "      <td colspan='2'>　 </td>";
                EditHtml += " </tr>   ";
                EditHtml += " <tr>   ";
                EditHtml += "      <td colspan='2'><input id='btnExit' onclick='unblockByID(\"DtlTableDtls\")' type='button' value='離開' /><input id='btnSave' ondblclick='return false'  onclick='DetailSave(\"" + p_MenuType + "\",\"" + p_ActType + "\")' type='button' value='存檔' /> </td>";
                EditHtml += " </tr>   ";
                EditHtml += "</table>";

                if (isPass) {
                    return EditHtml;
                } else {
                    return "";
                }
            }
           
            function AddDetils(p_MenuType, p_ModuleKey) {
                var objMainMenu = new Object;
                objMainMenu = { "FormID": "", "MenuIndex": "", "ModuleKey": p_ModuleKey, "MenuID": "" };

                var EditHtml = GetMaintainHtml("add", p_MenuType, objMainMenu);
                if (EditHtml != "") {
                    $('#DtlTableDtls').block({
                        theme: true,
                        message: EditHtml,
                        showOverlay: true,
                        centerY: true,
                        title: "資料維護",
                        draggable: true,
                        themedCSS: {
                            width: '400px',
                            top: '30%',
                            left: '20%'
                        }
                    });
                }
            }

            function DelDetils(p_MenuID) {
                try {
                    if (confirm("確定刪除??")) {
                        var objMainMenu = new Object;
                        objMainMenu = { "MenuID": p_MenuID };
                        var m_Employee = GetEmployeeInfo();

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "MenuSet.aspx/MaintainMainMenu",
                            data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "ActType": "Del", "objMainMenu": objMainMenu }),
                            dataType: "json",
                            success: function (Result) {
                                if (Result.d != null) {
                                    if (Result.d.isSuccess) {
                                        ReflashMenu();
                                        alert('刪除成功');
                                        unBlock();
                                    }
                                    else {
                                        alert("MaintainMainMenu Error" + Result.d.LogMessage + ";please try again later. ");
                                    }
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert("MaintainMainMenu Error");

                            }
                        });
                    }
                }
                catch (e) {
                    alert("MaintainMainMenu Error");
                }
            }

            function ModifyDetils(p_RowIdx, p_MenuType) {

                var DtlMenuID = "";
                var DtlMenuDesc = "";
                var DtlModuleKey = "";
                var DtlMenuIndex = "";
                var DtlFormID = "";
                var DtlFormDesc = "";

                $.each($("#" + p_RowIdx + " .Dtltd"), function (idx, Item) {
                    switch ($(Item).attr("field")) {
                        case "MenuID":
                            DtlMenuID = $(Item).attr("value");
                            break;
                        case "ModuleKey":
                            DtlModuleKey = $(Item).attr("value");
                            DtlMenuDesc = $(Item).text();
                            break;
                        case "MenuIndex":
                            DtlMenuIndex = $(Item).attr("value");
                            break;
                        case "FormID":
                            DtlFormID = $(Item).attr("value");
                            DtlFormDesc = $(Item).text();
                            break;
                       
                    }
                });


                var objMainMenu = new Object;
                objMainMenu = { "FormID": DtlFormID, "MenuIndex": DtlMenuIndex, "ModuleKey": DtlModuleKey, "MenuID": DtlMenuID };

                var EditHtml = GetMaintainHtml("upd", p_MenuType, objMainMenu);
                $('#DtlTableDtls').block({
                    theme: true,
                    message: EditHtml,
                    showOverlay: true,
                    centerY: true,
                    title: "資料維護",
                    draggable: true,
                    themedCSS: {
                        width: '400px',
                        top: '30%',
                        left: '20%'
                    }
                });
            }

            function DetailSave(p_MenuType, p_ActType) {

                var MenuID = $("#DtltxtMenuID").val();
                var MenuIndex = $("#DtltxtMenuIndex").val();
                var ModuleKey = $("#selModuleKey").val();
                var MenuParentID = $("#MenuParentID").val();
                var m_Employee = GetEmployeeInfo();
                var FormID = "";

                if ($("#selFormInfo").length != 0) {
                    FormID = $("#selFormInfo").val();
                }

                
                var objMainMenu = new Object;
                if (p_MenuType == "M") {
                    objMainMenu = { "MenuID": MenuID,  "ModuleKey": ModuleKey, "SiteID": $("#selSite").val(), "MenuType": p_MenuType, "MenuIndex": MenuIndex };
                }
                else {
                    objMainMenu = { "MenuID": MenuID, "FormID": FormID, "ModuleKey": ModuleKey, "SiteID": $("#selSite").val(), "MenuType": p_MenuType, "MenuIndex": MenuIndex, "MenuParentID": MenuParentID };
                }


                try {

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "MenuSet.aspx/MaintainMainMenu",
                            data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "ActType": p_ActType, "objMainMenu": objMainMenu }),
                            dataType: "json",
                            success: function (Result) {
                                if (Result.d != null) {
                                    if (Result.d.isSuccess) {
                                        ReflashMenu();
                                        alert('存檔成功');
                                        unBlock();
                                    }
                                    else {
                                        alert("MaintainMainMenu Error" + Result.d.LogMessage + ";please try again later. ");
                                    }
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert("MaintainMainMenu Error");
                               
                            }
                        });
                    }
                    catch (e) {
                    alert("MaintainMainMenu Error");
                }
             }

            function unblockByID(p_ID) {
                $('#' + p_ID).unblock({ fadeOut: 100 });
             }

            function unBlock() {
                $('.Main').unblock();
               
            }

            function ReflashMenu() {
                 var m_Employee = GetEmployeeInfo();
                if (m_Employee["isSuccess"]) {
                    $('.divMainMenu').block({
                        message: '<img src="Img/loading.gif" />',
                        css: {
                            border: 'none',
                            opacity: .7
                        }
                    });

                    try {

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "MenuSet.aspx/GetMainModle",
                            data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "p_SiteID": $('#selSite').val() }),
                            dataType: "json",
                            success: function (Result) {
                                if (Result.d != null) {
                                    if (Result.d.isSuccess) {
                                        m_Result = Result.d.ResultEntity;
                                        $("#divMainMenu").html(m_Result["divMainMenu"].toString());
                                    }
                                    else {
                                        alert("GetMainModle Error" + Result.d.LogMessage + ";please try again later. ");
                                        setTimeout("$('div.divMainMenu').unblock()", 300);
                                    }
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert("GetMainModle Error");
                                setTimeout("$('div.divMainMenu').unblock()", 300);
                            }
                        });
                    }
                    catch (e) {
                        alert("GetMainModle Error");
                        setTimeout("$('div.divMainMenu').unblock()", 300);
                    }
                }
            }

            function OchangSite() {
                ReflashMenu();
            }

            function ReflashAuthMenu(p_MenuID) {

               var m_Employee = GetEmployeeInfo();

                var m_Html = "";
                m_Html += '    <table  class="tabAuthGridHead table table-striped" style="min-width:500px;width:500px;">    ';
                m_Html += '        <tbody>                                                            ';
                m_Html += '            <tr>                                                           ';
                m_Html += '                            <th colspan="3" style="text-align: left;" nowrap="nowrap"> ';
                m_Html += "                                <input class='btn btn-primary mb10 mr5 notification' id='btnAdd' ondblclick='return false' onclick='AddAuth(\"" + p_MenuID + "\")' type='button' value='新增權限'/>  ";
                m_Html += '                                <input class="btn btn-alert mb10 mr5 notification" id="btnExit" onclick="unblockByID(\'contentM\')" type="button" value="離開"/>                               ';
                m_Html += '                            </th>                                                                                                                                            ';

                m_Html += '            </tr>                                                           ';
                m_Html += '            <tr>                                                           ';
                m_Html += '               <th class="DelChk" style="width: 8%;"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></th>    ';
                m_Html += '                <th class="lbl" style="width: 46%;"> ';
                m_Html += '                    <label  id="lblAuthMenuID">選單代號</label>';
                m_Html += '                 </th>';
                m_Html += '                <th  class="lbl" style="width: 46%; ">          ';
                m_Html += '                    <label  id="lblModuleKey">角色名稱</label>';
                m_Html += '                 </th>';
                m_Html += '            </tr>         ';
                m_Html += '            </tbody>      ';
                m_Html += '    </table>        ';
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "MenuSet.aspx/GetAuthMenuInfo",
                    data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "MenuID": p_MenuID }),
                    dataType: "json",
                    success: function (Result) {
                        if (Result.d != null) {
                            if (Result.d.isSuccess) {
                                m_Result = Result.d.ResultEntity;
                                var m_Rows = '<div id="divAuthDtls" style="min-width:500px;min-height:300px;width:500px" ><table  id="DtlAuthTableDtls" class="DtlTable table table-bordered" style="min-width:500px;height:auto;width:500px">';


                                $.each(m_Result, function (idx, AuthMenu) {
                                    var m_Edit = "<td  class='DelChk'  style='width: 8%;'>";
                                    m_Edit += "<span class='fa fa-trash' title='刪除' onclick = 'DelAuthMenu(\"" + AuthMenu.MenuID + "\",\"" + AuthMenu.GroupID + "\")' ></span></td>  ";

                                    m_Rows += ' <tr id="Row' + idx + '">';
                                    m_Rows += m_Edit;

                                    m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="1" field="MenuID" value="' + AuthMenu.MenuID + '" style="width:36%">' + AuthMenu.MenuID + '</td>';
                                    m_Rows += ' <td class="Dtltd" valuetype="text" rowkey="0" field="GroupID" value="' + AuthMenu.GroupID + '" style="width:56%">' + AuthMenu.GroupID+'-'+ AuthMenu.GroupDesc + '</td>';


                                    m_Rows += ' </tr>';
                                });

                                m_Html += m_Rows;
                                m_Html += '    </table>     </div>                                                                                                                                                                  ';
                                m_Html += '</section>';

                                $('#contentM').block({
                                    theme: true,
                                    message: "<div class='panel divAauthForm' id='divAauthForm'> <section class='dep-15' id='content'>" + m_Html + "</section><div id='divAttach'><div><input id='hidMaintainParam' value='' type='hidden' /> </div>",
                                    showOverlay: false,
                                    centerY: false,
                                    centerX: true,
                                    draggable: true,
                                    title: "維護授權",
                                    themedCSS: {
                                        opacity: 1,
                                        width: '650px',
                                        height: '450px',
                                        cursor: 'initial',
                                        top: '5%'
                                    }
                                });
                            }
                            else {

                            }
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("GetMainMenuInfo Error");

                    }
                });
            }

            function GetAuthHtml(p_ActType, p_objAuthMenu) {
                var m_Employee = GetEmployeeInfo();
                var isPass = false;
                var EditHtml = "";
                var m_ReadOnly =  "readonly='true' disabled='disabled'";
                
               
                var m_selGroup = '';
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "MenuSet.aspx/GetGroupInfo",
                    async: false,
                    data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "MenuID": p_objAuthMenu.MenuID, "ActType": p_ActType}),
                    dataType: "json",
                    success: function (Result) {
                        if (Result.d != null) {
                            if (Result.d.isSuccess) {
                                m_Result = Result.d.ResultEntity;
                                m_selGroup = ' <select  type="select"  id="selGroupInfo" name="selGroupInfo" > ';
                                $.each(m_Result, function (idx, GroupInfo) {
                                    var m_selected = "";
                                    if (p_objAuthMenu.GroupID == GroupInfo.GroupID) {
                                        m_selected = "selected='selected'";
                                    }
                                    m_selGroup += '<option  ' + m_selected + ' value="' + GroupInfo.GroupID + '">' + GroupInfo.GroupDesc + '</option>';
                                });
                                m_selGroup += ' </select> ';
                                isPass = true;
                            }
                            else {
                                alert("GetGroupInfo Error!! " + Result.d.LogMessage);
                            }
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("GetGroupInfo Error");
                    }
                });



                EditHtml += " <table id='DetailAuthMenu' class='' style='width:95%;font-size:small;border-color: black; border-collapse: collapse;'>";
                EditHtml += " <tr>   ";
                EditHtml += "      <td style='width:30%;text-align:left;'><label class='col-lg-2 control-label'>選單代號</label></td>";
                EditHtml += "      <td style='width:70%;text-align: left;' ><input class='form-control'  id='AuthMenuID' value='" + p_objAuthMenu.MenuID + "'  " + m_ReadOnly + " type='text'></td> ";
                EditHtml += "</tr>";
                EditHtml += " <tr>   ";
                EditHtml += "      <td style='width:30%;text-align:left;'><label class='col-lg-2 control-label'>角色名稱</label></td>";
                EditHtml += "      <td style='width:70%;text-align: left;' >" + m_selGroup + "</td> ";
                EditHtml += "</tr>";

                EditHtml += " <tr>   ";
                EditHtml += "      <td colspan='2'>　 </td>";
                EditHtml += " </tr>   ";
                EditHtml += " <tr>   ";
                EditHtml += "      <td colspan='2'><input id='btnExit' onclick='unblockByID(\"divAauthForm\")' type='button' value='離開' /><input id='btnSave' ondblclick='return false'  onclick='AuthMenuSave(\"" + p_ActType + "\")' type='button' value='存檔' /> </td>";
                EditHtml += " </tr>   ";
                EditHtml += "</table>";

                if (isPass) {
                    return EditHtml;
                } else {
                    return "";
                }
            }


            function AddAuth(p_MenuID) {
                var objAuthMenu = new Object;
                objAuthMenu = { "MenuID": p_MenuID };

                var EditHtml = GetAuthHtml("add", objAuthMenu);
                if (EditHtml != "") {
                    $('#divAauthForm').block({
                        theme: true,
                        message: EditHtml,
                        showOverlay: true,
                        centerY: true,
                        title: "資料維護",
                        draggable: true,
                        themedCSS: {
                            width: '400px',
                            top: '30%',
                            left: '20%'
                        }
                    });
                }
            }


            function AuthMenuSave(p_ActType) {

                var m_Employee = GetEmployeeInfo();

                if ($("#selGroupInfo").length != 0) {
                    GroupID = $("#selGroupInfo").val();
                }
                var objAuthMenu = new Object;
                objAuthMenu = { "GroupID": GroupID, "MenuID": $("#AuthMenuID").val() };
                try {

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "MenuSet.aspx/MaintainAuthMenu",
                            data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "ActType": p_ActType, "objAuthMenu": objAuthMenu }),
                            dataType: "json",
                            success: function (Result) {
                                if (Result.d != null) {
                                    if (Result.d.isSuccess) {
                                        ReflashAuthMenu($("#AuthMenuID").val());
                                        alert('存檔成功');
                                        unblockByID("divAauthForm");
                                    }
                                    else {
                                        alert("AuthMenuSave Error" + Result.d.LogMessage + ";please try again later. ");
                                    }
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert("AuthMenuSave Error");
                               
                            }
                        });
                    }
                    catch (e) {
                    alert("AuthMenuSave Error");
                }
            }

            function DelAuthMenu(p_MenuID, p_GroupID) {
                try {
                    if (confirm("確定刪除??")) {

                       
                        var objAuthMenu = new Object;
                        objAuthMenu = { "GroupID": p_GroupID, "MenuID": p_MenuID };


                        var m_Employee = GetEmployeeInfo();

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "MenuSet.aspx/MaintainAuthMenu",
                            data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "ActType": "Del", "objAuthMenu": objAuthMenu }),
                            dataType: "json",
                            success: function (Result) {
                                if (Result.d != null) {
                                    if (Result.d.isSuccess) {
                                        ReflashAuthMenu(p_MenuID);
                                        alert('刪除成功');
                                        unblockByID("divAauthForm");

                                    }
                                    else {
                                        alert("DelAuthMenu Error" + Result.d.LogMessage + ";please try again later. ");
                                    }
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert("DelAuthMenu Error");

                            }
                        });
                    }
                }
                catch (e) {
                    alert("MaintainMainMenu Error");
                }
            }


        </script>
       
        <!-- END: PAGE SCRIPTS -->

    </form>


</body></html>