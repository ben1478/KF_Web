<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RPT0001.aspx.cs" Inherits="KF_Web.RPT0001" %>
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



    <link href="css/jquery.jqplot.min.css" rel="stylesheet" />
   
    <script type="text/javascript" src="js/jquery.jqplot.js?1=hy5"></script>
  
    <script type="text/javascript" src="js/jqplot.barRenderer.js"></script>
    <script type="text/javascript" src="js/jqplot.pieRenderer.js?11=1458"></script>
    <script type="text/javascript" src="js/jqplot.categoryAxisRenderer.js"></script>
    <script type="text/javascript" src="js/jqplot.pointLabels.js"></script>
    <script src="js/bootstrap-datepicker.min.js"></script>
    <link href="css/bootstrap-datepicker.min.css" rel="stylesheet" />

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
                    <div class="tray tray-center" id="" style="padding-right: 5px;">
                        <div class="row">
                            <div class="col-md-12" >
                                 <div class="panel">
                                
                                    <div class="panel-heading text-center">
                                        <div class="pull-left">
                                            <div id="divInitButton" class="BtnArea btn-group mb5" runat="server">
                                            </div>
                                        </div>
                                        <span id="PanelTitle" class="panel-title" runat="server"></span>
                                    </div>
                                     <div id="divQueryArea" class="Maintain" runat="server">
                                         <div class="panel">
                                             <div class="panel-body "  >
                                                 <table id="BaseCtrl" class="" style="width: 100%; font-size: small; border-color: black; border-collapse: collapse;">
                                                     <tbody>

                                                         <tr>
                                                             <td style="width: 30%; text-align: right">
                                                                 <label class="AllowEmpty " style="width: 60%; text-align: right" id="lblDisplayName">*年度：
                                                                 </label>
                                                             </td>
                                                             <td style="width: 70%; text-align: left;">
                                                                 <input type="text" id="txtYear" placeholder="選擇年度" style="width: 200px;" class="form-control" />
                                                             </td>
                                                             <tr>
                                                             </tr>
                                                             <td style="width: 30%; text-align: right"></td>
                                                             <td style="width: 70%; text-align: left;">
                                                                 <input class="btn btn-primary mb10 mr5  notification" id="btnQuery" ondblclick="return false" onclick="ShowRpt()" type="button" value="查詢" />
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                
                                                   <div id="chart1" style="width:800px;left:30%" class="Report">
                                                                 </div>
                                                   <div id="chart2" style="width:800px;left:30%" class="Report">
                                                                 </div>
                                                   <div id="chart3" style="width:800px;left:30%" class="Report">
                                                                 </div>

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
       
        $(document).ready(function () {

            var day = new Date();
            //初始化
            var ops = {
                minViewMode: 'years',
                language: 'zh-TW', //语言
                autoclose: true, //选择后自动关闭
                clearBtn: true,//清除按钮
                format: "yyyy",//日期格式
                datesDisabled: [day.getYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate(), day.getYear() + '-' + (day.getMonth() + 1) + '-' + (day.getDate() + 2)]
            };


            $("#txtYear").datepicker(ops);
            $("#txtYear").val(day.getFullYear());

            $.jqplot.config.enablePlugins = true;
        });
        

        function BindPlotPie(p_Target, p_title, p_Result) {
            var data1 = [];
            var toolTip1 = [];
            var data2 = [];
       
            $.each(p_Result, function (idx, Achievement) {
                if (Achievement.DisplayName == null) {
                    Achievement.DisplayName = "未歸屬部門";
                }
                data2.push([Achievement.DisplayName, parseInt(Achievement.get_amount), Achievement.CheckVal]);
                toolTip1.push([Achievement.DisplayName]);
            });
            data1.push(data2);


            $('#' + p_Target).empty();
            var plot1 = jQuery.jqplot(p_Target,
                data1,
                {
                    height: 500,
                    title: p_title,
                    seriesDefaults: {
                        shadow: false,
                       
                        renderer: jQuery.jqplot.PieRenderer,
                        rendererOptions: {
                            padding: 2,
                            sliceMargin: 2,
                            dataLabels: 'value',
                            showDataLabels: true,
                            dataLabelThreshold:1
                        }
                    },
                    legend: { show: true, location: 'e' }
                }
            );
        }

        function BindPlot(p_Target, p_Result, p_Type, p_Title, p_seriesColors) {
            var arrAmt = [];
            var Name = "";
            var line1 = [];
          //  var line2 = [];
            var Total = 0;
            var m_Tick = 100;
            var m_unit = " (萬元)";
            var m_ChkTick = 100;
            var m_Title = "";
            var m_seriesColors = $.jqplot.config.defaultColors;
            if (p_seriesColors) {
                m_seriesColors = [p_seriesColors];
            }
            $.each(p_Result, function (idx, Achievement) {
                line1.push([Achievement.DisplayName, Achievement.get_amount]);
               // line2.push([Achievement.DisplayName, parseInt( Achievement.get_amount)-150]);

                arrAmt.push(Achievement.get_amount)
                Name = Achievement.DisplayName;
                Total += parseInt(Achievement.get_amount);
            });
            if (p_Type == "Year") {
                m_Tick = 1000;
                m_ChkTick = m_Tick;
                m_ChkTick = m_ChkTick * 2;
                m_Title = '總業績: ' + Total + m_unit;
            }
            else {
                m_ChkTick = m_Tick;
                m_ChkTick = m_ChkTick * 5;
                m_Title = '總業績: ' + Total + m_unit;
            }

            if (p_Title) {
                m_Title = p_Title + m_Title;
            }

            var Max = Math.max.apply(null, arrAmt);
            var Min = Math.min.apply(null, arrAmt);

            if (Max % m_Tick !== 0) {
                Max = Math.ceil((Max / m_Tick) + 2) * m_Tick;
            }
            else {
                Max = Math.ceil((Max / m_Tick) + 2) * m_Tick;
            }

            if (Min % 100 !== 0) {
                Min = Math.floor(Min / m_Tick) * m_Tick;
            }
            if (Min <= m_ChkTick) {
                Min = 0;
            }
            var TickInterval = Math.ceil((Max - Min)) / 10;
            $('#' + p_Target).empty();
            $('#' + p_Target).jqplot([line1], {

                title: m_Title, height: 500,
                seriesColors: m_seriesColors,
                seriesDefaults: {
                    renderer: $.jqplot.BarRenderer,
                    pointLabels: { show: true }
                  
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer

                    },
                    yaxis: { min: Min, max: Max, tickInterval: TickInterval }
                }

            });
        }


        function GetAchievementByMonth_BCDtl(p_Month, p_Title, p_U_BC, p_BC_Na, p_seriesColor) {
            var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };
          
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "RPT0001.aspx/GetAchievementByMonth_BCDtl",
                data: JSON.stringify({ "Employee": m_Employee, "Month": p_Month, "U_BC": p_U_BC }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                           // BindPlotPie("chart3", p_Month + '：' + p_BC_Na + p_Title + '(萬元)', Result.d.ResultEntity)
                            BindPlot("chart3", Result.d.ResultEntity, "", p_BC_Na, p_seriesColor)
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
        $('#chart3').bind('jqplotDataMouseOver',
            function (ev, seriesIndex, pointIndex, data) {
                $('#chart3').attr("title", data[0] + '-' + data[1]);
            }
        );

        function GetRptByMonth_BC(p_Month,p_Title) {
            var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };
            $("#chart2").attr('Month', p_Month);

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "RPT0001.aspx/GetAchievementByMonth_BC",
                data: JSON.stringify({ "Employee": m_Employee, "Month": p_Month }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            BindPlotPie("chart2", p_Month + '：' + p_Title + '(萬元)', Result.d.ResultEntity)
                          
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
        $('#chart2').bind('jqplotDataClick',
            function (ev, seriesIndex, pointIndex, data) {
                //alert($("#chart2").attr('Month') + "-" + data[1] + "-" + data[2]);
                GetAchievementByMonth_BCDtl($("#chart2").attr('Month'), data[1], data[2], data[0], $("#" + data[2]).attr("Bcolor"));
            }
        );
        $('#chart2').bind('jqplotDataMouseOver',
            function (ev, seriesIndex, pointIndex, data) {
               
                $('#chart2').attr("title", data[0] + '-' + data[1]);
                $("#chart2 .jqplot-table-legend-label").css("background-color", "");
                $("#chart2 .jqplot-table-legend-label a").css("font-weight", "");
                $("#" + data[2]).css("background-color", $("#" + data[2]).attr("Bcolor"));
                $("#" + data[2] + " a").css("font-weight", "bold");
              
            }
        );
        function GetRptYear() {
            var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "RPT0001.aspx/GetAchievementByYear",
                data: JSON.stringify({ "Employee": m_Employee, "Year": $("#txtYear").val() }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            BindPlot("chart1", Result.d.ResultEntity, "Year", $("#txtYear").val()+"年")
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

        $('#chart1').bind('jqplotDataClick',
            function (ev, seriesIndex, pointIndex, data) {
                GetRptByMonth_BC(data[0], data[1]);
            }
        );


        function GetRpt() {

            var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "RPT0001.aspx/GetAchievementByWorkID",
                data: JSON.stringify({ "Employee": m_Employee, "WorkID": "K0030", "get_amount_date_s": "2022-01-01", "get_amount_date_e": "2022-12-31" }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            BindPlot(Result.d.ResultEntity)
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
        function ShowRpt() {
            if ($("#txtYear").val() != "") {
                setTimeout('GetRptYear()', 500);
            }
            else {
                alert("請輸入年度")
            }
            /*$('.Main').block({
                theme: true,
                message: $('div.Report'),
                showOverlay: false,
                onOverlayClick: $.unblockUI,
                centerY: false,
                centerX: true,
                exitImg:'<img src="../Img/exit.png"  onclick="CloseRpt()">',
                draggable: true,
                title: $("#PanelTitle").text(),
                themedCSS: {
                    opacity: 1,
                    width: 'auto',
                    height: 'auto',
                    cursor: 'initial',
                    top: '5%'
                }
            });*/
          

          

        }
        function CloseRpt() {
            $('.Main').unblock({ fadeOut: 100 });
        }

    </script>
   
</body>

</html>
