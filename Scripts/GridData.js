




function MobileScroll(p_Action) {
   var m_Scroll= $('.divGridBody').scrollLeft();
    if (p_Action == "left") {
        m_Scroll = m_Scroll - 150;
    }
    else {
        m_Scroll = m_Scroll + 150;
    }
    $('.divGridBody').scrollLeft(m_Scroll);
    $('.divGridHead').scrollLeft(m_Scroll);

}



function GetTop() {
    var m_top = "";
    if ($(window).width() > $(window).height()) {
        m_top = "50%";
    }
    else {
        m_top = "20%";
    }
    return m_top;
}

function GridMobileCtrl() {
    if ($("#hidIsMobile").length != 0) {
        if ($("#hidIsMobile").val() == "Y") {

            if ($("#MobileScroll").length == 0) {
                var m_top = GetTop();
                //$('.timeout').append("<table id='MobileScroll' style='height:32px;position: fixed  ;top: " + m_top + "; left: 10%; ' ><tr><td style='width:32px;opacity: 0.5;background-repeat: no-repeat;background-image: url(\"/KF_Web/Img/Right.png\")' onclick='MobileScroll(\"Right\")'>　</td><td>　　　</td><td style='width:32px;opacity: 0.5;background-repeat: no-repeat;background-image: url(\"Img/Right.png\")'  onclick='MobileScroll(\"right\")' >　</td></tr> </table>")
            }

            $(".divGridHead").css("min-width", "600px");
            $(".tabGridHead").css("min-width", "1300px");

            $(".divGridBody").css("min-width", "600px");
            $(".tabGridBody").css("min-width", "1300px");
            $('.divGridHead').on('scroll', function () {
                $('.divGridBody').scrollLeft($(this).scrollLeft());
            });
            $('.divGridBody').on('scroll', function () {
                $('.divGridHead').scrollLeft($(this).scrollLeft());
            });


            $("th").css("height", "60px")
        }
        else {

            $(".tabGridHead").css("width", "100%")
            $(".tabGridBody").css("width", "100%")
        }
    }
}


function InitSearchInfo(p_EventID, p_FieldID, p_EventActionType, p_SiteFormStatus) {
    if ($(".QueryForm").length == 0) {//查詢室窗不記錄cookie
        $.cookie("btnAction", "Y");
        $.cookie("EventID", p_EventID);
        $.cookie("FieldID", p_FieldID);
        $.cookie("EventActionType", p_EventActionType);
        $.cookie("Scroll", "");
        $.cookie("TRsel", "");
        $.cookie("SiteFormStatus", p_SiteFormStatus);
    }
}


var g_Expan = "/KF_Web/Img/Exp.png";
var g_Colla = "/KF_Web/Img/Col.png";
function GridBind(p_Employee, p_Result, p_FieldID, p_EventID, p_EventActionType, p_PageIndex, p_CallBack) {
    var m_GridData = p_Result.ResultEntity;
    var m_GridKey = p_Result.GridKey.split(';')[0];
   //Grid控制項
    var m_GridCtrl = "";
    if (p_Result.GridKey.split(',').length = 2) {
        m_GridCtrl = p_Result.GridKey.split(';')[1];
    }

    if (m_GridData[1].Table.length != 0) {
        if (p_PageIndex==undefined) {
            $("#PageInfo" + p_FieldID).removeAttr('OrderBy');
        }
        var m_TotalCount = m_GridData[0];
        var m_TotalPage = m_GridData[2];
        var m_PageSize = m_GridData[3];
        var m_GroupBy = "";
        if (m_GridData[4] != undefined && m_GridData[4] != 'undefined') {
            m_GroupBy = m_GridData[4];
        }
        var m_DataColumn = new Array;
        var DataEntity = m_GridData[1].Table[0];

        $.each(DataEntity, function (key, value) {
            m_DataColumn.push(key)
        });

       
       

        var m_Result = new Object;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: g_Page+"/GetLanguage",
            data: JSON.stringify({ "p_Employee": p_Employee, "p_Language": $('#selLanguage').val(), "p_Keys": m_DataColumn }),
            dataType: "json",
            success: function (Result) {
                if (Result.d != null) {
                    if (Result.d.isSuccess) {
                        var m_tarnLang = Result.d.ResultEntity;
                        GeneratorTable(m_tarnLang, m_GridData[1], p_FieldID, p_EventID, p_EventActionType, p_PageIndex, m_TotalCount, m_TotalPage, m_PageSize, m_GroupBy, m_GridKey, m_GridCtrl, p_CallBack);
                        if ($("#imgQIco").length != 0) {
                            QueryIcoCtrl($("#imgQIco"), "up", p_FieldID);
                        }
                        if ($.cookie("FieldID") != null) {
                            setTimeout("SetGridScroll(\"" + $.cookie("FieldID").toString() + "\",\"" + $.cookie("Scroll") + "\");", 500);
                        }
                       
                    }
                    else {
                        alert(Result.d.LogMessage);
                    }
                }
                return m_Result;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);
            }
        });
    }
    else {
        if ($("#" + p_FieldID + "scroll").length != 0) {
            $("#" + p_FieldID + "scroll").html("");
        }
        $("#PageCtrl" + p_FieldID).html("");
        if ($("#MaintainForm").length == 0) {
            ShowMessage("MSG00001");

        }
    }
}
function setPageInfo(p_ColumnOrder, p_FieldID, p_GroupBy) {
    var m_OrderByMark = p_ColumnOrder;
    var m_OrderByType = "asc";
    if (CheckAttr($("#PageInfo" + p_FieldID), 'OrderBy')) {
        m_OrderByMark = $("#PageInfo" + p_FieldID).attr('OrderBy').split(' ')[0];
        if (m_OrderByMark == p_ColumnOrder) {
            if ($("#PageInfo" + p_FieldID).attr('OrderBy').split(' ')[1] == "asc") {
                m_OrderByType = "desc";
            }
            else {
                m_OrderByType = "asc";
            }
        }
        else {
            m_OrderByType = m_OrderByType;
        }
    }
    $("#PageInfo" + p_FieldID).attr('OrderBy', p_ColumnOrder + ' ' + m_OrderByType);

    if (p_GroupBy != "") {
        $("#PageInfo" + p_FieldID).attr('GroupBy', p_GroupBy);
    }

   
}



function CheckAllGridChkBox(p_event, p_ChkID, p_SumColumn, p_FieldID) {
    var m_isCheck = p_event.checked;

    //$("input[id^='dtl" + p_ChkID + "']").prop("checked", m_isCheck);
    $.each($("input[id^='dtl" + p_ChkID + "']"), function (key, Item) {
        if ($(Item).prop("disabled")) {
            $(Item).prop("checked", false);
        }
        else {
            $(Item).prop("checked", m_isCheck);
        
        }
    });
    if (p_SumColumn != "") {
        onCheckEvent(p_SumColumn, p_FieldID);
    }
}
function GeneratorTable(p_ColumnData, p_EntityData, p_FieldID, p_EventID, p_EventActionType, p_PageIndex, p_TotalCount, p_TotalPage, p_PageSize, p_GroupBy, p_GridKey, p_GridCtrl, p_CallBack) {
    var m_PageIndex = "1";
    if (p_PageIndex != "" && p_PageIndex != undefined) {
        m_PageIndex = p_PageIndex;
    }
    var m_OrderByMark = "";
    var m_OrderByType = "";
    if ($("#PageInfo" + p_FieldID).length != 0) {
        if (CheckAttr($("#PageInfo" + p_FieldID), 'OrderBy')) {
            m_OrderByMark = $("#PageInfo" + p_FieldID).attr('OrderBy').split(' ')[0];
            m_OrderByType = $("#PageInfo" + p_FieldID).attr('OrderBy').split(' ')[1];
        }
        if (CheckAttr($("#PageInfo" + p_FieldID), 'GroupBy')) {
            p_GroupBy = $("#PageInfo" + p_FieldID).attr('GroupBy');
        }
    }
    var m_ControlRef = $("#btn" + p_FieldID).attr("ControlRef");


    var m_RefWidth = "";
    var m_SumColumn = "";

        //Grid寬度設定
        if (m_ControlRef.split(';').length == 0) {
            alert("Please check ControlRef setting!");
        }
        if (m_ControlRef.split(';').length == 1) {
            m_RefWidth = m_ControlRef.split(';')[0].split(",");
        }
        if (m_ControlRef.split(';').length == 2) {
            m_RefWidth = m_ControlRef.split(';')[0].split(",");
            m_SumColumn = m_ControlRef.split(';')[1];
        }

    if (p_FieldID == "BatchSearch") {
        m_ControlRef = $("#btn" + p_FieldID).attr("ControlRef").split(';')[0]; ;
    }


    var p_arrGroupBy = "";
    if (p_GroupBy != "") {
        p_arrGroupBy = p_GroupBy.split(',');
    }
    var m_Display = "";
    var m_IsQueryForm = false;
    var m_QueryFormTH = "";
    if ($("#QueryFormCtrl").length != 0) {
        m_IsQueryForm = true;
        if ($("#hidControlRef").val() != "") {
            m_QueryFormTH = "<th class='RtnIco' >&nbsp;</th>";
        }
    }
    //var m_HeadTable = "<table class='tabGridHead table table-striped' GridKey='" + p_GridKey + "'  style='width:100%' id='tab" + p_FieldID + "'><tr >";
    var m_HeadTable = "<div class='scroll divGridHead'><table class='tabGridHead table table-striped' GridKey='" + p_GridKey + "' id='tab" + p_FieldID + "'><tr >";
    var m_Table_TH = "";
    var m_ColIndex = 0;

    var m_TH_ChkBox = "";
    if (p_GridCtrl != "") {
        if (p_GridCtrl == "checkbox") {
            m_TH_ChkBox = "<th style='width:10px'><input id='chk" + p_FieldID + "All' onclick='CheckAllGridChkBox(this,\"" + "chk" + p_FieldID + "\",\"" + m_SumColumn + "\",\"" + p_FieldID + "\")' type='checkbox' /></th>";
        }
    }
    $.each(p_ColumnData, function (key, value) {
        var m_GroupClass = "";
        var m_NextOrderBy = "";
        var m_OrderByImg = "";
        if (m_OrderByMark == key) {
            m_OrderByImg = "<img id='img" + p_FieldID + "' src='/KF_Web/Img/" + m_OrderByType + ".png' alt=''>";
            if (m_OrderByType == "asc") {
                m_NextOrderBy = " desc";
            }
            else if (m_OrderByType == "desc") {
                m_NextOrderBy = " asc";
            }
        }
        else {
            m_OrderByImg = "";
        }
        var m_cursor = " cursor:pointer; ";

        if (m_RefWidth[m_ColIndex] == "0") {
            m_Display = "display:none;";
        }
        else {
            m_Display = "";
        }
        var m_THStyle = "style='" + m_cursor + " width:" + m_RefWidth[m_ColIndex] + "%;" + m_Display + "'";
        var m_OrderBy = { "OrderBy": key + m_NextOrderBy };
        if (p_GroupBy != "") {
            m_OrderBy["GroupBy"] = p_GroupBy;
        }
        var m_click = " onclick ='ActionModel(\"" + p_EventID + "\", \"" + p_FieldID + "\", \"" + p_EventActionType + "\", \"1\", " + JSON.stringify(m_OrderBy) + ",\"\",\"Y\");setPageInfo(\"" + key + "\",\"" + p_FieldID + "\",\"" + p_GroupBy + "\")'";
        if (p_GroupBy != "") {
            $.each(p_arrGroupBy, function (m_Index, m_GroupBy) {
                if (m_GroupBy == key) {

                }
                else {
                    m_cursor = "";
                    m_click = "";
                }
            });
        }
        m_Table_TH += "<th id='th" + p_FieldID + key + "' " + m_THStyle + " " + m_click + " >";
        var m_ThLab = " <label style='" + m_cursor + "' id='thlbl" + key + "'>" + value + "</label>" + m_OrderByImg;
        m_Table_TH += m_ThLab + "</th>";
        m_ColIndex++;
    });
    //  m_HeadTable += m_TH_ChkBox + m_QueryFormTH + m_Table_TH + " </tr></table>";
    m_HeadTable += m_TH_ChkBox + m_QueryFormTH + m_Table_TH + " </tr></table></div>";
    var m_Div = "<div class='scroll divGridBody' id='" + p_FieldID + "scroll' style='height:420px;'>";
   
    var m_DataTable = "<table class='tabGridBody table table-striped table-hover' id='tabGridBody" + p_FieldID + "'  > ";
    var m_Table_TD = "";
    var m_Table_AllTR = "";
    var m_RowIndex = 1;
    var m_PageCount = p_EntityData.Table.length;
    var m_GroupByRowIndex = new Object;
    var m_OriginGroupValue = new Object;
    var m_GroupByColspan = new Array;

    var m_TD_ChkBox = "";
    var m_SumEvent = "";
    var m_TD_ChkBoxReadOnly = " {0} ";
   
    if (m_SumColumn != "") {
        m_SumEvent = " onclick='onCheckEvent(\"" + m_SumColumn + "\",\"" + p_FieldID + "\")' ";
    }
    var m_dtlCheck = "<td style='width:10px;'><input id='dtlchk" + p_FieldID + "' " + m_SumEvent + " "+m_TD_ChkBoxReadOnly+" value='' class='ChkGrid' type='checkbox' /></td>"
    if (p_GridCtrl != "") {
        if (p_GridCtrl == "checkbox") {
            m_TD_ChkBox = m_dtlCheck;
         }
    }
   

    $.each(p_arrGroupBy, function (m_Index, m_GroupBy) {
        m_OriginGroupValue[m_GroupBy] = "";
        m_GroupByRowIndex[m_GroupBy] = 1;
        m_GroupByColspan[m_GroupBy] = (m_ColIndex - (m_Index + 1));
    });
    var m_GroupByALLCount = 1;
    var m_GroupBySingTable = "";
    var m_GroupByAllTable = "";
    $.each(p_EntityData.Table, function (key, value) {
        var m_GroupByTable = "";
        var m_GroupByTableTR = "";
        var m_TrClass = "";
        if (m_RowIndex % 2 == 1) {
            m_TrClass = "class='even'"
        }
        else {
            m_TrClass = "class='odd'"
        }
        var m_RowValue = value;
        var m_Table_TR = "<tr " + m_TrClass + " fieldid='" + p_FieldID + "'  id='tr" + p_FieldID + m_RowIndex.toString() + "' ondblclick='GridOndblclick()'  onClick='GridBodyClick(this.id,\"" + p_FieldID + "\",\"tabGridBody\")'>";
        m_Table_TD = "";
        m_ColIndex = 0;
        var m_GroupByCount = 0;
        var m_GroupValue = "";
        var m_GroupByTables = "";
        var m_QueryFormValue = {};
        var m_QueryFormControlRef = "";
        if (m_IsQueryForm) {
            if ($("#hidControlRef").val() != "") {
                m_QueryFormControlRef = $("#hidControlRef").val().split(',');
            }
            else {
                //alert("ControlRef is Null!!");
            }
        }
        m_ColIndex = 0;
        $.each(p_ColumnData, function (key1, value1) {
            $.each(p_arrGroupBy, function (m_Index, m_GroupBy) {
                if (key1 == m_GroupBy) {
                    var m_Value = m_RowValue[key1].toString();
                    for (var m_Count = 1; (m_GroupByCount + 1) >= m_Count; m_Count++) {
                        m_GroupValue += ReplaceSymbol(m_RowValue[p_arrGroupBy[m_Count - 1]]).toString();
                    }
                    m_GroupByTables += GroupByGrid(p_arrGroupBy, m_OriginGroupValue, m_GroupValue, m_Value, m_GroupBy, p_FieldID, m_RefWidth, m_GroupByCount, m_GroupByColspan, m_GroupByALLCount);
                    m_OriginGroupValue[key1] = m_GroupValue;
                    m_GroupByCount++;
                    m_GroupByALLCount++;
                }
            });
            if (m_RefWidth[m_ColIndex] == "0") {
                m_Display = "display:none;";
            }
            else {
                m_Display = "";
            }
            var m_Content = "";
            var m_OverContent = "";
            var m_OverTD = "";
            var m_isOverWord = false;
            if (m_RowValue[key1] != null) {
                if ($.inArray(key1, m_QueryFormControlRef) != -1) {
                    m_QueryFormValue[key1] = m_RowValue[key1].toString();
                }
                var CurrentTD = "<td FieldID='" + key1 + "' style='width:" + m_RefWidth[m_ColIndex] + "%;" + m_Display + "'>";
                m_Content = m_RowValue[key1].toString();

                if (m_ColIndex == 0 && m_TD_ChkBox != "") {
                    if (m_RowValue.CurrentSign != undefined || m_RowValue.CurrentSign == null) {
                        var m_TdValue = "";
                        if (m_RowValue.CurrentSign != null) {
                            m_TdValue = m_RowValue.CurrentSign.trim()
                        }
                     
                        m_TD_ChkBox = String.format(m_TD_ChkBox, "");

                    }
                    CurrentTD = m_TD_ChkBox.replace("value=''", "value='" + m_RowValue[p_GridKey].toString()  + "'").replace("id='dtlchk" + p_FieldID + "'", "id='dtlchk" + p_FieldID + m_RowIndex.toString() + "'") + CurrentTD;
                }


                if (m_RowValue[key1].toString().length >= 50) {
                    if (m_Display == "") {
                        m_OverContent = m_RowValue[key1].toString().substr(0, 50) + '...';
                        m_OverContent += "";
                        m_OverTD = "<td title='" + m_Content + "' omit='Y' FieldID='display" + key1 + "' style='width:" + m_RefWidth[m_ColIndex] + "%;'>" + m_OverContent + "</td>";
                        CurrentTD = "<td FieldID='" + key1 + "' style='width:" + m_RefWidth[m_ColIndex] + "%;display:none;'>";
                    }

                }

                if (p_GroupBy != "") {
                    if (p_arrGroupBy[m_ColIndex] == key1) {
                        CurrentTD += m_Content + "</td>";
                    }
                    else {
                        CurrentTD += m_Content + "</td>"; ;
                    }
                }
                else {
                    CurrentTD += m_Content + "</td>"; ;
                }


                m_Table_TD += CurrentTD + m_OverTD;
            }
            else {
                m_Table_TD += "<td  FieldID='" + key1 + "' style='width:" + m_RefWidth[m_ColIndex] + "%;" + m_Display + "'>&nbsp;</td>";
            }


            m_ColIndex++;
            if (p_GroupBy != "") {
                if (m_ColIndex == p_arrGroupBy.length) {
                    if (m_GroupBySingTable == "") {
                        if (m_GroupByTables != "") {
                            m_GroupBySingTable = m_GroupByTables;
                            m_GroupByTables = "";
                        }
                    }
                    else {
                        if (m_GroupByTables != "") {
                            if (m_GroupBySingTable.indexOf("<table") != 0) {
                                var m_TableID = p_FieldID + "GroupBy";
                                m_TableID += $($($(m_Table_AllTR)[0].innerHTML)[0]).attr('FieldID') + ReplaceSymbol($($($(m_Table_AllTR)[0].innerHTML)[0]).text());
                                m_GroupBySingTable = "<table class='GroupGridBody table  table-hover' id='" + m_TableID + "' style='width:100%' >" + m_GroupBySingTable;
                            }
                            m_GroupByAllTable += m_GroupBySingTable + m_Table_AllTR + "</table>";
                            m_GroupBySingTable = m_GroupByTables;
                            m_GroupByTables = "";
                            m_Table_AllTR = "";
                        }
                    }
                }

            }
        });
        //if(m_IsQueryForm){
        if (m_IsQueryForm && m_TD_ChkBox == "") {      
            var m_GetDataImg = " <i class='fa fa-reply hand' aria-hidden='true'  onclick='SetValueToOpener(" + JSON.stringify(m_QueryFormValue) + ")' alt='GetData'></i>";
            if ($("#hidControlRef").val() != "") {
                m_Table_TD = "<td class='RtnIco'>" + m_GetDataImg + "</td>" + m_Table_TD;
            }
        }
        m_Table_AllTR += m_Table_TR += m_Table_TD + "</tr>";
        if (m_RowIndex == p_EntityData.Table.length) {
            if (m_GroupBySingTable.indexOf("<table") != 0) {
                var m_TableID = p_FieldID + "GroupBy";
                m_TableID += $($($(m_Table_AllTR)[0].innerHTML)[0]).attr('FieldID') + ReplaceSymbol($($($(m_Table_AllTR)[0].innerHTML)[0]).text());

                m_GroupBySingTable = "<table class='GroupGridBody table  table-hover' id='" + m_TableID + "' style='width:100%' >" + m_GroupBySingTable;
            }

            m_GroupByAllTable += m_GroupBySingTable + m_Table_AllTR + "</table>";
        }
        m_RowIndex++;
    });

    if (p_TotalCount < m_PageCount) {
        m_PageCount = p_TotalCount;
    }
    var m_PageCtrlHtml = PageCtrl(p_EventID, p_FieldID, p_EventActionType, m_PageIndex, p_TotalCount, p_TotalPage, p_PageSize, m_PageCount, p_GroupBy);

    if (p_GroupBy != "") {
        m_Div = m_Div + m_GroupByAllTable + "</table></div>" + m_PageCtrlHtml;
    }
    else {
        m_Div = m_Div + m_DataTable + m_Table_AllTR + "</table></div>" + m_PageCtrlHtml;
    }

    $("#divGridArea").html(m_HeadTable + m_Div);
    if ($(".QueryForm").length != 0) {
        if ($(".scroll").length != 0) {
            $(".scroll").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });
        
        }
    }
    if (p_CallBack != "" && p_CallBack != undefined ) {
        setTimeout('GridCallBack();', 300);
    }
}

function ReplaceSymbol(p_String) {
    var m_Symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "}", "[", "]", "|", "\\", ";", ":", "'", "\"", "<", ">", ",", ".", "?", "/", " "];
    $.each(m_Symbols, function (m_Index, m_Symbol) {
        p_String = (p_String).replaceAll(m_Symbol, '');
    });
    return p_String;
}
function GroupByGrid(p_arrGroupBy, p_OriginGroupValue, p_GroupValue, p_Value, p_GroupBy, p_FieldID, p_RefWidth, p_GroupByCount, p_GroupByColspan, p_GroupByALLCount) {
    var m_GroupByTable = "";
    var m_GroupTableID = "";
    if (p_GroupByCount == 0) {
        m_GroupTableID = p_FieldID + "GroupBy" + p_GroupBy + ReplaceSymbol(p_Value);
    }
    else {
        var m_GroupIDValue = "";
        for (var m_Count = 1; (p_GroupByCount + 1) >= m_Count; m_Count++) {
            var m_Ovalue = p_OriginGroupValue[p_arrGroupBy[m_Count - 1]];
            if (m_Ovalue == "") {
                m_Ovalue = p_Value;
            }
            m_GroupIDValue += p_arrGroupBy[m_Count - 1] + ReplaceSymbol(m_Ovalue);
        }
        m_GroupTableID = p_FieldID + "GroupBy" + ReplaceSymbol(m_GroupIDValue);
    }
    p_GroupValue = ReplaceSymbol(p_GroupValue);
    var m_TDHtml = "<td>&nbsp;</td>";
    var m_TDHtmls = "";
    for (var m_Count = 1; (p_GroupByCount + 1) > m_Count; m_Count++) {
        m_TDHtmls += "<td style='width:" + p_RefWidth[m_Count-1] + "%'>&nbsp;</td>";
    }
    var m_imgGroupBy = "";
    if (p_OriginGroupValue[p_GroupBy] != p_GroupValue) {
        if (p_GroupByCount == 0) {
            m_GroupByTable += "<table class='GroupGridBody table  table-hover' id='Head" + m_GroupTableID + "' style='width:100%' >";
        }
        m_tabGridBodyStyle = "style='width:100%;'";
        m_imgGroupBy = "<img class='hand' onClick='GroupByClick(this,\"" + m_GroupTableID + "\");' id='imgGroupBy" + m_GroupTableID + "' src='" + g_Colla + "' alt='-'>";
        m_GroupByTable += "<tr style='' onClick='GridBodyClick(this.id,\"" + p_FieldID + "\",\"GroupGridBody\")'>";
        m_GroupByTable += m_TDHtmls + "<td id='td" + m_GroupTableID + "' style='width:" + p_RefWidth[p_GroupByCount] + "%' >&nbsp;" + m_imgGroupBy + p_Value + "</td><td colspan='" + p_GroupByColspan[p_GroupBy] + "'>&nbsp;</td></tr></table>";
        m_GroupByTable += "<table class='tabGridBody table  table-hover' id='" + m_GroupTableID + "' " + m_tabGridBodyStyle + " > ";
    }
    return m_GroupByTable;
}

function GroupByClick(p_Event, p_GroupByTableID) {
    if ($(p_Event).attr("src").indexOf("Exp.png") != -1) {
        $("Table[id='" + p_GroupByTableID + "']").show('fast');
        $("img[id='" + p_Event.id + "']").attr("src", g_Colla)
    }
    else {
        $("Table[id='" + p_GroupByTableID + "']").hide('fast');
        $("img[id='" + p_Event.id + "']").attr("src", g_Expan)
    }
}

function PageCtrl(p_EventID, p_FieldID, p_EventActionType, p_PageIndex, p_TotalCount, p_TotalPage, p_PageSize, p_PageCount, p_GroupBy) {
    var m_PageStart = "";
    var m_PageEnd = "";
    var m_PageRange = "";
    if (p_PageIndex == "1") {
        m_PageStart = "1";
        m_PageEnd = p_PageSize;
    }
    else {
        m_PageStart = ((parseInt(p_PageIndex) - 1) * parseInt(p_PageSize) + 1).toString();
        m_PageEnd =  parseInt(p_PageIndex) * parseInt(p_PageSize);
    }
    if (p_TotalPage == p_PageIndex) {
        m_PageEnd = ((parseInt(p_PageIndex) - 1) * parseInt(p_PageSize)  + parseInt(p_PageCount)).toString();
    }
    if (p_TotalCount < m_PageEnd) {
        m_PageEnd = p_TotalCount;
    }
    m_PageRange = m_PageStart + "～" + m_PageEnd;
    var m_PageHtml = "";
    var m_DefPageCount = 5;
   
    if (parseInt(p_TotalPage) < 5) {
        m_DefPageCount = parseInt(p_TotalPage);
    }
    var m_StartPage = 1;
    var m_EndPage = m_DefPageCount;

    var m_DisCount =  parseInt(p_PageIndex);
    if (m_DisCount < 3) {
        m_StartPage = 1;
        m_EndPage = m_DefPageCount;
    }
    else {
        m_StartPage = 1 + (parseInt(p_PageIndex) - 3);
        m_EndPage = m_DefPageCount + (parseInt(p_PageIndex) - 3);
        if (parseInt(p_TotalPage) - parseInt(m_EndPage) <= 0) {
            m_StartPage = parseInt(m_StartPage) - (parseInt(m_EndPage) - parseInt(p_TotalPage));
            m_EndPage = p_TotalPage;
        }
    }
    for (m_StartPage; m_StartPage <= m_EndPage; m_StartPage++) {
        if (p_PageIndex == m_StartPage) {
            var m_PageInfo = "";
            if (CheckAttr($("#PageInfo" + p_FieldID), 'OrderBy')) {
                m_PageInfo = " OrderBy='" + $("#PageInfo" + p_FieldID).attr('OrderBy') + "' ";
                m_PageInfo += " GroupBy='" + $("#PageInfo" + p_FieldID).attr('GroupBy') + "' ";
            }
            m_PageHtml += "<li id='PageInfo" + p_FieldID + "' " + m_PageInfo + "><a class='PageIndex' >" + m_StartPage + "</a></li>";
        }
        else {
            m_PageHtml += "<li><a  class='PageCtrl' onclick='GoToPage(\"" + p_EventID + "\",\"" + p_FieldID + "\",\"" + p_EventActionType + "\",\"" + m_StartPage + "\")' >" + m_StartPage + "</a></li>";
        }
    }

    var m_ExpanGroup = "<img class='hand' onClick='ExpanAll(\""+ p_GroupBy + "\",\"" + p_FieldID + "\");' src='" + g_Expan + "' alt='+'>";
    var m_CollaGroup = "<img class='hand' onClick='CollaAll(\"" + p_GroupBy + "\",\"" + p_FieldID + "\");' src='" + g_Colla + "' alt='-'>";
    var m_Html = " <div class='dt-panelfooter clearfix'><div class='dataTables_info' id='datatable_info' role='status' aria-live='polite'></div>"
    if (p_GroupBy != "") {
        m_Html += "<div class='pull-left dataTables_paginate paging_simple_numbers' id='PageCtrlLeft" + p_FieldID + "'><ul class='pagination' style='margin: 2px 0px; white-space: nowrap;'><li>" + m_ExpanGroup + "</li><li>" + m_CollaGroup + "</li></ul><span class='GridMSG' id='GridMSG" + p_FieldID + "' ></span></div>";
    }
    m_Html += "<div class='pull-right dataTables_paginate paging_simple_numbers' id='PageCtrl" + p_FieldID + "'>";
    m_Html += "<ul class='pagination' style='margin: 2px 0px; white-space: nowrap;'>";
    m_Html += " <li><a id='lblPagePrev' class='PageCtrl' onclick='PagePrev(\"" + p_EventID + "\",\"" + p_FieldID + "\",\"" + p_EventActionType + "\",\"" + p_PageIndex + "\")'>«</a></li>";
    m_Html +=  m_PageHtml;
    m_Html += " <li><a id='lblPageNext' class='PageCtrl' onclick='PageNext(\"" + p_EventID + "\",\"" + p_FieldID + "\",\"" + p_EventActionType + "\",\"" + p_PageIndex + "\",\"" + p_TotalPage + "\")'>»</a></li><li style='display: inline;font-weight:bold'><a style='background-color:#E0E0E0 !important'>" + m_PageRange + "&nbsp;/&nbsp;" + p_TotalCount + "&nbsp;&nbsp;&nbsp;" + p_PageIndex + "/" + p_TotalPage + "</a></li> </ul>";
    m_Html += " </div> </div></div>";
    return m_Html;
}

function CheckAttr(p_Object,p_Attr) {

    if (p_Object.length!=0) {
        if (p_Object.attr(p_Attr) != undefined && p_Object.attr(p_Attr) != "undefined") {
            return true;
        }
    }
    return false;
}

function ExpanAll(p_GroupTable, p_FieldID) {
    $.each(p_GroupTable.split(','), function (key, value) {
        var m_GroupID = p_FieldID + "GroupBy" + value;
        $("Table[id^='" + m_GroupID + "']").show('fast');
    });
    $.each($("img[id^='imgGroupBy" + p_FieldID + "']"), function (key, value) {
        $("#" + value.id).attr("src", g_Colla)
    });
}

function CollaAll(p_GroupTable, p_FieldID) {
    $.each(p_GroupTable.split(','), function (key, value) {
        var m_GroupID = p_FieldID + "GroupBy" + value;
        $("Table[id^='" + m_GroupID + "']").hide('fast');
    });
    $.each($("img[id^='imgGroupBy" + p_FieldID + "']"), function (key, value) {
        $("#" + value.id).attr("src", g_Expan)
    });
}

function GetCurrentOrderBy(p_FieldID) {
    var m_OrderByMark = "";
    var m_OrderByType = "";
    if (CheckAttr($("#PageInfo" + p_FieldID), 'OrderBy')) {
        m_OrderByMark = $("#PageInfo" + p_FieldID).attr('OrderBy').split(' ')[0];
        m_OrderByType = $("#PageInfo" + p_FieldID).attr('OrderBy').split(' ')[1];
    }
    return m_OrderByMark + " " + m_OrderByType;
}
function GoToPage(p_EventID, p_FieldID, p_EventActionType, p_GoToPage, p_SiteFormStatus) {
    var m_CurrentOrderBy = GetCurrentOrderBy(p_FieldID);
    var m_PageInfo = { "OrderBy": m_CurrentOrderBy };
    if (CheckAttr($("#PageInfo" + p_FieldID), 'GroupBy')) {
        m_PageInfo["GroupBy"] = $("#PageInfo" + p_FieldID).attr('GroupBy');
    }
    if (m_CurrentOrderBy.toString().trim() != "") {
        ActionModel(p_EventID, p_FieldID, p_EventActionType, p_GoToPage, m_PageInfo, p_SiteFormStatus);
    }
    else {
        ActionModel(p_EventID, p_FieldID, p_EventActionType, p_GoToPage, "", p_SiteFormStatus);
    }
   

}

function PagePrev(p_EventID, p_FieldID, p_EventActionType, p_PageIndex) {
    var m_PageIndex = "1";
    if (p_PageIndex == "1") {
    }
    else {
        var m_CurrentOrderBy = GetCurrentOrderBy(p_FieldID);
        var m_PageInfo = { "OrderBy": m_CurrentOrderBy };
        if (CheckAttr($("#PageInfo" + p_FieldID), 'GroupBy')) {
            m_PageInfo["GroupBy"] = $("#PageInfo" + p_FieldID).attr('GroupBy');
        }
        m_PageIndex = (parseInt(p_PageIndex) - 1).toString();
        if (m_CurrentOrderBy.toString().trim() != "") {

            ActionModel(p_EventID, p_FieldID, p_EventActionType, parseInt(p_PageIndex) - 1, m_PageInfo);
        }
        else {
            ActionModel(p_EventID, p_FieldID, p_EventActionType, parseInt(p_PageIndex) - 1);
        }
    }
}

function PageNext(p_EventID, p_FieldID, p_EventActionType, p_PageIndex, p_TotalPage) {
    if (p_PageIndex != p_TotalPage) {
        ActionModel(p_EventID, p_FieldID, p_EventActionType, parseInt(p_PageIndex) + 1);
    }
}

function GridBodyClick(p_ID, p_FieldID,p_Type) {
    GridRowColorCtrl(p_Type );
    var m_Sel = $("#" + p_ID).attr("class", "Sel");

    if ($("#hidIsMobile").length != 0) {
        if ($("#hidIsMobile").val() == "Y") {
            GridOndblclick();
         } 
    }
}




function GridOndblclick() {
    if ($("#QbtnQuery").length != 0) {
        OpenMaintain($("#QbtnQuery").attr("EventID"), $("#QbtnQuery").attr("FieldID"), $("#QbtnQuery").attr("EventActionType"), $("#QbtnQuery").attr("LanguageValue"), $("#QbtnQuery").attr("QueryMethod"), $("#QbtnQuery").attr("EventFollow"));
    }
    if ($("#hidOpenFun").length != 0)
    {
        funMaintain[$("#hidOpenFun").val()]($("#hidOpenParam").val());
    }
    

}

function GridRowColorCtrl(p_Id) {
    var m_Ood = $("." + p_Id + " tr:odd");
    var m_Even = $("." + p_Id + " tr:even");
    $.each(m_Ood, function (key, value) {
        $(value).attr("class", "even");
    });
    $.each(m_Even, function (key, value) {
        $(value).attr("class", "odd");
    });
}


function onCheckEvent(p_SumColumn, p_FieldID) {

    var m_CheckedItem = $("input:checked[id^='dtlchk" + p_FieldID + "']");
    if (m_CheckedItem.length != 0) {
        var m_FormulaEntitys = Array();
        var m_Employee = GetEmployeeInfo();
        $.each(p_SumColumn.split(','), function (key, value) {
            var m_FormulaEntity = {};
            m_FormulaEntity["ColumnName"] = value.split('-')[0];
            m_FormulaEntity["Formula"] = value.split('-')[1];
            var m_Values = Array();

            $.each($(m_CheckedItem).closest('tr').find('td'), function (index, td) {
                if ($(td).attr("fieldid") == m_FormulaEntity["ColumnName"]) {
                    m_Values.push($(td).text());
                }
            });
            m_FormulaEntity["Values"] = m_Values;
            m_FormulaEntitys.push(m_FormulaEntity);
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: g_Page+"/CustFormula",
            data: JSON.stringify({ "p_Employee": m_Employee, "p_FormulaEntity": m_FormulaEntitys }),
            dataType: "json",
            success: function (Result) {
                if (Result.d != null) {
                    if (Result.d.isSuccess) {
                        var m_GridMSG = Result.d.ResultEntity;
                        if (m_GridMSG != "") {
                            m_GridMSG = String.format(m_GridMSG, m_CheckedItem.length);
                            $("#GridMSG" + p_FieldID).text(m_GridMSG);
                        }
                        
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
    else {
        $("#GridMSG" + p_FieldID).text("");
    
    }
}


function refTitleGrid(p_event, p_TargetID) {

    var m_EventID = $(p_event).attr("QueryMethod");
    var m_TableKey = $(p_event).attr("TableKey");

    var m_TableColumn = $(p_event).attr("TableColumn");
    var m_TableWidth = $(p_event).attr("TableWidth");
    var m_Params = {};

    $.each(m_TableKey.split(','), function (Index, Param) {
        var m_ParamValue = GetCtrlValue(Param);
        m_Params[Param] = m_ParamValue;
    });

    var m_Employee = GetEmployeeInfo();

    $('.gd' + p_TargetID).block({
        message: '<img src="/KF_Web/Img/loading.gif" /><H1>Processing...</H1>',
        showOverlay: false,
        centerY: false,
        css: {
            top: '10%',
            opacity: .7
        }
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page+"/ExecuteEventSetting",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_EventID": m_EventID, "p_Params": m_Params }),
        async: false,
        dataType: "json",
        success: function (Result) {
            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    if ($("#tb" + p_TargetID).length != 0) {

                        $("#tb" + p_TargetID).attr("data", JSON.stringify(Result.d.ResultEntity.Table));
                        TitleGridPageCtrl(p_TargetID, m_TableColumn, m_TableWidth, "1");
                        setTimeout(" $('.gd" + p_TargetID + "').unblock();", 500);
                    }
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




function TitleGridPrev(p_TargerID, p_TableColumn, p_TableWidth) {
    var m_pageindex = "";
    if ($("#PageInfo" + p_TargerID).length != 0) {
        if ($("#PageInfo" + p_TargerID).attr("pageindex") != 1) {
            m_pageindex = parseInt($("#PageInfo" + p_TargerID).attr("pageindex") - 1).toString();
            TitleGridPageCtrl(p_TargerID, p_TableColumn, p_TableWidth, m_pageindex);
        }
    }
}

function TitleGridNext(p_TargerID, p_TableColumn, p_TableWidth) {
    var m_pageindex = 0;
    if ($("#PageInfo" + p_TargerID).length != 0) {

        m_pageindex = parseInt($("#PageInfo" + p_TargerID).attr("pageindex")) + 1;

        if ($("#GridCount" + p_TargerID).length != 0) {

            var m_TotalCount = parseInt($("#GridCount" + p_TargerID).html());
            if (((m_pageindex-1) * 50) < m_TotalCount) {
                TitleGridPageCtrl(p_TargerID, p_TableColumn, p_TableWidth, m_pageindex);
            }
        }
    }
}

function TitleGridPageCtrl(p_TargerID, p_TableColumn, p_TableWidth, p_Page) {
    var m_Data = $("#tb" + p_TargerID);
    var m_PageFrom = (((p_Page - 1) * 50) + 1).toString();
    var m_PageTo = (((p_Page) * 50)).toString();
    var m_TableWidths = p_TableWidth.split(',');
    if (m_Data.length != 0) {

        var m_TotalCount = parseInt($("#GridCount" + p_TargerID).html());
        if (parseInt(m_PageTo) > parseInt(m_TotalCount)) {
            m_PageTo = m_TotalCount;
        }
        var m_JSON = jQuery.parseJSON(m_Data.attr("data")).slice(parseInt(m_PageFrom-1), parseInt(m_PageTo));
        $("#tb" + p_TargerID).empty();
        var m_ALL_TR = "";
        $.each(m_JSON, function (RowIndex, Row) {
            var m_TR = "<tr>{0}</tr>";
            var m_ColIndex = 0;
            var m_All_TD = "";
            $.each(p_TableColumn.split(','), function (PropIndex, Prop) {
                var m_TD = "<td {0}>{1}</td>";
                m_All_TD += String.format(m_TD, "style='width:" + m_TableWidths[m_ColIndex] + "%'", Row[Prop]);
                m_ColIndex++;
            });
            m_ALL_TR += String.format(m_TR, m_All_TD);
        });
        $("#tb" + p_TargerID).html(m_ALL_TR);
    }
    var m_PageInfo = $("#PageInfo" + p_TargerID);
    if (m_PageInfo.length != 0) {
        $("#PageInfo" + p_TargerID).attr("pageindex", p_Page);
        $("#PageInfo" + p_TargerID).html(m_PageFrom + " ～ " + m_PageTo+" ");
    }
}