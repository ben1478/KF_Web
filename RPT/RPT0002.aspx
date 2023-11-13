<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RPT0002.aspx.cs" Inherits="KF_Web.RPT0002" %>
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
    <script src="js/jqplot.categoryAxisRenderer.js"></script>
    <script type="text/javascript" src="js/jqplot.barRenderer.js"></script>
      <script type="text/javascript" src="js/jqplot.pieRenderer.js?11=14ll4gg55g4u58"></script>
     <script type="text/javascript" src="js/jqplot.highlighter.js?11=14ll4gg55g4u58"></script>
    <script src="js/jqplot.pointLabels.js"></script>
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
                                                                 <label class="AllowEmpty " style="width: 60%; text-align: right" id="lblDisplayName">*年度區間：
                                                                 </label>
                                                             </td>
                                                             <td style="width: 70%; text-align: left;">
                                                                 <input type="text" id="txtYear_S" placeholder="選擇年度-起" style="width: 100px;" class="form-control" />～
                                                                 <input type="text" id="txtYear_E" placeholder="選擇年度-訖" style="width: 100px;" class="form-control" />
                                                             </td>
                                                            
                                                          </tr>
                                                          <tr>
                                                             <td style="width: 30%; text-align: right">
                                                                  <label class="AllowEmpty " style="width: 60%; text-align: right" id="lblType">*比較基準：
                                                                 </label>
                                                             </td>
                                                             <td  style="width: 70%; text-align: left;" >
                                                                 <select title="比較基準"  type="select" id="selType">
                                                                        <option value="Year">年度</option>
                                                                        <option value="Month">年月</option>
                                                                    </select>
                                                             </td>
                                                         </tr>
                                                            <tr>
                                                             <td style="width: 30%; text-align: right"></td>
                                                             <td  style="width: 70%; text-align: left;"  colspan ="3">
                                                                 <input class="btn btn-primary mb10 mr5  notification" id="btnQuery" ondblclick="return false" onclick="ShowRpt()" type="button" value="查詢" />
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                  <div id="chart"></div>
                                                  <div id="chart2" style="width:800px;left:30%" class="Report">
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
                language: 'zh-TW', 
                autoclose: true, 
                clearBtn: true,
                format: "yyyy",
                datesDisabled: [day.getYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate(), day.getYear() + '-' + (day.getMonth() + 1) + '-' + (day.getDate() + 2)]
            };
            $("#txtYear_S").datepicker(ops);
            $("#txtYear_E").datepicker(ops);
            $("#txtYear_S").val(day.getFullYear() - 1);
            $("#txtYear_E").val(day.getFullYear());
            $.jqplot.config.enablePlugins = true;
        });



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
            var m_lblshow = true;

            var m_seriesColors = $.jqplot.config.defaultColors;
            if (p_seriesColors) {
                m_seriesColors = [p_seriesColors];
            }
            $.each(p_Result, function (idx, Achievement) {
                line1.push([Achievement.yyyy, Achievement.amount]);

                arrAmt.push(Achievement.amount)
                Name = Achievement.yyyy;
                Total += parseInt(Achievement.amount);
            });
            if (p_Type == "Year") {
                m_Tick = 10000;
                m_ChkTick = m_Tick;
                m_ChkTick = m_ChkTick * 3;
                m_lblshow = true;
            }
            else {
                m_ChkTick = m_Tick;
                m_ChkTick = m_ChkTick * 6;
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
                    pointLabels: { show: m_lblshow }

                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer

                    },
                    yaxis: { min: Min, max: Max, tickInterval: TickInterval }
                }

            });
        }
        $('#chart').on('jqplotDataClick',
            function (ev, seriesIndex, pointIndex, data) {
            
                GetRptByYear_BC(data[0], data[1]);
            }
        );


        function GetRptByYear_BC(p_Year, p_Title) {
            var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };
          

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "RPT0002.aspx/GetAchievementByYear_BC",
                data: JSON.stringify({ "Employee": m_Employee, "Year": p_Year }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            BindPlotPie("chart2", p_Year + '：' + p_Title + '(萬元)', Result.d.ResultEntity)

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
                            dataLabelThreshold: 1
                        }
                    },
                    legend: { show: true, location: 'e' }
                }
            );

            $('#chart2').on('jqplotDataMouseOver',
                function (ev, seriesIndex, pointIndex, data) {

                    $('#chart2').attr("title", data[0] + '-' + data[1]);
                    $("#chart2 .jqplot-table-legend-label").css("background-color", "");
                    $("#chart2 .jqplot-table-legend-label a").css("font-weight", "");
                    $("#" + data[2]).css("background-color", $("#" + data[2]).attr("Bcolor"));
                    $("#" + data[2] + " a").css("font-weight", "bold");

                }
            );

        }


        function BindLines(p_Data) {
            $('#chart').empty();

            if ($("#selType").val() == "Year") {
                BindPlot('chart', p_Data, "Year", "");
                $('#chart').off('jqplotDataMouseOver');
                $('#chart').off('jqplotDataUnhighlight');

            } else {
                var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ''];
                var years = [];
                var datasets = [];
                for (var i = 0; i < p_Data.length; i++) {
                    var yearData = p_Data[i];
                    var yyyy = yearData.yyyy;
                    var values = [];

                    for (var j = 0; j < yearData.AmountInfos.length; j++) {
                        values.push(yearData.AmountInfos[j].amount);
                    }
                    years.push(yyyy);
                    datasets.push(values);
                }
               
                var plot = $.jqplot('chart', datasets, {
                    title: '年度業績比較表', height: 700,
                    legend: {
                        show: true,
                        labels: years
                    },
                    seriesDefaults: {
                        renderer: $.jqplot.LineRenderer,
                        rendererOptions: {
                            smooth: true,
                            animation: {
                                show: true
                            }
                        },
                        pointLabels: {
                            show: true,
                            formatString: '%d'
                        }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: months
                        },
                        yaxis: {
                            min: 0
                        }
                    },
                    highlighter: {
                        show: false,
                        tooltipContentEditor: function (str, seriesIndex, pointIndex, plot) {

                            var content = '';
                            for (var i = 0; i < plot.series.length; i++) {
                                var series = plot.series[i];
                                var year = years[i];
                                var value = series.data[pointIndex][1];
                                content += year + ':' + value + '(萬元)<br>';
                            }
                            return content;
                        }
                    }
                });
                
            }

            if ($("#selType").val() == "Month") {
                $('#chart').off('jqplotDataMouseOver');
                $('#chart').off('jqplotDataUnhighlight');

                $('#chart').on('jqplotDataMouseOver', function (ev, seriesIndex, pointIndex, data) {
                    var content = plot.plugins.highlighter.tooltipContentEditor('', seriesIndex, pointIndex, plot);
                    var tooltip = $('<div class="custom-tooltip">' + content + '</div>').css({
                        position: 'absolute',
                        top: ev.pageY + 10,
                        left: ev.pageX + 10,
                        display: 'none',
                        'background-color': '#fff',
                        border: '1px solid #ccc',
                        padding: '5px',
                        'z-index': 9999
                    }).appendTo('body');
                    tooltip.fadeIn('fast');

                    $("#chart .jqplot-table-legend-label").css("background-color", "");
                    $("#chart .jqplot-table-legend-label").css("font-weight", "");

                    $("#lbl" + years[seriesIndex]).css("background-color", $("#lbl" + years[seriesIndex]).attr("Bcolor"));
                    $("#lbl" + years[seriesIndex]).css("font-weight", "bold");
                }).on('jqplotDataUnhighlight', function () {
                    $('.custom-tooltip').fadeOut('fast', function () {
                        $(this).remove();
                    });
                });

            }
        }
      
       
        function ShowRpt() {
            var m_Employee = { "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };
            var p_Year_S = $("#txtYear_S").val();
            var p_Year_E = $("#txtYear_E").val();
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "RPT0002.aspx/GetCompareAchievement",
                data: JSON.stringify({ "Employee": m_Employee, "Year_S": p_Year_S, "Year_E": p_Year_E, "Type": $("#selType").val() }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                           
                            BindLines(Result.d.ResultEntity);
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
    </script>
</body>

</html>
