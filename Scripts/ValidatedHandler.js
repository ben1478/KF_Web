
var g_CheckID = "";
var g_isError = null;
var g_Valid = null;
function MappingErrType(p_Type) {
    var m_Result = "";
    switch (p_Type) {
        case "Empty":
            m_Result = "MSG00002";
            break;
    }
    return m_Result;
}

function CheckDtlRowValue() {
    var m_AllValue = "";
    var m_ChkDtl = $(".DtlTable td[rowkey=1] input");
    var m_FirstInput = "";
    if (m_ChkDtl.length != 0) {
        var m_InputCount = 0;
        $.each(m_ChkDtl, function (key, value) {
            if (CheckDtlInupt(value)) {
                if (m_InputCount == 0) {
                    m_FirstInput = value;
                }
                m_AllValue += $(value).val();
                if (m_AllValue != "") {
                    return true;
                }
                m_InputCount++;
            }
        });
        if (m_AllValue == "") {
            alert("請至少輸入一筆資料!!");
            $(m_FirstInput).setfocus();
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function CheckDtlKeyByRow() {
    var m_CheckAllTrInput = [];
    $.each($(".DtlRows "), function (trIndex, tr) {
        if (tr.id != "DtlDefRow") {
            var m_CheckTrInput = [];
            var m_ErrorEntity = {};
            var m_KeyValue = "";
            var m_AllRowkeyCount = $(tr).find("td[rowkey='1']").length;
            var m_EmptyRowkeyCount = 0;
            var m_DataRowkeyCount = 0;
            $.each($(tr).find("td[rowkey='1'] input"), function (inputIndex, input) {
                if ($(input).val() == "" && ($(input).closest('.DtlRows').find("#chkDtl").prop('checked') == false)) {
                    m_EmptyRowkeyCount++;
                    m_ErrorEntity = SetErrorEntity("Empty", $("#" + input.id));
                    m_CheckTrInput.push(m_ErrorEntity);
                }
                else {
                    if ($(input).closest('.DtlRows').find("#chkDtl").prop('checked') == false) {
                        m_DataRowkeyCount++;
                    }
                }
            });

            if (m_EmptyRowkeyCount == m_AllRowkeyCount) {
                m_CheckTrInput = [];
            }
            if (m_DataRowkeyCount == m_AllRowkeyCount) {
                $(tr).attr("licit", "Y");
            }
            else {
                $(tr).removeAttr("licit");
            }
            m_CheckAllTrInput.push.apply(m_CheckAllTrInput, m_CheckTrInput);
        }
    });
    return m_CheckAllTrInput;
}

function SetErrorEntity(p_Type,p_Item) {
    var m_ErrorEntity = {};
    m_ErrorEntity["Type"] = p_Type;
    m_ErrorEntity["Item"] = p_Item;
    return m_ErrorEntity;
}


function ValidAll(p_CheckID,p_Mode) {
    var m_CheckID = "BaseCtrl";
    var m_Mode = "";

    if (CheckUndefined(p_CheckID)) {
        m_CheckID = p_CheckID;
    }

    if (CheckUndefined(p_Mode)) {
        m_Mode = p_Mode;
    }
    if (g_isError ) {
        return false;
    }
    var m_arrErrEntity = new Array;
    var m_ChkDtl = false;
    var m_ChkDtlResult = true;
    var m_DtlInputs=null
    if ($(".DtlTable").length != 0) {
        m_ChkDtl = true;
        //檢查是否有輸入明細資料
        m_ChkDtlResult = CheckDtlRowValue();
        if (m_ChkDtlResult) {
            m_DtlInputs = CheckDtlKeyByRow();
        }
    }
    if (m_DtlInputs != null) {
        m_arrErrEntity = m_DtlInputs;
    }
    var m_ErrorEntity = {};
    if (m_ChkDtlResult) {
        $.each($(".divMaintainForm #" + m_CheckID + " input[id^='" + m_Mode + "txt']"), function (key, value) {
            if (ChechEmpty($(value))) {
                if ($(value).closest('.DtlRows').length == 0) {
                    m_ErrorEntity = SetErrorEntity("Empty", $(value));
                    m_arrErrEntity.push(m_ErrorEntity)
                }
            }
        });
        $.each($(".divMaintainForm #" + m_CheckID + " select[id^='" + m_Mode + "sel']"), function (key, value) {
            if (ChechEmpty($(value))) {
                if ($(value).closest('.DtlRows').length == 0) {
                    m_ErrorEntity = SetErrorEntity("Empty", $(value));
                    m_arrErrEntity.push(m_ErrorEntity)
                }
            }
        });
        $.each($(".divMaintainForm #" + m_CheckID + " textarea[id^='" + m_Mode + "txt']"), function (key, value) {
            if (ChechEmpty($(value))) {
                if ($(value).closest('.DtlRows').length == 0) {
                    m_ErrorEntity = SetErrorEntity("Empty", $(value));
                    m_arrErrEntity.push(m_ErrorEntity)
                }
            }
        });
        $.each($(".divMaintainForm #" + m_CheckID + " input[id^='" + m_Mode + "Qry']"), function (key, value) {
            if (ChechEmpty($(value))) {
                if ($(value).closest('.DtlRows').length == 0) {
                    m_ErrorEntity = SetErrorEntity("Empty", $(value));
                    m_arrErrEntity.push(m_ErrorEntity)
                }
            }
        });
        var ErrorCount = 0;
        if (m_arrErrEntity.length != 0) {
            var m_ErrElements = "";
            getErrMsgByErrType(m_arrErrEntity);
            $.each(m_arrErrEntity, function (key, value) {
                if (ErrorCount == 0) {
                    g_CheckID = value["Item"][0].id;
                }
                ErrCtrl(value["Item"][0].id, true);

                if ($("#lbl" + $(value["Item"]).attr("fieldid")).length != "0") {
                    m_ErrElements += $(value["Item"]).closest('div').find("label[id='" + "lbl" + $(value["Item"]).attr("fieldid") + "']").text() + ":" + value["Msg"] + "<br>";

                }
                else {
                    m_ErrElements += $($(value["Item"]).closest('td')[0].previousSibling).text() + ":" + value["Msg"] + "<br>";
                
                }
                //                if ($(value["Item"]).closest('.DtlRows').length == 0) {

                //                    m_ErrElements += $(value["Item"]).closest('div').find("label[id='" + "lbl" + $(value["Item"]).attr("fieldid") + "']").text() + ":" + value["Msg"] + "<br>";
                //                }
                //                else {
                //                    var m_RowIndex = "SEQ-" + $(value["Item"]).closest('.DtlRows').find(".RowIndex").attr("Index") + " ";
                //                    m_ErrElements += m_RowIndex + $("#" + "DtlTh" + $(value["Item"]).closest('.Dtltd').attr("field")).text() + ":" + value["Msg"] + "<br>";
                //                }
                ErrorCount++;
            });
            AlertMSG(m_ErrElements,g_CheckID,true);
            g_CheckID = "";
            g_isError = null;
            return false;
        }
        else {
            return true;
        }
    }
}

function getErrMsgByErrType(p_arrErrEntity) {
    var m_Types = [];
    $.each(p_arrErrEntity, function (key, value) {
        m_Types.push(MappingErrType(value["Type"].toString()));
    });
    var m_Languages=GetLanguageByArray($.unique(m_Types));
     $.each(p_arrErrEntity, function (key, value) {
        value["Msg"]=m_Languages[MappingErrType(value["Type"].toString())];
    });
}

//隱藏欄位及CheckBox不算輸入值
function CheckDtlInupt(p_Input) {
    if (($(p_Input).closest('.DtlRows')[0].id != "DtlDefRow")) {
        if ($(p_Input).closest('.DtlRows').find("#chkDtl").prop('checked') == false) {
            if ($(p_Input).css('display') != 'none' && $(p_Input).prop('type') != "checkbox") {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function isCheck(p_element) {
    var m_elementID = p_element;
    if ($(p_element).css("display") != "none") {//判斷控制項狀態為隱藏的話不檢核
        if ($(p_element).closest('.DtlRows').length != 0) {//判斷是否為多筆資料控制項
            if ($(p_element).closest('.DtlRows').css("display") != "none") {//判斷該tr是否隱藏,隱藏則不檢核
                if ($(p_element).closest('.DtlRows').find("#chkDtl").prop('checked') == false) {//判斷chkDtl是否勾選,勾選擇不檢核 
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

function ChechEmpty(p_element) {
    if (p_element.attr('ValidType') == "AllowEmpty") {
        if (p_element.val() == "") {
            if (isCheck(p_element)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}


function ErrCtrl(p_elementID, p_isError) {
    if (p_isError) {
        $('#' + p_elementID).css('background', '#FFECEC');
    }
    else {
        $('#' + p_elementID).css('background', '#FFFFFF');
    }
}

function ErrorMSG(e, p_ChkRelut, p_MSG) {
    if (g_isCheck) {
        if (g_CheckID == e.id || g_CheckID == "") {
            if (p_ChkRelut) {
                if ((g_isError || g_isError == null) && ($("#" + e.id).attr("readonly") != "readonly")) {
                    AlertMSG(GetLanguage(p_MSG), e.id);
                    g_CheckID = e.id;
                    ErrCtrl(e.id, true);
                    g_isError = true;
                }
            }
            else {
                ErrCtrl(e.id, false);
                g_CheckID = "";
                g_isError = null;
            }
        }
    }
}

function CheckError(p_Type) {
    if (p_Type == "IN") {
        if (g_isError || g_isError == null) {
            g_Valid = g_isError;
            g_isError = false;
        }
    }
    else if (p_Type == "OUT") {
        if (g_Valid != null) {
            g_isError = g_Valid;

        }
    }
}

function AlertMSG(p_MSG, p_CheckID, p_isMulti, p_Top) {
    if (p_Top==undefined) {
        p_Top = "20%";
    }
    g_isCheck = false;
    if (!p_isMulti) {
        p_MSG = $($("#" + p_CheckID).closest('td')[0].previousSibling).text() + ":" + p_MSG;
    }
    if ($("#tbCommonForm").length == 0) {
        $.blockUI({
            theme: true,
            title: '<img src="/KF_Web/Img/Error.png" alt="Error"  >',
            message: "<p>" + p_MSG + "</p><p> <input id='btnunBlock'  onclick='unBlock(\"" + p_CheckID + "\")' type='button' value='OK' /> </p>",
            draggable: true,
            themedCSS: {
               
                top: p_Top
              
            }
        });
       
    }
    else {
        alert(p_MSG.replaceAll("<br>","\n"));
        $("#" + p_CheckID).setfocus(); g_isCheck = true;
    }
    
}

function unBlock(p_CheckID) {
    $.unblockUI();
    $('#' + p_CheckID).setfocus();
    //CheckStart();
}
/*
function CheckStart() {
    clearInterval(countdownnumber);
    g_isCheck = true;
    intCountDown = CountDownIndex;
    countdownnumber = setInterval("CountDown()", 1000);
}*/

function Login() {
    if ($("#txtID").val() != "" && $("#txtPWD").val() != "") {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: g_Page + "/LoginCheck",
            data: JSON.stringify({ "WorkID": $("#txtID").val(), "PW": $("#txtPWD").val() }),
            async: false,
            dataType: "json",
            success: function (Result) {
                if (Result.d.isSuccess) {
                    location.reload();
                }
                else
                {
                    alert(Result.d.LogMessage);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);
                return null;
            }
        });

    }
    else {
        alert("帳號密碼錯誤!!");
    }
}

function AllowEmpty(e) {
//    intCountDown = CountDownIndex;
//    if (isCheck(e)) {
//        ErrorMSG(e, (e.value == ""), ("MSG00002"));
//    }
}
