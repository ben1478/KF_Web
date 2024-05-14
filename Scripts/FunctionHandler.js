(function ($) {
    jQuery.fn.setfocus = function () {
        return this.each(function () {
            var dom = this;
            setTimeout(function () {
                try {
                    dom.focus();
                    dom.select();
                } catch (e) { }
            }, 0);
        });
    };
})(jQuery);
var CountDownIndex =30000;
var intCountDown = CountDownIndex;
var g_isCheck = true;
var countdownnumber;
var g_arrOpenWindows = [];
///KF_Web/Img/loading.gif
var g_Page = "/KF_Web/GeneratorWeb.aspx";




$(function () {


    if ($(".scroll").length != 0) {
        $(".scroll").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });
    }
    if ($("#hidIsMobile").length != 0) {
        if ($("#hidIsMobile").val() == "Y") {
            $(".timeout").css("min-width", "680px")
        }
    }
    
    if ($(".QueryForm").length == 0) {//查詢室窗不清除cookie
        $.cookie("btnAction", null);
        $.cookie("EventID", null);
        $.cookie("FieldID", null);
        $.cookie("EventActionType", null);
        $.cookie("Scroll", null);
        $.cookie("TRsel", null);
        $.cookie("SiteFormStatus", null);
    }
    if ($("#UserInfo").length != 0) {
        $("#UserInfo").text($("#txtDisplayName").val() );
    }
    if ($("#lblStatusApprover").length != 0) {
        $("#lblStatusApprover").click();
    }
    //  countdownnumber = setInterval("CountDown()", 1000);
    $(window).bind("resize", setMaxWidth);
    if ($("#FormInitial").length == 0) {
        $('#btnExit').click(function () {
            window.open(location, '_self').close();
        });
    }


    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            if ($("#MaintainForm").length == 0) {
                if (!($("#btnSearch").length != 0 && $("#btnBatchSearch").length != 0)) {
                    if ($("#btnSearch").length != 0) {
                        $("#btnSearch").click();
                    }
                    if ($("#btnBatchSearch").length != 0) {
                        $("#btnBatchSearch").click();
                    }
                }
            }
        }
    });
});

String.prototype.replaceAll = function (toReplace, replaceWith) {
    return this.split(toReplace).join(replaceWith);
}

String.format = function ()
{
    var s = arguments[0];
    if (s == null) return "";
    for (var i = 0; i < arguments.length - 1; i++)
    {
        var reg = getStringFormatPlaceHolderRegEx(i);
        s = s.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));
    }
    return cleanStringFormatResult(s);
}
String.prototype.format = function ()
{
    var txt = this.toString();
    for (var i = 0; i < arguments.length; i++)
    {
        var exp = getStringFormatPlaceHolderRegEx(i);
        txt = txt.replace(exp, (arguments[i] == null ? "" : arguments[i]));
    }
    return cleanStringFormatResult(txt);
}



function onScript(p_FieldID) {
    if (p_FieldID == "Maintain_Owner") {
       // PopupCenter("GeneratorWeb.aspx?siteformid=1000SYS0010", "Maintain Owner")
        window.open(g_Page+"?siteformid=1000SYS0010", '_blank');
    }
}



function GetEmployeeInfo() {
    var m_Employee = { "Account": $("#txtAccount").val(), "GroupID": $("#txtGroupID").val(), "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "CurrentLanguage": $('#selLanguage').val(), "CurrentSiteForm": $('#txtSiteFormID').val(), "DisplayName": $('#txtDisplayName').val() };
    
    return m_Employee;
}


function GetCtrlValue(p_FieldID) {
    var m_CtrlValue = "";
    if ($("#txt" + p_FieldID).length != 0) {
        m_CtrlValue = $("#txt" + p_FieldID).val();
    }
    if ($("#sel" + p_FieldID).length != 0) {
        m_CtrlValue = $("#sel" + p_FieldID).val();
    }
    if ($("#TitleHid" + p_FieldID).length != 0) {
        m_CtrlValue = $("#TitleHid" + p_FieldID).val();
    }
    return m_CtrlValue;
}

function GetOpenParam(p_Width) {
    var WinParam = "";
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    if (p_Width) {
        width = p_Width;
    }
    var m_width = width * 0.9;
    var m_height = height * 0.95;
    var left = ((width / 2) - (m_width / 2)) + dualScreenLeft;
    var top = ((height / 2) - (m_height / 2)) + dualScreenTop;
    WinParam = ' width=' + m_width + ', height=' + m_height + ', top=' + top + ', left=' + left;
    return WinParam;
}


function ExecuteEventSetting(p_EventID, p_Params) {
    var m_Employee = GetEmployeeInfo();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page + "/ExecuteEventSetting",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_EventID": p_EventID, "p_Params": p_Params }),
        async: false,
        dataType: "json",
        success: function (Result) {
            return Result.d;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
            return null;
        }
    });

}


function blockByClass(p_Class) {
    $('.' + p_Class).block({
        message: '<img src="/KF_Web/Img/loading.gif" /><H1>Processing...</H1>',
        showOverlay: false,
        centerY: false,
        css: {
            top: '10%',
            opacity: .7
        }
    });
}


function ExecuteOnClick(p_ExecuteEventID, p_ExecuteEvent, p_ExecuteParams) {


    var m_ExecuteParams = {};
    var m_ExecuteEvent = GetCtrlValue(p_ExecuteEvent);
    if (p_ExecuteParams != "") {
        p_ExecuteParams.split(',');

        $.each(p_ExecuteParams.split(','), function (ExecuteIndex, ExecuteParam) {
            var m_ParamValue = GetCtrlValue(ExecuteParam);
            m_ExecuteParams[ExecuteParam] = m_ParamValue;
        });
    }

    var m_Employee = GetEmployeeInfo();
    if (m_Employee.CurrentSiteForm.toUpperCase() == "1000SYS0007") {
        p_ExecuteEventID = $("#txtTransferID").val();
    }



    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page + "/Execute",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_ExecuteEventID": p_ExecuteEventID, "p_ExecuteEvent": m_ExecuteEvent, "p_ExecuteParams": m_ExecuteParams }),
        async: false,
        dataType: "json",
        success: function (Result) {

            if (Result.d != null) {
                if (Result.d.isSuccess) {

                    alert("Success");
                   // setTimeout(" $('.divMaintainForm').unblock();", 500);
                    $(".imgReflash").click();
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




//讓輸入的字串可以包含{}
function getStringFormatPlaceHolderRegEx(placeHolderIndex)
{
    return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
}
//當format格式有多餘的position時，就不會將多餘的position輸出
//ex:
// var fullName = 'Hello. My name is {0} {1} {2}.'.format('firstName', 'lastName');
// 輸出的 fullName 為 'firstName lastName', 而不會是 'firstName lastName {2}'
function cleanStringFormatResult(txt)
{
    if (txt == null) return "";
    return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
}


var g_optTW = { 
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    prevText: "上月",
    nextText: "次月",
    weekHeader: "週",
    changeMonth: true,
    changeYear: true,
    showMonthAfterYear: true,
    dateFormat: "yy/mm/dd", showButtonPanel: true, yearRange: 'c-70:'
};
var g_CtrlCustStr = ['lbl', 'txt', 'sel', 'Qry'];
function RemoveCtrlCustStr(p_Str) {
    $.each(g_CtrlCustStr, function (key, value) {
        p_Str = p_Str.replace(value, "");
    });
    return p_Str;
}
var g_optEN = {
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNamesShort: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    prevText: "Prev",
    nextText: "Next",
    weekHeader: "Wk",
    changeMonth: true,
    changeYear: true,
    showMonthAfterYear: true,
    dateFormat: "yy/mm/dd",
    showButtonPanel: true
};
$(function () {
    var m_LanguageSetting = g_optEN;
    switch ($('#selLanguage').val()) {
        case "TW":
            m_LanguageSetting = g_optTW;
            break;
        case "US":
            m_LanguageSetting = g_optEN;
            break;
    }
    $.each($("input[TextType='Date']"), function (key, value) {
        $("#" + value.id).datepicker(m_LanguageSetting);
    });
});

function CountDown() {
    if (intCountDown != 0) {
        intCountDown = intCountDown - 1;
    }
    else {
        clearInterval(countdownnumber);
        //ShowTimeOut();
    }
}

function ShowTimeOut() {
    var g_Html = "<div style='width:1434px;height:1500px; background-image:url(\"/KF_Web/Img/timeout.jpg\")'><div style=' position:absolute;  margin-top:470px; margin-left:430px;'> <table style='width:300px;height:100px;text-align:left	;'>";
    g_Html += "<tr>";
    g_Html += "<td><label class='col-lg-2 control-label'>ID</asp:Label></td>";
    g_Html += "<td colspan='2'><input id='txtID'  class='form-control' style='width:150px;'type='text' /> </td>";
    g_Html += "</tr>";
    g_Html += "<tr>";
    g_Html += "<td><labelclass='col-lg-2 control-label'>PWD</Label></td>";
    g_Html += "<td style='width:88%' class='Text'> <input  class='form-control' id='txtPWD' style='width:150px;'type='password'/></td><td> <input class='btn btn-primary  mr5 notification' id='btnLogin' title='Login' alt='Login' onclick='Login()' type='button' value='Login' />  </td>";
    g_Html += "</tr>";
    g_Html += "</table></div></div>";
    $('.timeout').block({
        message: g_Html,
        css: {
            margin: '0px auto',
            top: '10px',
            width: '1300px',
            cursor: 'initial'
        }
    });
    g_isCheck = false;
    setTimeout('$("#txtID").focus()', 500);
}

function SetLanguage(p_objLan) {
    $.each(p_objLan, function (key, value) {
        if (key.indexOf("titleModuleName") != -1) {
            key = "titleModuleName";
        }
        if ($("#" + key).length != 0) {
            switch ($("#" + key)[0].nodeName) {
                case "LABEL":
                    $.each($("label[id='" + key + "']"), function (key1, value1) {
                        if ($(value1).prop("class").indexOf("AllowEmpty") != -1) {
                            value = "*" + value;
                        }
                        $(value1).text(value)
                    });
                    break;
                case "INPUT":
                    $("#" + key).val(value);
                    break;
            }
        }
    });
}

function SetByCtrl() {
    $.each($("input[TextType='Date']"), function (key, value) {
        switch ($('#selLanguage').val()) {
            case "TW":
                $("#" + value.id).datepicker("option","dayNamesMin", g_optTW["dayNamesMin"]);
                $("#" + value.id).datepicker("option","monthNamesShort", g_optTW["monthNamesShort"]);
                $("#" + value.id).datepicker("option","prevText", g_optTW["prevText"]);
                $("#" + value.id).datepicker("option","nextText", g_optTW["nextText"]);
                $("#" + value.id).datepicker("option","weekHeader", g_optTW["weekHeader"]);
                break;
            case "US":
                $("#" + value.id).datepicker("option","dayNamesMin", g_optEN["dayNamesMin"]);
                $("#" + value.id).datepicker("option","monthNamesShort", g_optEN["monthNamesShort"]);
                $("#" + value.id).datepicker("option","prevText", g_optEN["prevText"]);
                $("#" + value.id).datepicker("option","nextText", g_optEN["nextText"]);
                $("#" + value.id).datepicker("option","weekHeader", g_optEN["weekHeader"]);
                break;
        }
    });
}

function ShowMessage(p_MSG) {
    m_Keys=[p_MSG];
    var m_Employee = GetEmployeeInfo();
    var m_Result = new Object;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page + "/GetLanguage",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_Language": $('#selLanguage').val(), "p_Keys": m_Keys }),
        dataType: "json",
        success: function (Result) {
            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    m_Result = Result.d.ResultEntity[p_MSG];
                    alert(m_Result);
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

function GetLanguage(p_Key) {
    var m_Employee = GetEmployeeInfo();
    var m_Keys = [p_Key];
    var m_Result = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page + "/GetLanguage",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_Language": $('#selLanguage').val(), "p_Keys": m_Keys }),
        async: false,
        dataType: "json",
        success: function (Result) {

            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    m_Result = Result.d.ResultEntity[p_Key];
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
    return m_Result;
}

function GetLanguageByArray(p_arrKey) {
    var m_Employee = GetEmployeeInfo();
    var m_Result = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page + "/GetLanguage",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_Language": $('#selLanguage').val(), "p_Keys": p_arrKey }),
        async: false,
        dataType: "json",
        success: function (Result) {

            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    m_Result = Result.d.ResultEntity;
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
    return m_Result;
}

function GetLanguageByPage() {
    SetByCtrl();
    var m_Employee = GetEmployeeInfo();
    m_Keys = [];
    $.each($("label[id^='lbl']"), function (key, value) {
        m_Keys.push(value.id);
    });
    $.each($("input[id^='btn']"), function (key, value) {
        m_Keys.push(value.id);
    });
    $.each($("input[id^='Qbtn']"), function (key, value) {
        m_Keys.push(value.id);
    });
    $.each($("label[id^='thlbl']"), function (key, value) {
        m_Keys.push(value.id);
    });

    if ($("#titleModuleName").length != 0) {
        m_Keys.push("titleModuleName" + $("#titleModuleName").attr('ModKey'));
    }

    var m_Result = new Object;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page+"/GetLanguage",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_Language": $('#selLanguage').val(), "p_Keys": m_Keys }),
        dataType: "json",
        success: function (Result) {

            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    m_Result = Result.d.ResultEntity;
                    SetLanguage(m_Result);

                    var m_arrSelEventIDs = [];

                    $.each($("#BaseCtrl select"), function (Index, Item) {
                        if ($(Item).prop("selQID") != "") {
                            var m_SelEventID = {};
                            m_SelEventID["id"] = $(Item).prop("id");
                            m_SelEventID["selQID"] = $(Item).attr("selQID");
                            m_SelEventID["selText"] = $(Item).attr("selText");
                            m_arrSelEventIDs.push(m_SelEventID);
                        }
                    });

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: g_Page+"/GetSelSouceByEventIDs",
                        data: JSON.stringify({ "p_Employee": m_Employee, "p_EventIDs": m_arrSelEventIDs }),
                        dataType: "json",
                        success: function (Result) {
                            if (Result.d != null) {
                                if (Result.d.isSuccess) {
                                    m_Result = Result.d.ResultEntity;
                                    $.each($("#BaseCtrl select"), function (Index, Item) {
                                        var m_objResult = m_Result[Index];
                                        if ($("#" + Item["id"]).length != 0) {
                                            try {
                                                $.each($("#" + Item["id"] + " option"), function (opIndex, opItem) {
                                                    $(opItem).text(m_objResult["Result"][opIndex]);
                                                });
                                            }
                                            catch (e) {
                                            }

                                        }
                                    });
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


function GetValueByRef(p_CtrlID, p_Ref) {
    var m_ReturnValue = "";
    var m_GetLogic = [{ "txt": "input" }, { "txt": "textarea" }, { "Qry": "input" }, { "sel": "select" }, { "dis": "label" }, { "TitleHid": "input"}];
    $.each(m_GetLogic, function (Index, Item) {
        $.each(Item, function (Head, CtrlType) {
            var m_CtrlID = Head + p_Ref;
            var m_objCtrl = $("#" + p_CtrlID + " " + CtrlType + "[id='" + m_CtrlID + "']");
            if (m_objCtrl.length != 0) {
                if (m_objCtrl[0].nodeName == "LABEL") {
                    m_ReturnValue = m_objCtrl.text();
                }
                else {
                    m_ReturnValue = m_objCtrl.val();
                }

            }
            if (m_ReturnValue != "") {
                return false;
            }
        });
        if (m_ReturnValue != "") {
            return false;
        }
    });

    return m_ReturnValue;
}


function RemoveReservedWords(p_Word) {
    var m_ReservedWords = ["TitleHid", "Thid", "txt", "sel", "dis", "Qry", "chk", "hid"];
    $.each(m_ReservedWords, function (Index, value) {
        if (p_Word.indexOf(value) == 0) {
            p_Word = p_Word.replace(value, "")
        }
    });

    return p_Word;
}

function GeneratorEntity(p_Ctrls, p_Entity, p_Mode) {
    $.each(p_Ctrls, function (key, value) {
        if ($(value).closest('.DtlRows').length == 0) {
            var m_Value = "";
            var m_Attr = "";
            var m_CtrlType = "";
            var m_ModifyKey = "";
            var m_CtrlText = "";


            if (value.nodeName == "LABEL") {
                m_Value = $(value).text();
                m_CtrlType = "text";
                m_ModifyKey = $("#" + value.id).attr("modifykey");

            }
            else {
                if ($(value).attr("type") == "checkbox") {
                    if ($(value).prop("checked")) {
                        m_Value = "1";
                    }
                    else {
                        m_Value = "0";
                    }
                    m_CtrlType = "checkbox";
                }
                else {
                    if (value.id.indexOf("txt") == 0 || value.id.indexOf("Qtxt") == 0 || value.id.indexOf("Ttxt") == 0) {
                        if ($("#" + value.id).length != 0) {
                            if ($("#" + value.id).attr("texttype") == "Date") {
                                m_Value = $(value).val();; //.replaceAll("/", "");
                            }
                            else {
                                m_Value = $(value).val();
                            }
                            m_CtrlType = "text";
                            m_ModifyKey = $(value).attr("modifykey");

                        }
                    }
                    else {
                        if (value.nodeName == "SELECT") {
                            m_CtrlType = "select";
                            if (p_Mode == "Dtl") {

                                if ($("#" + value.id).attr("class") == "MultiSelect") {
                                    m_CtrlType = "MultiSelect";
                                }
                                else {
                                    m_Value = $("#" + value.id).val() + "::" + $("#" + value.id + " :selected").text();
                                }
                                m_ModifyKey = $("#" + value.id).attr("modifykey");


                            }
                            else {
                                m_Value = $("#" + value.id).val();
                                m_ModifyKey = $("#" + value.id).attr("modifykey");

                            }
                        }
                        else {
                            m_CtrlType = "text";
                            m_Value = $("#" + value.id).val();
                            m_ModifyKey = $("#" + value.id).attr("modifykey");

                        }
                    }
                }
            }
            m_CtrlText = $("#" + value.id).closest('div').find("label[id='" + "lbl" + $("#" + value.id).attr("fieldid") + "']").text();
            m_Attr = RemoveReservedWords(value.id.replace(p_Mode, ""));

            if (p_Mode == "Dtl")//單檔多筆的資料需回傳型態
            {
                var m_DtlValue = {};
                m_DtlValue["ModifyKey"] = m_ModifyKey;
                m_DtlValue["CtrlText"] = m_CtrlText;
                m_DtlValue["type"] = m_CtrlType;
                m_DtlValue["value"] = m_Value;
                p_Entity[m_Attr] = m_DtlValue;

            }
            else {
                if (p_Entity[m_Attr] == undefined) {
                    p_Entity[m_Attr] = m_Value;
                }
                else {
                    if (p_Entity[m_Attr] == "") {
                        p_Entity[m_Attr] = m_Value;

                    } 
                }
            }

        }
    });
    return p_Entity;
}

function GetDtlRowEntitys(p_Entity,p_IsReflash) {
    var m_Entity = {};
    $.each($(".DtlTD"), function (DetailIndex, DtlTD) {
        var m_DtlID = $(".DtlTD")[DetailIndex].id;
        var m_DtlField = $($(".DtlTD")[DetailIndex]).attr("field");
        var m_DtlRows = $("#" + m_DtlID + " .DtlTable tr[id!='DtlDefRow']");
        var m_arrDtl = [];
        $.each(m_DtlRows, function (DtlRowIndex, DtlRow) {
            var m_DtlRowTds = $($(DtlRow).html() + "td");
            var m_RowAction = $(DtlRow).attr("rowaction");
            var m_Attrs = {};
            m_Attrs["RowAction"] = m_RowAction;
            m_Attrs["DelChk"] = $(DtlRow).find("input[id='chkDtl']").prop("checked");
            var m_isInsert = true;
            if (m_RowAction == "Add" && m_Attrs["DelChk"]) {//明細是新增模式且DelChk被勾選的時候不需處理
                m_isInsert = false;
            }
            $.each(m_DtlRowTds, function (RowTdIndex, RowTd) {
                if (RowTd.className != "DelChk") {
                    var m_field = $(RowTd).attr("field");
                    if (m_field == "DtlTRSeq") {
                        m_Attrs[m_field] = $(RowTd).text();
                    }
                    else {
                        if ($(RowTd).attr("valuetype") == "text") {
                            m_Attrs[m_field] = $(RowTd).attr("value");
                        }
                        else { //MultiSelect 預留
                        
                        }
                    }
                }
            });
            if (m_isInsert) {
                m_arrDtl.push(m_Attrs);
            }
        });
        p_Entity[m_DtlField] = m_arrDtl;
    });

    return p_Entity;
}


function ReflashMaintain() {
    if ($("#FormInitial").length != 0) {
        if ($("#hidMaintainParam").val() != "") {
            var m_Param = jQuery.parseJSON($("#hidMaintainParam").val());
            OpenMaintain(m_Param.EventID, m_Param.FieldID, "Reflash", m_Param.LanguageValue, m_Param.QueryMethod, m_Param.EventFollow);
        }
    }
    else {
        location.reload();
    }
}
function GeneratorAllEntity(p_CtrlID, p_Mode) {
    var m_Entity = {};
    var m_CtrlMode = "";
    if (p_Mode != "") {
        m_CtrlMode = p_Mode;
    }
    m_Entity = GeneratorEntity($("#" + p_CtrlID + " input[id^='" + m_CtrlMode + "txt']"), m_Entity, m_CtrlMode);
    m_Entity = GeneratorEntity($("#" + p_CtrlID + " input[id^='" + m_CtrlMode + "Qry']"), m_Entity, m_CtrlMode);
    m_Entity = GeneratorEntity($("#" + p_CtrlID + " select[id^='" + m_CtrlMode + "sel']"), m_Entity, m_CtrlMode);
    m_Entity = GeneratorEntity($("#" + p_CtrlID + " input[id^='" + m_CtrlMode + "TitleHid']"), m_Entity, m_CtrlMode);
    m_Entity = GeneratorEntity($("#" + p_CtrlID + " textarea[id^='" + m_CtrlMode + "txt']"), m_Entity, m_CtrlMode);
    m_Entity = GeneratorEntity($("#" + p_CtrlID + " label[id^='" + m_CtrlMode + "dis']"), m_Entity, m_CtrlMode);
    m_Entity = GeneratorEntity($("#" + p_CtrlID + " input[id^='" + m_CtrlMode + "hid']"), m_Entity, m_CtrlMode);
    m_Entity = GeneratorEntity($("#" + p_CtrlID + " input[id^='" + m_CtrlMode + "chk']"), m_Entity, m_CtrlMode);
    
    return m_Entity;
}


function OnClickFormTransfer(p_EventID, p_FieldID, p_ActionMode, p_btnValue, p_ControlRef) {
    var m_Labels = ['Exit', 'TransferUser', 'TransferRemark', 'FormTransfer'];
    var m_Languages = GetLanguageByArray($.unique(m_Labels));
    //$('#MaintainForm input[type=button]').attr('disabled', true);

    var m_Elements = "<input id='ThidFormKeys' value='{0}' type='hidden' />";
    var m_ElementsValue = {};
    var m_hidKeyValue = "";

    $.each(p_ControlRef.split(','), function (key, value) {
        var m_RefValue = GetValueByRef("BaseCtrl", value);
        m_ElementsValue[value] = m_RefValue;
    });
    m_Elements = String.format(m_Elements, JSON.stringify(m_ElementsValue));
    var m_QueryCtrlHtml = "<tr><td style='width: 30%;'><label id='lblTransferUser'>" + m_Languages["TransferUser"] + "</label></td><td style='width: 25%;' class='qry'><input readonly='true' class='form-control' onchange='QueryOnChange(\"TtxtWorkID\",\"T\") id='TtxtWorkID' type='text' maxlength='10'></td><td style='width: 7%;'><img name='TtxtWorkID' width='20' height='20' Field='WorkID' class='hand' onclick='OpenQueryForm(\"TtxtWorkID\",\"Query\",\"Q0007\",\"WorkID,EmployeeName\",\"\",\"T\")' alt='Query' src='/KF_Web/Img/Query.png'></td><td style='width: 38%;' ><label fieldid='EmployeeName' id='disEmployeeName'></label> </td></tr>";
    var m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblTransferRemark'>" + m_Languages["TransferRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  class='form-control' id='TtxtTransferRemark'></textarea></td></tr>";
    var m_FromTransferHtml = " <table id='tbFromTransfer'  style='width: 100%;height: 100%;'>" + m_Elements + m_QueryCtrlHtml + m_QueryRemarkHtml + "</table>";
    $.blockUI({
        theme: true,
        title: "<label id='lblTransferUser'>" + m_Languages["FormTransfer"] + "</label>",
        message: "<p> <input class='btn btn-system mb10 mr5 notification' style='padding:6px 10px' id='btnFormTransfer' ondblclick='return false'  onclick='ActionModel(\"" + p_EventID + "\",\"" + p_FieldID + "\",\"" + p_ActionMode + "\");' type='button' value='" + p_btnValue + "' /> <input class='btn btn-alert mb10 mr5 notification' style='padding:6px 10px' id='btnFormTransfer'  onclick='UnblockUI();' type='button' value='" + m_Languages["Exit"] + "' /> </p><table><tr><td>" + m_FromTransferHtml + " </td></tr></table>",
        draggable: true,
        themedCSS: {
            width: '50%',
            top: '30%',
            left: '25%'
        }
    });
}


function SiteFormStatusOnclick(p_event) {

    $(".SiteFormStatus").attr("sel", "");
    $(".SiteFormStatus").attr("style", "");
    $("#" + p_event.id).attr("sel", "Y");
    $("#" + p_event.id).attr("style", "background:#FFE66F;");


}

//Casper Add  javascript OnClickCommonButton p_SiteFormID param
function OnClickCommonButton(p_EventID, p_FieldID, p_ActionMode, p_btnValue, p_ControlRef, p_SiteFormID) {
    var m_Labels = [];
    var m_FormTitle = "";
    var m_ControlRef = "";
    if (CheckUndefined(p_ControlRef)) {
        m_ControlRef = p_ControlRef;
    }
    switch (p_FieldID) {
        case "Transfer":
            m_FormTitle = "FormTransfer";
            m_Labels = ['Exit', 'TransferUser', 'TransferRemark', 'FormTransfer', p_FieldID];
            break;
        case "Reject":
            m_FormTitle = "FormReject";
            m_Labels = ['Exit', 'RejectRemark', 'FormReject', p_FieldID];
            break;
        case "Cancel":
            m_FormTitle = "FormCancel";
            m_Labels = ['Exit', 'CancelRemark', 'FormCancel', p_FieldID];
            break;
        case "Approve":
            m_FormTitle = "FormApprove";
            m_Labels = ['Exit', 'ApproveRemark', 'FormApprove', p_FieldID];
            break;
        case "BatchApprove":
            m_FormTitle = "FormBatchApprove";
            m_Labels = ['Exit', 'BatchApproveRemark', 'FormBatchApprove', p_FieldID];
            break;
        case "BatchReject":
            m_FormTitle = "FormBatchReject";
            m_Labels = ['Exit', 'BatchRejectRemark', 'FormBatchReject', p_FieldID];
            break;
            


    }
    var m_Languages = GetLanguageByArray($.unique(m_Labels));
    $('#MaintainForm input[type=button]').attr('disabled', true);
    var m_Elements = "<input id='ThidFormKeys' value='{0}' type='hidden' />";
    var m_ElementsValue = {};
    var m_hidKeyValue = "";


    if (p_FieldID == "BatchApprove" || p_FieldID == "BatchReject") {
        if ($("input:checked[id^='dtlchk']").length == 0) {
            alert(GetLanguage("MSG00003"));
            return false;
        }
    }
    $.each(p_ControlRef.split(','), function (key, value) {
        var m_RefValue = GetValueByRef("BaseCtrl", value);
        m_ElementsValue[value] = m_RefValue;
    });
    m_Elements = String.format(m_Elements, JSON.stringify(m_ElementsValue));
    var m_QueryCtrlHtml = "";
    var m_QueryRemarkHtml = "";
    switch (p_FieldID) {
        case "Transfer":
            m_QueryCtrlHtml = "<tr><td style='width: 30%;'><label id='lblTransferUser'>" + m_Languages["TransferUser"] + "</label></td><td style='width: 25%;' class='qry'><input readonly='true' class='form-control' ValidType='AllowEmpty'  onchange='QueryOnChange(\"TtxtWorkID\",\"T\")' fieldid='WorkID' id='TtxtWorkID' onfocusout='AllowEmpty(this)' type='text' maxlength='10'></td><td style='width: 7%;'><img name='TtxtWorkID' width='20' height='20' class='hand' Field='WorkID' onclick='OpenQueryForm(\"TtxtWorkID\",\"Query\",\"Q0007\",\"WorkID,EmployeeName\",\"\",\"T\")' alt='Query' src='/KF_Web/Img/Query.png'></td><td style='width: 38%;' ><label fieldid='EmployeeName'  id='disEmployeeName'></label> </td></tr>";
            m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblTransferRemark'>" + m_Languages["TransferRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  ValidType='AllowEmpty' onfocusout='AllowEmpty(this)'  class='form-control' fieldid='TransferRemark' id='TtxtTransferRemark'></textarea></td></tr>";
            break;
        case "Reject":
            m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblRejectRemark'>" + m_Languages["RejectRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  class='form-control' onfocusout='AllowEmpty(this)' ValidType='AllowEmpty' fieldid='RejectRemark' id='TtxtRejectRemark'></textarea></td></tr>";
            break;
        case "Cancel":
            m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblCancelRemark'>" + m_Languages["CancelRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  class='form-control' onfocusout='AllowEmpty(this)' ValidType='AllowEmpty' fieldid='CancelRemark'  id='TtxtCancelRemark'></textarea></td></tr>";
            break;
        case "Approve":
            m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblApproveRemark'>" + m_Languages["ApproveRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  class='form-control' onfocusout='AllowEmpty(this)' ValidType='AllowEmpty' fieldid='ApproveRemark' id='TtxtApproveRemark'></textarea></td></tr>";
            //Casper Modify Approve don't wirte remark
            if (p_SiteFormID.indexOf("DN0001") >= 0)
                m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblApproveRemark'>" + m_Languages["ApproveRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  class='form-control'  fieldid='ApproveRemark'   id='TtxtApproveRemark'></textarea></td></tr>";
            break;
        case "BatchApprove":
            m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblBatchApproveRemark'>" + m_Languages["BatchApproveRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  class='form-control' onfocusout='AllowEmpty(this)' fieldid='BatchApproveRemark' ValidType='AllowEmpty' id='TtxtBatchApproveRemark'></textarea></td></tr>";
            //Casper Modify BatchApprove don't wirte remark
            if (p_SiteFormID.indexOf("DN0001") >= 0)
                m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblBatchApproveRemark'>" + m_Languages["BatchApproveRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  class='form-control' fieldid='BatchApproveRemark'  id='TtxtBatchApproveRemark'></textarea></td></tr>";
            break;
        case "BatchReject":
            m_QueryRemarkHtml = "<tr><td  style='width: 30%;'><label id='lblBatchRejectRemark'>" + m_Languages["BatchRejectRemark"] + "</label></td><td colspan='3' style='width: 70%;' class='qry'> <textarea cols='100%'  class='form-control' fieldid='BatchRejectRemark' onfocusout='AllowEmpty(this)' ValidType='AllowEmpty' id='TtxtBatchRejectRemark'></textarea></td></tr>";
            break;

    }


    var m_CommonFromHtml = " <table id='tbCommonForm'  style='width: 100%;height: 100%;'>" + m_Elements + m_QueryCtrlHtml + m_QueryRemarkHtml + "</table>";

    $.blockUI({
        theme: true,
        title: "<label id='lbl" + m_FormTitle + "'>" + m_Languages[m_FormTitle] + "</label>",
        message: "<p> <input class='btn btn-system mb10 mr5 notification btnCommon ' style='padding:6px 10px' id='btn" + p_FieldID + "' ondblclick='return false'  onclick='ActionModel(\"" + p_EventID + "\",\"" + p_FieldID + "\",\"" + p_ActionMode + "\",\"\",\"" + m_ControlRef + "\");' type='button' value='" + m_Languages[p_FieldID] + "' /> <input class='btn btn-alert mb10 mr5 notification' style='padding:6px 10px' id='btnExit' onmouseover='CheckError(\"IN\")' onmouseout='CheckError(\"OUT\")'   onclick='UnblockUI();' type='button' value='" + m_Languages["Exit"] + "' /> </p><table><tr><td>" + m_CommonFromHtml + " </td></tr></table>",
        draggable: true,
        themedCSS: {
            width: '50%',
            top: '30%',
            left: '25%'
        }
    });

}

function UnblockUI() {
    setTimeout('$.unblockUI();', 10);
    $('#MaintainForm input[type=button]').attr('disabled', false);
}
function CheckUndefined(p_Obj) {
    var m_Result = false;
    if (p_Obj != undefined && p_Obj != "") {
        m_Result = true;
    }
    return m_Result;
}


function SetGridScroll(p_id, p_Scroll) {
    $("#" + p_id + "scroll").scrollTop(p_Scroll);
    if ($.cookie("TRsel") != null) {
        $("#" + $.cookie("TRsel")).attr("class", "Sel");
    }

}
function RefreshbtnAction() {
    if ($.cookie('btnAction') != null) {
        if ($.cookie("EventID") != null && $.cookie("FieldID") != null) {
            GoToPage($.cookie("EventID"), $.cookie("FieldID"), $.cookie("EventActionType"), $(".PageIndex").text(),$.cookie("SiteFormStatus"))
        }
    }
}



function ActionModel(p_EventID, p_FieldID, p_EventActionType, p_PageIndex, p_ActionRef, p_SiteFormStatus, p_IsCustOrder,p_CallBack) {
    var m_TargetID = "";
    var m_CallBack = p_CallBack
    var m_Event = null;
    if (event != undefined) {
        //m_TargetID = $(event)[0].currentTarget.id
        //$(("#" + m_TargetID)).prop('disabled', true);
        m_Event = $($(event)[0].currentTarget);
        m_Event.prop('disabled', true);
    }
    

  
    var m_PageIndex = "";
    var m_ActionRef = null;
    var m_SiteFormStatus = "";
    if (CheckUndefined(p_ActionRef)) {
        m_ActionRef = p_ActionRef;
    }
    if (CheckUndefined(p_PageIndex)) {
        m_PageIndex = p_PageIndex;
    }
    if (CheckUndefined(p_SiteFormStatus)) {
        m_SiteFormStatus = p_SiteFormStatus;
    }

    var m_Entity = {};
    if (p_EventActionType == "Add" || p_EventActionType == "Edit" || p_EventActionType == "Approve" || p_EventActionType == "BatchApprove" || p_EventActionType == "BatchReject" || p_EventActionType == "Delete" || p_EventActionType == "Preview" || p_EventActionType == "Reject" || p_EventActionType == "Cancel" || p_EventActionType == "Transfer" || p_EventActionType == "Update") {

        if (p_EventActionType != "Transfer" && p_EventActionType != "Reject" && p_EventActionType != "Cancel" && p_EventActionType != "BatchApprove" && p_EventActionType != "BatchReject" && p_EventActionType != "Update") {
            if (ValidAll()) {
                m_Entity = GeneratorAllEntity("BaseCtrl", "");
                if (p_EventActionType == "Approve") {
                    if (ValidAll("tbCommonForm", "T")) {
                        m_CommonFromEntity = GeneratorAllEntity("tbCommonForm", "T");
                        $.each(m_CommonFromEntity, function (key, value) {
                            m_Entity[key] = value;
                        });
                    }
                    else {
                        if (m_Event != null) {
                            m_Event.prop('disabled', false);
                        }
                        return false;
                       
                    }
                    m_ActionRef = null;
                }
                if ($('.DtlRows').length != 0) {
                    m_Entity = GetDtlRowEntitys(m_Entity);
                }
            }
            else {
                if (m_Event != null) {
                    m_Event.prop('disabled', false);
                }
                return false;
                
            }
        }
        else {

            if (p_EventActionType == "Update") {
                m_Entity = GeneratorAllEntity("BaseCtrl", "");
                $.each(m_Entity, function (key, value) {
                    if (key == "FormKeys") {
                        m_Entity["FormKeys"] = jQuery.parseJSON(value);
                    }
                });
            }
            else {
                m_Entity = GeneratorAllEntity("tbCommonForm", "T");
                if (ValidAll("tbCommonForm", "T")) {

                    if (p_EventActionType == "BatchApprove" || p_EventActionType == "BatchReject") {
                        var m_hasFormKey = false;

                        var arrEntity = [];
                        $.each($("input:checked[id^='dtlchk']"), function (ItemIndex, Item) {
                            if (m_ActionRef != "") {
                                m_hasFormKey = true;
                                var m_obj = new Object();
                                $.each(p_ActionRef.split(','), function (KeyIndex, Key) {
                                    m_obj[Key] = $(Item).closest('tr').find("td[FieldID='" + Key + "']").text().trim();
                                });
                                arrEntity.push(m_obj);
                            }
                            m_Entity["FormKeys"] = arrEntity;

                        });
                        if (!m_hasFormKey) {
                            if (p_EventActionType == "BatchApprove") {
                                alert("批簽 dbo.ViewDetail-[ControlRef] 未設定");
                                return false;
                            }
                            else {
                                alert("批次駁回 dbo.ViewDetail-[ControlRef] 未設定");
                                return false;
                            }

                        }
                        m_ActionRef = null;
                    }

                    else {
                        $.each(m_Entity, function (key, value) {
                            if (key == "FormKeys") {
                                m_Entity["FormKeys"] = jQuery.parseJSON(value);
                            }
                        });
                        m_ActionRef = null;
                    }
                }
                else {
                   // $('#MaintainForm input[type=button]').attr('disabled', false);
                    if (m_Event != null) {
                        m_Event.prop('disabled', false);
                    }
                    return false;
                }
            }

            

        }
    }
    else if (p_EventActionType == "GridData" || p_EventActionType == "GridDataGroup") {
       
        if ($("#BaseCtrl").length != 0) {
            m_Entity = GeneratorAllEntity("BaseCtrl", "Q");
            if (m_SiteFormStatus != "") {
                m_Entity["CommonSiteFormStatus"] = m_SiteFormStatus;
                $("#btn" + p_FieldID).attr("CommonSiteFormStatus", m_SiteFormStatus);
            }
            else {

                if (p_IsCustOrder == "Y") {
                    m_Entity["CommonSiteFormStatus"] = $("#btn" + p_FieldID).attr("CommonSiteFormStatus");
                }
                else {
                    if ($(".SiteFormStatus").length != 0) {
                        if (m_SiteFormStatus == "") {
                            $(".SiteFormStatus").attr("sel", "");
                            $(".SiteFormStatus").attr("style", "");
                        }
                    }
                    $("#btn" + p_FieldID).attr("CommonSiteFormStatus", "");
                }

            }
        }

        if ($("#QueryFormCtrl").length != 0) {
            m_Entity = GeneratorAllEntity("QueryFormCtrl", "Q");
        }
    }
    else if (p_EventActionType == "Rollback") {
        m_Entity["SiteFormID"] = $("#selSiteFormID").val();
        m_Entity["OldTempKey"] = $("#hidOldTempKey").val();
    }


    $('.timeout').block({
        message: '<img src="/KF_Web/Img/loading.gif" /><H1>Processing...</H1>',
        showOverlay: false,
        centerY: false,
        css: {
            top: '20%',
            opacity: .7
        }
    });

    var m_Employee = GetEmployeeInfo();

       

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page +"/ActionModel",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_EventID": p_EventID, "p_Entity": m_Entity, "p_PageIndex": m_PageIndex, "p_ActionRef": m_ActionRef }),
        dataType: "json",
        success: function (Result) {
            if (Result.d != null) {
                $('.timeout').unblock({ fadeOut: 10 });
                if (Result.d.isSuccess) {
                    if (m_Event != null) {
                        m_Event.prop('disabled', false);
                    }
                    switch (p_EventActionType) {
                        case "GridData":
                        case "GridDataGroup":
                            GridBind(m_Employee, Result.d, p_FieldID, p_EventID, p_EventActionType, p_PageIndex, m_CallBack);

                            setTimeout('GridMobileCtrl();', 300);

                            break;
                        case "Add":
                            alert("success!!");
                            $("#btnSearch").click();
                            CloseMaintain();

                            break;
                        case "Update":
                        case "Edit":
                            alert("success!!");
                            ReflashMaintain();

                            break;
                        case "Delete":
                            alert("success!!");
                            $("#btnSearch").click();
                            CloseMaintain();
                            break;
                        case "Preview":
                            var iLeft = (window.screen.availWidth) / 4;   //視窗的水平位置;
                            var m_ScrWidth = window.screen.width;
                            var m_OpenWidth = m_ScrWidth / 2;
                            var m_FormPath = 'PreviewForm.aspx?Mode=Preview&Language=' + $('#selLanguage').val() + '&TempKey=' + Result.d.ResultEntity + '&SiteFormID=' + $("#selSiteFormID").val() + '&Employee=' + JSON.stringify(m_Employee);
                            var m_FormParam = 'width=' + m_OpenWidth.toString() + ',height=680, left = ' + iLeft + ',  location=no,toolbar=no,menubar=no,scrollbars=yes';
                            window.open(m_FormPath, 'PreviewForm', m_FormParam, true);
                            break;
                        case "Rollback":
                            alert("Rollback success!!");
                            ReflashMaintain();
                            break;
                        case "Reject":
                        case "Cancel":
                        case "Transfer":
                            alert("success!!");
                            ReflashMaintain();
                            CloseMaintain();
                            break;
                        case "Approve":
                            alert("success!!");
                            ReflashMaintain();
                            break;
                        case "BatchApprove":
                            alert("success!!");
                            RefreshbtnAction();
                            break;
                        case "BatchReject":
                            alert("success!!");
                            RefreshbtnAction();
                            setTimeout('GridMobileCtrl();', 300);

                            break;
                        default:
                            alert("success!!");
                            break;
                    }
                    UnblockUI();
                }
                else {
                    alert(Result.d.LogMessage);
                    if (m_Event != null) {
                        m_Event.prop('disabled', false);
                    }
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
            if (m_Event != null) {
                m_Event.prop('disabled', false);
            }
        }
    });
}
function HistoryOnClick(p_Event,p_TempKey) {

    var m_Employee = GetEmployeeInfo();
    var iLeft = (window.screen.availWidth) / 4;   //視窗的水平位置;
    var m_ScrWidth = window.screen.width;
    var m_OpenWidth = m_ScrWidth / 2;
    var m_FormPath = 'PreviewForm.aspx?Mode=History&SiteFormID=' + $("#selSiteFormID").val() + '&Language=' + $('#selLanguage').val() + '&TempKey=' + p_TempKey + '&Employee=' + JSON.stringify(m_Employee);
    var m_FormParam = 'width=' + m_OpenWidth.toString() + ',height=680, left = ' + iLeft + ',  location=no,toolbar=no,menubar=no,scrollbars=yes';
    window.open(m_FormPath, 'PreviewForm', m_FormParam, true);
    $("#tbSelectedLi").show();
    $("#btnRollback").show();
    $("#hidOldTempKey").val(p_TempKey);
    $("#selLi").html($(p_Event).html());
}

//Casper Add Begin 201804016
function goMainPage(p_SiteFormID) {
    top.location.href = "GeneratorWeb.aspx?SiteFormID=" + p_SiteFormID;
}
//Casper Add End
function CloseMaintain() {
    if ($("#FormInitial").length != 0) {
        $('.Main').unblock();
        $.unblockUI();
        g_isError = null;
        g_CheckID = "";

        try {
            var m_WinName = g_opWindow.name;
            if (m_WinName == "") {
                g_opWindow = null;
            }
            g_opWindow.close();
        }
        catch (e) {
            if (g_opWindow != null)
                g_opWindow.close();
        }
    }
    else {
        
    }
}

//Casper Add
function CheckNeedFile(SupplierType) {

}

function UploadExcelGrid(p_FileControl, p_SiteFormID, p_KeyID, p_FieldID) {
    var formData = new FormData();
    //抓取File Control中的檔案
    var file = $("#" + p_FileControl)[0].files[0];
    formData.append("file", file);
    var m_Employee = GetEmployeeInfo();
    formData.append("Employee", JSON.stringify(m_Employee));
    formData.append("RequestType", "ExcelGrid");
    $.ajax({
        type: 'post',
        url: 'AjaxUpload.aspx',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.isSuccess) {
                alert('succes!!');
            }
            else {
                alert(response.LogMessage);
            }
        },
        error: function (error) {
            alert("error");
        }
    });
}
function DelFile(p_TargetID, p_CtrlID, p_KeyID, p_SiteFormID, p_FieldID) {
    var m_Employee = GetEmployeeInfo();
    var m_FileFolder = { "DocID": p_CtrlID, "FileKey": p_KeyID, "SiteFormID": p_SiteFormID, "FieldID": p_FieldID };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page+"/DelFile",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_FileFolder": m_FileFolder, "p_TargetID": p_TargetID }),
        dataType: "json",
        success: function (Result) {

            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    if ($("#Down" + p_TargetID.replace("upl", "").replace("Dfile", "")).length != 0) {
                        $("#Down" + p_TargetID.replace("upl", "").replace("Dfile", "")).remove();
                    }
                    $("#" + p_TargetID).after(Result.d.ResultEntity);
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

function GetFileFolders(p_Event, p_SiteFormID, p_KeyID, p_FieldID) {
    var m_Employee = GetEmployeeInfo();
    var m_FileFolder = { "DocID": p_KeyID, "SiteFormID": p_SiteFormID, "FieldID": p_FieldID };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page+"/GetFileFolder",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_FileFolder": m_FileFolder, "p_TargetID": p_Event.id }),
        dataType: "json",
        success: function (Result) {

            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    if ($("#Down" + p_Event.id.replace("upl", "").replace("Dfile", "")).length != 0) {
                        $("#Down" + p_Event.id.replace("upl", "").replace("Dfile", "")).remove();
                    }
                    $("#" + p_Event.id).after(Result.d.ResultEntity);
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

function fileOnChange(p_FileEvent, p_Event, p_FileControl, p_SiteFormID, p_KeyID, p_FieldID) {
    if ($(p_FileEvent).val() != "") {
        UploadFileAsync(p_Event, p_FileControl, p_SiteFormID, p_KeyID, p_FieldID);
        $(p_FileEvent).val("");
    }
}

function UploadFileAsync(p_Event, p_FileControl, p_SiteFormID, p_KeyID, p_FieldID) {
 var m_Value = "";
    if (p_KeyID == "") {
        alert("ControlRef is null");
        return;
    }
    else {
       
        if ($("#txt" + p_KeyID).length != 0) {
            if ($("#txt" + p_KeyID).val() != "") {
                m_Value = $("#txt" + p_KeyID).val();
            }
        }
        if ($("#sel" + p_KeyID).length != 0) {
            if ($("#sel" + p_KeyID).val() != "") {
                m_Value = $("#sel" + p_KeyID).val();
            }
        }
        if ($("#TitleHid" + p_KeyID).length != 0) {
            if ($("#TitleHid" + p_KeyID).val() != "") {
                m_Value = $("#TitleHid" + p_KeyID).val();
            }
        }
        if (m_Value == "") {
            alert(GetLanguage(p_KeyID) + " is null");
            return;
        }
    }
    var formData = new FormData();
    //抓取File Control中的檔案
    var file = $("#" + p_FileControl)[0].files[0];
    formData.append("file", file);
    var m_Employee = GetEmployeeInfo();
    formData.append("Employee", JSON.stringify(m_Employee));
    formData.append("SiteFormID", p_SiteFormID);
    formData.append("KeyID", m_Value);
    formData.append("FieldID", p_FieldID);
    formData.append("RequestType", "file");
    $.ajax({
        type: 'post',
        url: 'AjaxUpload.aspx',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.isSuccess) {
                alert('succes!!');
                GetFileFolders(p_Event, p_SiteFormID, m_Value, p_FieldID);
            }
            else {
                alert(response.LogMessage);
            }
        },
        error: function (error) {
            alert("errror");
        }
    });
}
function DownloadDOC(p_FileKey, p_SiteFormID) {
    p_dlLink = "DownloadPage.aspx?mode=download&FileKey=" + p_FileKey + "&SiteFormID=" + p_SiteFormID;
    var $ifrm = $("<iframe id='" + p_FileKey + "' style='display:none' />");
    $ifrm.attr("src", p_dlLink);
    $ifrm.appendTo("body");
    $ifrm.load(function () {
        alert('Failed to download!!FileKey:' + p_FileKey + ";MSG:" + $("#" + p_DocID).contents().find("#DownErr" + p_FileKey).text());
    });
}

//Casper Add
function ViewerDOC(p_FileKey, p_SiteFormID) {
    var mobiles = new Array
            (
                "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
                "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
                "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
                "phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
                "mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
                "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
                "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
                "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
                "sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
                "iPod","iPad", "incognito", "webmate", "dream", "cupcake", "webos",
                "s8000", "bada", "googlebot-mobile"
            )

    var ua = navigator.userAgent.toLowerCase();
    var isMobile = false;
    for (var i = 0; i < mobiles.length; i++) {
        if (ua.indexOf(mobiles[i]) > 0) {
            isMobile = true;
            break;
        }
    }

    if (isMobile) {
         //尚未開放
        //var m_ScrHeight = window.screen.height;
        //var m_OpenHeight = m_ScrHeight - m_ScrHeight / 6;
        //var m_iTop = (m_ScrHeight - m_OpenHeight) / 4;
        //var m_ScrWidth = window.screen.width;
        //var m_OpenWidth = m_ScrWidth - m_ScrWidth / 8;
        //var m_iLeft = (m_ScrWidth - m_OpenWidth) / 2;
        //m_FormPath = "Viewer.aspx?mode=download&FileKey=" + p_FileKey + "&SiteFormID=" + p_SiteFormID;
        //var m_FormParam = 'width=' + m_OpenWidth.toString() + ',height=' + m_OpenHeight + ', left = ' + m_iLeft + ',top=' + m_iTop + ',  location=no,toolbar=no,menubar=no,scrollbars=yes';
        //window.open(m_FormPath, 'PreviewForm', m_FormParam, true);
        alert('No Support to Download for Mobile Device!');
    } else {
        p_dlLink = "DownloadPage.aspx?mode=download&FileKey=" + p_FileKey + "&SiteFormID=" + p_SiteFormID;
        var $ifrm = $("<iframe id='" + p_FileKey + "' style='display:none' />");
        $ifrm.attr("src", p_dlLink);
        $ifrm.appendTo("body");
        $ifrm.load(function () {
            alert('Failed to download!!FileKey:' + p_FileKey + ";MSG:" + $("#" + p_DocID).contents().find("#DownErr" + p_FileKey).text());
        });
    }
}

function OpenImage(p_FileKey, p_SiteFormID) {
    //視窗的水平位置;
    var m_ScrHeight = window.screen.height;
    var m_OpenHeight = m_ScrHeight - m_ScrHeight / 6;
    var m_iTop = (m_ScrHeight - m_OpenHeight) / 4;
    var m_ScrWidth = window.screen.width;
    var m_OpenWidth = m_ScrWidth - m_ScrWidth / 8;
    var m_iLeft = (m_ScrWidth - m_OpenWidth) / 2;
    var m_FormPath = "ShowImage.aspx?FileKey=" + p_FileKey + "&SiteFormID=" + p_SiteFormID;
    var m_FormParam = 'width=' + m_OpenWidth.toString() + ',height=' + m_OpenHeight + ', left = ' + m_iLeft + ',top=' + m_iTop + ',  location=no,toolbar=no,menubar=no,scrollbars=yes';
    window.open(m_FormPath, p_SiteFormID, m_FormParam, true);
}
function CheckOpenWindows(p_WinName) {
    var m_isOpen = false;
    $.each(g_arrOpenWindows, function (Index, Window) {
        if (Window.name == p_WinName) {
            m_isOpen = true;
            Window.close();
        }
    });
    return m_isOpen;
}

function ExportExcel(p_EventID, p_SiteFormID, p_ControlRef) {
    var m_Entity = GeneratorAllEntity("BaseCtrl", "Q");
    var m_Title = $('#lblSiteForm' + p_SiteFormID).text();
    var m_Controlref = $(this).attr("controlref");
    var m_Employee = GetEmployeeInfo();
    p_dlLink = "DownloadPage.aspx?mode=ExportExcel&EventID=" + p_EventID + "&Entity=" + JSON.stringify(m_Entity) + "&Employee=" + JSON.stringify(m_Employee) + "&Language=" + $('#selLanguage').val() + "&SiteFormID=" + m_Title + "&Controlref=" + p_ControlRef;
    var $ifrm = $("<iframe id='" + p_EventID + "' style='display:none' />");
    $ifrm.attr("src", p_dlLink);
    $ifrm.appendTo("body");
    $ifrm.load(function () {
        alert('Failed to download!!EventID:' + p_EventID + ";MSG:" + $("#" + p_EventID).contents().find("#DownErr" + p_EventID).text());
    });
}

function QueryOnChange(p_TargetID, p_mode) {
    var m_TargetID = p_TargetID;
    var m_Target = $("#" + p_TargetID);
    if (m_Target.attr("selecteddata") != undefined) {
        $.each($.parseJSON($(m_Target).attr("selecteddata")), function (FieldID, Value) {
            if ($(m_Target).attr("fieldid") != FieldID) {
                try {
                    var m_ObjField = $(m_Target).closest('div').find("label[fieldid='" + FieldID + "']");
                    $.each(m_ObjField, function (index, Obj) {
                        $(Obj).text(Value);
                    });
                    if (m_ObjField.length == 0) {
                        if ($(m_Target).closest('table').find("#lbl" + FieldID).length != 0) {
                            $(m_Target).closest('table').find("#lbl" + FieldID).text(Value);
                        }
                        else {
                            $(m_Target).closest('table').find("img").after("<label id='lbl" + FieldID + "'>" + Value + "</label>");
                        }
                    }
                }
                catch (e) {
                }
            }
        });
    }
}

function OnChangeSystem3() {
    var m_Employee = GetEmployeeInfo();
    var m_Entity = {};
    m_Entity["System1"] = $("#selSystem1").val();
    m_Entity["System3"] = $("#selSystem3").val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page+"/GetIssueOwner",
        data: JSON.stringify({ "p_Employee": m_Employee, "p_Entity": m_Entity }),
        dataType: "json",
        success: function (Result) {
            if (Result.d != null) {
                $("#disCase_OwnerALL").text(Result.d.ResultEntity.Table[0].EmployeeName);
            }
        }
    });
}
function SelectOnChange(p_Even, p_EventID, p_Param, p_selQID,  p_mode) {
    try {
        var m_Entity = {};
        var m_PageIndex = "";
        var m_ActionRef = null;
        var m_Employee = GetEmployeeInfo();
        var m_ChangeObj = "";

        var m_SelectText = "";
        var m_SelectValue = "";
        if (p_Param != "") {
            m_ChangeObj = p_Param.split(":")[0];
            if (p_Param.split(":").length > 1) {
                var m_SelectParam = p_Param.split(":")[1];
                 m_SelectValue = m_SelectParam.split(",")[0];
                 m_SelectText = m_SelectParam.split(",")[1];
            }
        }
        var m_EvenMode = $(p_Even).attr("mode");
        if ($("#" + p_Even.id).length != 0) {
            m_Entity[p_Even.id.replace('sel', '').replace(m_EvenMode, '')] = $("#" + p_Even.id).val();
        }
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: g_Page+"/ActionModel",
            data: JSON.stringify({ "p_Employee": m_Employee, "p_EventID": p_EventID, "p_Entity": m_Entity, "p_PageIndex": m_PageIndex, "p_ActionRef": m_ActionRef }),
            dataType: "json",

            success: function (Result) {
                if (Result.d != null) {
                    if (Result.d.isSuccess) {
                        var m_ResultEntity = Result.d.ResultEntity.Table;
                        if (m_ResultEntity.length != 0) {
                            var m_targetObjs = [];
                            var m_targetObj = {};
                            $.each(m_ChangeObj.split(','), function (key, value) {
                                var m_objtarget = null;
                                m_targetObj = {};
                                if ($("#" + m_EvenMode + "dis" + value).length != 0) {
                                    m_objtarget = $("#" + m_EvenMode + "dis" + value);
                                }
                                else if ($("#" + m_EvenMode + "sel" + value).length != 0) {
                                    m_objtarget = $("#" + m_EvenMode + "sel" + value);
                                }
                                m_targetObj["object"] = m_objtarget;
                                m_targetObj["Name"] = value;
                                m_targetObjs.push(m_targetObj);
                            });
                            $.each(m_targetObjs, function (Index, Obj) {
                                if ($(Obj["object"]).prop("nodeName") == "SELECT") {
                                    $(Obj["object"]).empty();
                                    $(Obj["object"]).attr("selQID", p_selQID);
                                    $(Obj["object"]).attr("selText", m_SelectText);
                                    $(Obj["object"]).attr("mode", p_mode);
                                    var m_IsOne = true;
                                    if ($(Obj["object"]).attr("DefVal") == "null") {
                                        if (m_ResultEntity.length != 1) {
                                            $(Obj["object"]).append("<option value=\"\"></option>");
                                            m_IsOne = false;
                                        }
                                    }

                                    $.each(m_ResultEntity, function (ResultIndex, ResultObj) {
                                        $(Obj["object"]).append("<option value=\"" + ResultObj[m_SelectValue] + "\">" + ResultObj[m_SelectText] + "</option>");
                                    });
                                    if (m_IsOne) {
                                        if ($(Obj["object"]).attr("onchange") != undefined) {
                                            $(Obj["object"]).trigger("change");
                                        }
                                    }
                                }
                                else {
                                    $(Obj["object"]).text(m_ResultEntity[0][Obj["Name"]]);
                                }
                            });
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
    catch (e) {
        alert("ControlRef Setting error!! FieldID:" + p_Even.id.replace('sel', ''));
    }
}
var g_opWindow = null;
//開啟查詢視窗
function OpenQueryForm(p_TargetID, p_ControlType, p_QueryID, p_ControlRef, p_QryParam, p_QueryMode) {
    if (!(g_isError)) {

        var m_TargetID = p_TargetID;
        
        var iLeft = (window.screen.availWidth) / 4;   //視窗的水平位置;
        var m_Employee = GetEmployeeInfo();

        var m_ControlType = "&ControlType=" + p_ControlType;
        var m_FormPath = '/KF_Web/QueryForm.aspx?QueryMode=' + p_QueryMode + '&Language=' + $('#selLanguage').val() + '&EventElement=' + m_TargetID + '&QueryID=' + p_QueryID + '&ControlRef=' + p_ControlRef + '&ControlType=' + p_ControlType;
      
        if (p_QryParam != "") {
            m_FormPath += "&QueryParam=" + p_QryParam;
        }
      
        if (g_opWindow == null) {
            PopupCenter(m_FormPath, "QueryForm");
        }
        else {
            try {
                var m_WinName = g_opWindow.name;
                if (m_WinName == "") {
                    g_opWindow = window.open(m_FormPath, 'QueryForm', m_FormParam,true);
                }
                g_opWindow.location.href = m_FormPath;
                g_opWindow.focus();
            }
            catch (e) {
                g_opWindow = window.open(m_FormPath, 'QueryForm', m_FormParam, true);
            }
        }
    }
}

function OpenMaintain(p_EventID, p_FieldID, p_EventActionType, p_LanguageValue, p_QueryMethod, p_EventFollow) {
    var m_MaintainPara = { "EventID": p_EventID, "FieldID": p_FieldID, "EventActionType": p_EventActionType, "LanguageValue": p_LanguageValue, "QueryMethod": p_QueryMethod, "EventFollow": p_EventFollow };

    
    if (p_FieldID != "Add") {
        if ($.cookie('btnAction') != null) {
            if ($.cookie("FieldID") != null) {
                $.cookie("Scroll", $("#" + $.cookie("FieldID").toString() + "scroll").scrollTop());
            }
            if ($.cookie("TRsel") != null) {
                if ($("tr.Sel") != null) {
                    $.cookie("TRsel", $("tr.Sel")[0].id);
                }
            }
        }
    }
    g_isError = null;
    g_Valid = null;
    var m_Entity = {};
    var m_TempKey = "";
    if ($("#hidTempKey").length != 0) {
        m_TempKey = $("#hidTempKey").val();
    }
    if (p_EventActionType != "Add") {
        if ($(".Sel").length == 0) {
            if (p_EventActionType != "") {
                ShowMessage("MSG00004");
                return false;
            }
        }
        else {
            if (p_EventActionType == "Reflash") {
                m_Entity = GeneratorAllEntity("BaseCtrl", "");
            }
            else {
                if ($("#tabSearch").attr('GridKey') != "" && $("#tabSearch").attr('GridKey') != undefined) {
                    $.each($("#tabSearch").attr('GridKey').split(','), function (key, value) {
                        m_Entity[value] = $(".Sel td[fieldid='" + value + "']").text();
                    });
                }
                else {
                    $.each($(".Sel td "), function (key, value) {
                        m_Entity[$(value).attr("fieldid")] = $(value).text().trim();
                    });
                }
            }
        }
    }
   
    $('.timeout').block({
        message: '<img src="/KF_Web/Img/loading.gif" /><H1>Processing...</H1>',
        showOverlay: false,
        centerY: false,
        css: {
            top: '20%',
            opacity: .7
        }
    });
    var m_CssContent = "";

    if (CheckUndefined($("#content").attr('CssContent'))) {
        m_CssContent = $("#content").attr('CssContent');
    }
    var p_Employee = GetEmployeeInfo();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page+"/GeneratorMaintain",
        data: JSON.stringify({ "p_Employee": p_Employee, "p_SiteFormID": $("#txtSiteFormID").val(), "p_EventID": p_EventID, "p_FieldID": p_FieldID, "p_ActionMode": p_EventActionType, "p_Language": $('#selLanguage').val(), "p_QueryMethod": p_QueryMethod, "p_Entity": m_Entity, "p_TempKey": m_TempKey }),
        dataType: "json",
        success: function (Result) {
            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    var m_Html = "";
                    m_Html += Result.d.ResultEntity;
                    $('.Main').block({
                        theme: true,
                        message: "<div class='panel divMaintainForm' id='MaintainForm'> <section class='" + m_CssContent + "' id='content'>" + m_Html + "</section><div id='divAttach'><div><input id='hidMaintainParam' value='" + JSON.stringify(m_MaintainPara) + "' type='hidden' /> </div>",
                        showOverlay: false,
                        centerY: false,
                        centerX: true,
                        draggable: true,
                        title: $("#PanelTitle").text() ,
                        themedCSS: {
                            opacity: 1,
                            width: '85%',
                            height: '800px',
                            cursor: 'initial',
                            top: '5%'
                        }
                    });

//                    $('.Main').block({
//                        message: "<div class='panel divMaintainForm' id='MaintainForm'> <section class='" + m_CssContent + "' id='content'>" + m_Html + "</section><div id='divAttach'><div><input id='hidMaintainParam' value='" + JSON.stringify(m_MaintainPara) + "' type='hidden' /> </div>",
//                        showOverlay: true,
//                        centerY: true,
//                        theme: true,
//                        title: "    ",
//                        draggable: true,
//                        themedCSS: {
//                            width: '95%',
//                            top: '30%',
//                            left: '20%'
//                        }
//                    });

                    $(".scroll").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });
                    $('#DtlScroll').on('scroll', function () {
                        $('#DtlHeadScroll').scrollLeft($(this).scrollLeft());
                    });
                    $('#DtlHeadScroll').on('scroll', function () {
                        $('#DtlScroll').scrollLeft($(this).scrollLeft());
                    });
                    setMaxWidth();
                    setTimeout(' SetPreviewForm(\".pull-right\");', 100);
                    setTimeout('CheckFormTransfer();', 300);
                    $('.timeout').unblock({ fadeOut: 500 });
                    if (p_EventActionType == "Reflash") {
                        //setTimeout('ReflashGrid();', 100); //更新查詢頁資料GroupByGrid
                        setTimeout('RefreshbtnAction();', 100);
                    }
                    setTimeout('setSortable()', 100);
                    setTimeout('AddEventToDropFile()', 100);
                    setTimeout('SetHtmlEditor()', 100);
                    setTimeout('SetMaintainCustDiv()', 100);
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

function SetMaintainCustDiv() {

    if ($("#hidIsMobile").length != 0) {
        if ($("#hidIsMobile").val() == "Y") {
            var m_min_width = (parseInt($(window).width()) * 0.85).toString();
            if (parseInt(m_min_width) <= 600) {
                m_min_width = "585";
            }
            $("th").css("height", "60px")
            $(".TitleGridDivHead").css("min-width", m_min_width + "px");
            $(".TitleGridDivBody").css("min-width", m_min_width + "px");
            $(".TitleGridDivHead").css("width", m_min_width + "px");
            $(".TitleGridDivBody").css("width", m_min_width + "px");
//            $("th").css("height", "60px")
//            $(".TitleGridDivHead").css("min-width", "640px");
//            $(".TitleGridDivBody").css("min-width", "640px");
//            $(".TitleGridDivHead").css("width", "640px");
//            $(".TitleGridDivBody").css("width", "640px");
            $(".MaintainTbHead").css("min-width", "1000px");
            $(".MaintainTbBody").css("min-width", "1000px");

            $(".TitleGridDivHead").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });
            $(".TitleGridDivBody").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });


            $('.TitleGridDivHead').on('scroll', function () {
                $('.TitleGridDivBody').scrollLeft($(this).scrollLeft());
            });
            $('.TitleGridDivBody').on('scroll', function () {
                $('.TitleGridDivHead').scrollLeft($(this).scrollLeft());
            });

            $(".divMaintainForm select").css("width", "450px");
           // $("select option").prop("style", "width:450px;white-space: pre-line;");
        }
    }
}
function ChkCiteFile(p_FilePath) {

    if (!$('head > script[src="' + p_FilePath + '"]').length) {
        $('head').append($('<script />').attr('src', p_FilePath));
    }
    else {
        $('head > script[src="' + p_FilePath + '"]').remove();
        $('head').append($('<script />').attr('src', p_FilePath));
    }
}
function SetHtmlEditor() {
    var m_EditorLang = "Scripts/Editor/lang/zh-cn/zh-cn.js";

    ChkCiteFile("Scripts/Editor/umeditor.js");
    ChkCiteFile(m_EditorLang);
    if ($('.HtmlEditor').length != 0) {
        $.each($('.HtmlEditor'), function (index, Item) {
            if ($("#" + Item.id).attr("Editored") != "Y") {
                $("#" + Item.id).attr("Editored", "Y");
                UM.getEditor(Item.id);
            }
        });
    }
    var m_LanguageSetting = g_optEN;
    switch ($('#selLanguage').val()) {
        case "TW":
            m_LanguageSetting = g_optTW;
            break;
        case "US":
            m_LanguageSetting = g_optEN;
            break;
    }
    $.each($(".divMaintainForm input[TextType='Date']"), function (key, value) {
        $("#" + value.id).datepicker(m_LanguageSetting);
    });
}

function AddEventToDropFile() {
    if ($('.DropFile').length != 0) {
        $.each($('.DropFile'), function (index, Item) {
            Item.addEventListener("dragover", function (e) {
                e = e || event;
                e.preventDefault();
            }, false);
            Item.addEventListener("drop", function (e) {
                e = e || event;
                e.preventDefault();
            }, false);
        });

        $('.DropFile').on({
            dragenter: function (e) {
                $(this).css('background-color', 'lightBlue');
                e.preventDefault();
                e.stopPropagation();
            },
            dragleave: function (e) {
                $(this).css('background-color', '');
            },
            drop: function (e) {
                $(this).css('background-color', '');
                if (e.originalEvent.dataTransfer) {
                    if (e.originalEvent.dataTransfer.files.length) {
                        e.preventDefault();
                        e.stopPropagation();
                        /*UPLOAD FILES HERE*/
                        DropUpload(e.originalEvent.dataTransfer.files, this);
                    }
                }
            }
        });
    }
}

function DropUpload(p_files,p_Event) {
    var m_Value = "";
    var p_KeyID=$("#"+p_Event.id).attr("KeyID");
    var p_FieldID = $("#" + p_Event.id).attr("FieldID");

     if ($("#txt" + p_KeyID).length != 0) {
            if ($("#txt" + p_KeyID).val() != "") {
                m_Value = $("#txt" + p_KeyID).val();
            }
        }
        if ($("#sel" + p_KeyID).length != 0) {
            if ($("#sel" + p_KeyID).val() != "") {
                m_Value = $("#sel" + p_KeyID).val();
            }
        }
        if ($("#TitleHid" + p_KeyID).length != 0) {
            if ($("#TitleHid" + p_KeyID).val() != "") {
                m_Value = $("#TitleHid" + p_KeyID).val();
            }
        }
        if (m_Value == "") {
            alert(GetLanguage(p_KeyID) + " is null");
            return;
        }
    alert('Upload ' + p_files.length + ' File(s).');
    if (p_files.length != 0) {
        var formData = new FormData();
        $.each(p_files, function (index, File) {
            var file = File;
            formData.append("file" + index.toString(), file);
         });
        
        var m_Employee = GetEmployeeInfo();
        formData.append("Employee", JSON.stringify(m_Employee));
        formData.append("SiteFormID", $("#txtSiteFormID").val());
        formData.append("KeyID", m_Value);
        formData.append("RequestType", "file");
        formData.append("FieldID", p_FieldID);
        $.ajax({
            type: 'post',
            url: 'AjaxUpload.aspx',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.isSuccess) {
                    alert('succes!!');
                    GetFileFolders(p_Event, $("#txtSiteFormID").val(), m_Value, p_FieldID);
                }
                else {
                    alert(response.LogMessage);
                }
            },
            error: function (error) {
                alert("errror");
            }
        });
    }
}

function CheckFormTransfer() {
    if ($("#FormTransfer").length != 0) {
        $("#FormTransfer").dialog({
            autoOpen: false
        });
    }
}
function setSortable() {
    if ($('.DtlTable').length != 0) {

        $('.DtlTable').sortable({
            containerSelector: 'table',
            itemPath: '> tbody',
            itemSelector: '.DtlRows',
            placeholder: '<tr class="placeholder"/>',
            onDragStart: function ($item, container, _super, event) {
                $item.css({
                    height: $item.outerHeight(),
                    width: $item.outerWidth()
                })
                $item.addClass(container.group.options.draggedClass);
                $("body").addClass(container.group.options.bodyClass);
                $("#DtlScroll").css("height", "100%");
            },
            onDrop: function ($item, container, _super, event) {
                $item.removeClass(container.group.options.draggedClass).removeAttr("style")
                $("body").removeClass(container.group.options.bodyClass);
                var m_IndexPlus = 1;
                $.each($("#DtlTable tr .RowIndex"), function (index, tr) {
                    var m_Index = LeftPad((index + m_IndexPlus).toString(), 3);
                    if ($(tr).parent().css("display") == "none") {
                        m_IndexPlus--
                    }
                    else {
                        $(tr).text(LeftPad(m_Index, 3));
                    }
                });
                $("#DtlScroll").css("height", "550px");

            }
        });
    }
}

function ReflashGrid() {
    if ($('.DtlRows').length != 0) {

        var m_TagerTbID = $(".Sel").closest('table')[0].id

        var m_GridDtls = $("#" + m_TagerTbID + " tr");
        var m_GridDtlHtml = $(m_GridDtls[0].outerHTML);
        $("#" + m_TagerTbID).empty();

        var m_Entitys = {};
        m_Entitys = GetDtlRowEntitys(m_Entitys, "Reflash");
        var TrCount = 1;
        $.each(m_Entitys.Dtls, function (key, Entity) {
            var m_trID = "tr" + m_GridDtlHtml.attr("fieldid") + TrCount;
            m_GridDtlHtml.attr("id", m_trID);
            $.each(m_GridDtlHtml.find("td"), function (index, td) {
                if (Entity[$(td).attr("fieldid")] != undefined) {
                    $(td).text(Entity[$(td).attr("fieldid")]);
                }
            });
            if (TrCount == 1) {
                m_GridDtlHtml.attr('class', 'Sel');
            }
            else {
                m_GridDtlHtml.attr('class', '');
            }
            $("#" + m_TagerTbID).append(m_GridDtlHtml[0].outerHTML);
            TrCount++;
        });
    }
    else {
        var m_Entity = GeneratorAllEntity("BaseCtrl", "");
        if ($('.DtlRows').length == 0) {//更新查詢頁資料單檔單筆
            $.each($(".Sel td"), function (key, value) {

                if (m_Entity[$(value).attr("fieldid")] != undefined) {
                    var m_Text = m_Entity[$(value).attr("fieldid")]
                    if (m_Text.length >= 50) {
                        $(value).after($(value).clone().attr("title", m_Text).show().attr("fieldid", "display" + $(value).attr("fieldid")).text(m_Text.substr(0, 50) + "...").attr("omit", "Y"));
                        $(value).hide();
                        $(value).text(m_Text);
                    }
                    else {
                        $(value).text(m_Text);
                    }
                }
                if ($(value).attr("omit") != undefined) {
                    var m_Text = m_Entity[$(value).attr("fieldid").replace("display", "")];
                    if (m_Text) {
                        if (m_Text.length >= 50) {
                            $(value).attr("title", m_Text);
                            $(value).text(m_Text);
                        }
                        else {
                            $(value).attr("title", "");
                            $(value).text(m_Text);
                        }
                    }
                }

            });
        }
    }
}
function setMaxWidth() {
    setTimeout("$(\"div[id^='Dtl']\").width($(\".blockMsg\").width())", 50);
    if ($("#BaseCtrl").width() - 150 > $("#DtlHeadTable").width()) {
       // setTimeout("$(\"table[id^='Dtl']\").width($(\"#BaseCtrl\").width()-150);$(\"table[id^='Dtl']\").css(\"minWidth\", $(\".blockMsg\").width());$(\"#DtlPanel\").width( $(\".blockMsg\").width())", 50);
    }
}

var g_AddRowsCount = 5;
function AddRows(p_TableId, p_ActionMode) {
    var m_Entity = {};
    ShowDetilMaintain(p_ActionMode, "Add", p_TableId, m_Entity);
}

function LeftPad(p_str, p_max) {
    p_str = p_str.toString();
    return p_str.length < p_max ? LeftPad("0" + p_str, p_max) : p_str;
}

function SetPreviewForm(p_Class) {
    if ($("#hidTempKey").length != 0) {

        var m_Mode = $("#hidMode").val();
        $.each($(p_Class), function (key, value) {
            $(value).html('<div class="' + m_Mode + '" ><span class="panel-title">' + m_Mode + ' Mode</span> </div>')
        });
        $(".panel-heading").css("background", "#FF9797")
    }
}

jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // NOTE Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

function QueryIcoCtrl(p_event, p_Action, p_FieldID) {
    var m_lblCss = "Class='QueryIco'";
    if ($(p_event).prop("class").indexOf("fa-arrow-up") != -1 || p_Action == "up") {
        $("#simpQ").remove();
        $(p_event).prop("class", "fa fa-arrow-down hand")
        $(".Maintain #BaseCtrl").hide();

        var m_Html = "";
        $.each($(".Maintain #BaseCtrl td"), function (key, value) {
            if ($(value).prop("class") != "between" && $(value).prop("class") != "qry") {
                var m_TDObj = $(value.outerHTML);
                m_TDObj.css("width", "");
                if (m_TDObj.prop("class") == "lbl") {
                    $(m_TDObj).attr("onclick", "SetQueryFocus(\"" + $(m_TDObj)[0].firstChild.id + "\")");
                    $(m_TDObj).attr("class", "hand");
                    m_Html += m_TDObj[0].outerHTML;
                }
                else {
                    var m_InputCount = 0;
                    var m_InputHtml = "";
                    $.each(m_TDObj.find('input'), function (index, item) {
                        var m_colon = "";
                        if (m_InputCount == 0) {
                            m_colon = "：";
                        }
                        if (($(item).prop("class").indexOf("hasDatepicker") != -1) && (m_InputCount != 0)) {
                            m_colon = "～";
                        }
                        m_InputHtml += "<td><label " + m_lblCss + ">" + m_colon + $("#" + $(item)[0].id).val() + "</label></td>";
                        m_InputCount++;
                    });
                    $.each(m_TDObj.find('select'), function (index, item) {
                        var m_colon = "";
                        if (m_InputCount == 0) {
                            m_colon = "：";
                        }
                        if (($(item).prop("class").indexOf("hasDatepicker") != -1) && (m_InputCount != 0)) {
                            m_colon = "～";
                        }
                        m_InputHtml += "<td><label " + m_lblCss + ">" + m_colon + $("#" + $(item)[0].id + " option:selected").text() + "</label></td>";
                        m_InputCount++;
                    });

                    $.each(m_TDObj.find('.SiteFormStatus'), function (index, item) {
                        var m_colon = "";
                        if (m_InputCount == 0) {
                            m_colon = "：";
                        }
                        if ($(item).attr("sel") == "Y") {
                            m_InputHtml += "<td><label onmouseenter='ShowStatus(event,\"" + $(item)[0].id + "\")' " + m_lblCss + ">" + m_colon + $(item).text() + "</label></td>";
                        }
                        m_InputCount++;
                    });
                    m_Html += m_InputHtml;
                }
            }
        });

        $(".Maintain .panel-body").append("<table id='simpQ' style='border-color: black; width: 100%; font-size: small;' ><tr>" + m_Html + "</tr></table>");
    }
    else {
        $(p_event).prop("class", "fa fa-arrow-up hand")
        $("#simpQ").remove();
        $(".Maintain #BaseCtrl").show();
    }

    $(".scroll").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });
    $(".scroll").getNiceScroll().resize();

    if ($("#hidIsMobile").length != 0) {
        if ($("#hidIsMobile").val() == "Y") {
            $(".divGridBody").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });
            $(".divGridHead").niceScroll({ autohidemode: false, touchbehavior: true, cursorcolor: "#B0E2FF", cursoropacitymax: 0.9, cursorwidth: 7 });
            $(".divGridBody").getNiceScroll().resize();
            $(".divGridHead").getNiceScroll().resize();
        }
    }     
}

function CloseStatus() {
    $.unblockUI();
}

function ShowStatus(p_event, p_Id) {
    var m_left = $(window).width() - ($(window).width() - p_event.pageX) - 15;
    var m_top = $(window).height() - ($(window).height() - p_event.pageY) - 10;
    var m_StatusTable = "<table onmouseleave='CloseStatus()' >{0}</table>";
    var m_tr = "<tr><td>{0}</tb></tr>";
    var m_trs = "";
    $.each($($("#" + p_Id).parent().html()), function (Index, Item) {
        if (Item.nodeName == "LABEL") {
            m_trs += String.format(m_tr, Item.outerHTML);
        }
    });

    m_StatusTable = String.format(m_StatusTable, m_trs);
    $.blockUI({
        overlayCSS: { backgroundColor: '#FFF', opacity: .2, cursor: 'default' },
        // showOverlay: false, 

        centerY: false,
        centerX: false,
        message: m_StatusTable,
        css: { top: (m_top).toString() + 'px', left: (m_left).toString() + 'px', width: 'auto', border: '1px solid', cursor: 'default' }
    });
    $('.blockOverlay').attr('title', '').click($.unblockUI);
}

function SetQueryFocus(p_lblID) {
    $("#imgQIco").prop("class", "fa fa-arrow-up hand")
    $("#simpQ").remove();
    $(".Maintain #BaseCtrl").show();
    try {
        $($($('#' + p_lblID).parent().next()).find('input')[0]).setfocus();
        $($($('#' + p_lblID).parent().next()).find('select')[0]).setfocus();
    }
    catch (e) {

    }
}

function PopupCenter(p_url, p_title) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    p_width = width * 0.7;
    p_height = height * 0.95;
    var left = ((width / 2) - (p_width / 2)) + dualScreenLeft;
    var top = ((height / 2) - (p_height / 2)) + dualScreenTop;
    var newWindow = window.open(p_url, p_title, 'scrollbars=yes, width=' + p_width + ', height=' + p_height + ', top=' + top + ', left=' + left);
    // Puts focus on the newWindow
    if (window.focus) {
        g_opWindow =newWindow.focus();
    }
}



function WinOpen(p_url, p_title, p_width, p_height) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
   
    var left = ((width / 2) - (p_width / 2)) + dualScreenLeft;
    var top = ((height / 2) - (p_height / 2)) + dualScreenTop;
    var newWindow = window.open(p_url, p_title, 'scrollbars=yes, width=' + p_width + ', height=' + p_height + ', top=' + top + ', left=' + left);
    
}



function unblockByClass(p_Class) {
    $('#' + p_Class).unblock({ fadeOut: 10 });
}
function DetailSave(p_ActionMode, p_RowAction, p_TableId, p_DtlTRSeq) {
    var m_Entity = {};
    var TargetTable = p_TableId.replace("DtlTable", "DtlTD");

    if (ValidAll(TargetTable, 'Dtl')) {
        m_Entity = GeneratorAllEntity(TargetTable, "Dtl");
        var m_RowIndex = $("#" + TargetTable + " tr[class='DtlRows']").length;
        var m_NewRows = "";
        var m_NewTDs = "";
        m_NewTDs = "";
        var m_isSubmit = true;
        if (p_RowAction == "Add") {
            var m_RowKeys = [];
            $.each($("#" + TargetTable + " .DtlTable tr[id!='DtlDefRow']"), function (TRindex, TR) {//取出該Details控制項所有TR
                var m_RowKeyValue = "";
                $.each($(TR).find("td[rowkey='1']"), function (TDindex, TD) {//取出所有TD 判斷Key 加入陣列
                    m_RowKeyValue += $(TD).text();
                });
                m_RowKeys.push(m_RowKeyValue);
            });
            var m_ModifyValue = "";
            var m_CtrlText = "";
            $.each(m_Entity, function (Entity, Value) {
                var m_isKey = false;
                if ((Value["ModifyKey"] != undefined)) {
                    m_ModifyValue += Value["value"].toString();
                    m_CtrlText += Value["CtrlText"].toString()+",";
                }
            });
            if (jQuery.inArray(m_ModifyValue, m_RowKeys) != -1) {
                m_isSubmit = false;
                alert(m_CtrlText + " already exists!!")
            }
        }
        if (m_isSubmit) {
            $.each($($("#" + TargetTable + " tr[id='DtlDefRow']").html()), function (key, value) {
                var m_FieldID = $(this).attr("Field");
                var m_Obj = $($(this)[0].outerHTML);
                if (m_FieldID == "DtlTRSeq") {
                    var m_SeqIndex = "";
                    if (p_RowAction == "Add") {
                        m_SeqIndex = LeftPad(m_RowIndex.toString(), 3);
                    }
                    else {
                        m_SeqIndex = p_DtlTRSeq;
                    }
                    m_Obj.text(m_SeqIndex);
                    m_Obj.attr("id", m_Obj.attr("id").replace("000", m_SeqIndex));
                    m_Obj.attr("index", m_SeqIndex);
                    m_NewTDs += m_Obj[0].outerHTML;
                }
                else {

                    if (m_Obj.prop('class') == "DelChk") {
                        m_NewTDs += m_Obj[0].outerHTML;
                    }
                    else {
                        var m_Rowkey = $(this).attr("ModifyKey");

                        var m_Value = m_Entity[m_FieldID];
                        var m_DetValue = m_Value["value"].toString();
                        var m_ValueType = "text";
                        switch (m_Value["type"].toString()) {
                            case "text":
                                m_Obj.text(m_DetValue);
                                break;
                            case "checkbox":
                                var m_ChkObj = $(m_Obj.html());
                                if (m_DetValue == "1") {
                                    m_ChkObj.prop('checked', true);
                                    m_ChkObj.attr('checked', true);
                                }
                                else {
                                    m_ChkObj.prop("checked", false);
                                    m_ChkObj.attr('checked', false);
                                }
                                m_Obj.html("");
                                m_Obj.append(m_ChkObj);

                                break;
                            case "MultiSelect":
                                //var m_SelectItem = m_Value["value"].toString().split('::');
                                //m_DetValue = m_SelectItem[0].toString();
                               // m_Obj.text(m_SelectItem[1].toString());
                                break;
                            case "select":
                                var m_SelectItem = m_Value["value"].toString().split('::');
                                m_DetValue = m_SelectItem[0].toString();
                                m_Obj.text(m_SelectItem[1].toString());
                                break;


                            default:
                                m_Obj.text(m_DetValue);
                                break;
                        }
                        if (m_Rowkey == "1") {
                            m_Obj.attr("Rowkey", "1");
                        }

                        m_Obj.attr("value", m_DetValue);
                        m_Obj.attr("valuetype", m_ValueType);


                        m_NewTDs += m_Obj[0].outerHTML;
                    }
                }
            });

            if (p_RowAction == "Add") {
                m_NewRows += "<tr class='DtlRows' RowAction='" + p_RowAction + "' >" + m_NewTDs + "</tr>";
                $("#" + p_TableId).append(m_NewRows);
                $("#DtlScroll").animate({ scrollTop: $("#DtlTable").height() }, 500);
            }
            else {
                if ($($("#" + p_TableId + " tr")[parseInt(p_DtlTRSeq)]).length != 0) {
                    $($("#" + p_TableId + " tr")[parseInt(p_DtlTRSeq)]).html(m_NewTDs);
                }
            }
        }
    }
}

function ShowDetilMaintain(p_ActionMode,p_RowAction, p_TableId, p_Entity) {
    var m_Employee = GetEmployeeInfo();
    var m_Language = $('#selLanguage').val();
    var m_Layouts = $.parseJSON($("#" + p_TableId).attr("layout"));
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: g_Page+"/GeneratorDetails", //p_Language p_TableId
        data: JSON.stringify({ "p_Employee": m_Employee, "p_Language": m_Language, "p_ActionType": p_ActionMode, "p_RowAction": p_RowAction, "p_TableId": p_TableId, "p_Entity": p_Entity, "p_Layouts": m_Layouts }),
        dataType: "json",
        success: function (Result) {
            if (Result.d != null) {
                if (Result.d.isSuccess) {
                    $('#' + p_TableId.replace("DtlTable", "DtlTD")).block({
                        theme: true,
                        message: Result.d.ResultEntity,
                        showOverlay: true,
                        centerY: true,
                        title: "資料維護",
                        draggable: true,
                        themedCSS: {
                            width: '95%',
                            top: '30%',
                            left: '20%'
                        }
                    });
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


function ModifyDetils(p_Event, p_TableId, p_ActionMode) {
    var m_Entitys = Array();
    var m_Entity = {};
    var m_TargetTR = $(p_Event).closest('tr');

    if ($(m_TargetTR).attr("RowAction") == "Add") {
        p_ActionMode = "Add";
    }
    $.each(m_TargetTR.find('td'), function (index, td) {
        var m_field = $(td).attr("field");
        if (m_field != undefined) {
            if ($(td).attr("value") != undefined) {
                m_Entity[m_field] = $(td).attr("value");
            }
            else {
                m_Entity[m_field] = $(td).text();
            }
        }
    });
    m_Entitys.push(m_Entity);
    ShowDetilMaintain(p_ActionMode, "Edit", p_TableId, m_Entitys);
}