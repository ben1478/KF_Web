

String.format = function () {
    var s = arguments[0];
    if (s == null) return "";
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = getStringFormatPlaceHolderRegEx(i);
        s = s.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));
    }
    return cleanStringFormatResult(s);
}
String.prototype.format = function () {
    var txt = this.toString();
    for (var i = 0; i < arguments.length; i++) {
        var exp = getStringFormatPlaceHolderRegEx(i);
        txt = txt.replace(exp, (arguments[i] == null ? "" : arguments[i]));
    }
    return cleanStringFormatResult(txt);
}
//讓輸入的字串可以包含{}
function getStringFormatPlaceHolderRegEx(placeHolderIndex) {
    return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
}
//當format格式有多餘的position時，就不會將多餘的position輸出
//ex:
// var fullName = 'Hello. My name is {0} {1} {2}.'.format('firstName', 'lastName');
// 輸出的 fullName 為 'firstName lastName', 而不會是 'firstName lastName {2}'
function cleanStringFormatResult(txt) {
    if (txt == null) return "";
    return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
}

$(function () {
    GetSiteMenu();
    //GetLeaveDayInfo();
   // GetSignBox();
    $("#divMainMenu a").click(function (e) {
        var m_href = $(this).attr('href');
        var m_MenuID = $(this).attr('menuid');
        if (m_href != "#") {
            OpenFunction(m_href, m_MenuID);
            e.preventDefault();
        }
    });


});

function ACCII() {
    var m_String = $("#txtWorkID").val() + (new Date).toDateString();
    var m_ACCIIStr = "";
    for (j = 0; j < m_String.length; j++) {
        m_ACCIIStr += m_String.charCodeAt(j) + "^";
    }
    return m_ACCIIStr;
}

function GetEmployeeInfo() {
    var m_Employee = new Object;
    if ($("#txtAccount").val() != "" && $("#CompanyCode").val() != "" && $("#CompanyCode").val() != "") {
        m_Employee["isSuccess"] = true; 
        m_Employee["Entity"] = { "Account": $("#txtAccount").val(), "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "CurrentLanguage": $('#selLanguage').val(), "CurrentSiteForm": $('#txtSiteFormID').val(), "DisplayName": $('#txtDisplayName').val() };
    }
    else {
        m_Employee["isSuccess"] = false; 
    }
    return m_Employee;
}

function GetPeriodCarouselBySite() {
    try {
        var m_Employee = GetEmployeeInfo();
        if (m_Employee["isSuccess"]) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "MainForm.aspx/GetPeriodCarouselBySite",
                data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "p_SiteID": $('#selSite').val() }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            m_Result = Result.d.ResultEntity;
                            $("#divPageCarousels").html(m_Result["divPageCarousels"].toString());
                            $("#ulCarouselTab").html(m_Result["ulCarouselTab"].toString());
                        }
                        else {
                            alert("GetPeriodCarouselBySite Error!! please try again later. LogMessage:" + Result.d.LogMessage);
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("GetPeriodCarouselBySite Error");
                }
            });
        }

    } catch (e) {
        alert("GetPeriodCarouselBySite Error");
    }
}

function GetLeaveDayInfo() {
    try {
        var m_Employee = GetEmployeeInfo();
        if (m_Employee["isSuccess"]) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "MainForm.aspx/GetLeaveDayInfo",
                data: JSON.stringify({ "p_Employee": m_Employee["Entity"] }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            m_Result = Result.d.ResultEntity;
                            if (m_Result["MenuPath"] != undefined) {
                                var m_Url = "http://tweip02.adata.com/webservice.nsf/AG0E01?openagent&key=" + m_Result["MenuPath"].toString() + "^*^" + ACCII();
                                $("#divLeaveDayInfo").attr("onclick", "OpenFunction(\"" + m_Url + "\",\"\")");
                            }
                            $("#divLeaveDayInfo").css("cursor", "pointer")
                            if (m_Result["LeaveDayFlag"].toString() == "Y") {
                                $("#compensatoryleave").text(m_Result["compensatoryleave"].toString() + "H");
                                $("#Annualleave").text(m_Result["Annualleave"].toString() + "H");
                            }
                            else {
                                $("#compensatoryleave").text("　");
                                $("#Annualleave").text("　");
                                $("#lblSP_Holiday").text("　");
                                $("#lblCO_Holiday").text("　");
                            }
                        }
                        else {
                            alert("GetLeaveDayInfo Error!! please try again later. LogMessage:" + Result.d.LogMessage);
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("GetLeaveDayInfo Error");
                }
            });
        }
    } catch (e) {
        alert("GetLeaveDayInfo Error");
    }
}


function GetMainModle() {

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
                url: "MainForm.aspx/GetMainModle",
                data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "p_SiteID": $('#selSite').val() }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            m_Result = Result.d.ResultEntity;
                            $("#divMainMenu").html(m_Result["divMainMenu"].toString());
                            $("#divFavorite").html(m_Result["divFavorite"].toString());
                            $("#divFavoriteList").html(m_Result["divFavoriteList"].toString());
                            $("#divLeave").html(m_Result["divLeave"].toString());
                            $("#divRoom").html(m_Result["divRoom"].toString());
                            $("#divIssue").html(m_Result["divIssue"].toString());
                            Core.init();
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




function GetSiteMenu() {
    var m_Employee = GetEmployeeInfo();

    if (m_Employee["isSuccess"]) {
        try {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "MainForm.aspx/GetSiteMenu",
                data: JSON.stringify({ "p_Employee": m_Employee["Entity"] }),
                dataType: "json",
                success: function (Result) {
                    if (Result.d != null) {
                        if (Result.d.isSuccess) {
                            m_Result = Result.d.ResultEntity;
                            $.each(m_Result, function (Index, Item) {
                                $("#selSite").append("<option value=\"" + Item.SiteID + "\">" + Item.Description + "</option>");

                            });
                            $("#selSite").val($("#txtCompanyCode").val());

                        }
                        else {
                            alert("GetSiteMenu Error" + Result.d.LogMessage + ";please try again later. ");
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("GetSiteMenu Error");
                }
            });
        }
        catch (e) {
            alert("GetSiteMenu Error");
        }
    }
}



function TRSignBoxClick(p_event) {
    $(p_event.srcElement).css("color", "#6F00D2")
}


//取得舊EIP轉入SignBox資料Ttable:EIP_SignBox
function GetNewEIP_SignBox(p_ErrMSG) {
    try {
        if (g_isBindingSignBox == false) {
            var m_Employee = GetEmployeeInfo();
            if (m_Employee["isSuccess"]) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "MainForm.aspx/GetNewEIP_SignBox",
                    data: JSON.stringify({ "p_Employee": m_Employee["Entity"], "p_ErrMSG": p_ErrMSG }),
                    dataType: "json",
                    success: function (Result) {
                        if (Result.d != null) {
                            if (Result.d.isSuccess) {
                                g_isBindingSignBox = true;

                                m_Result = Result.d.ResultEntity;
                                var m_SignBoxHTML = "";
                                var m_SignBoxTR = "<tr class='TRSignBox'> <td><a href='{0}' onclick='TRSignBoxClick(event)' target='_blank'><span class='fa fa-arrow-circle-right va-t mr10'></span>{1}</a></td><td>　</td> </tr>";
                                //p_Result
                                if (m_Result != null) {
                                    $("#spSignBoxCount").text(m_Result.length);
                                    $.each(m_Result, function (Index, Item) {
                                        var m_Url = Item.Linkdata;
                                        if (((Item.Linkdata.indexOf("GeneratorWebMaintain") == -1) && (Item.Linkdata.toString().toLowerCase().indexOf("plm.adata.com") == -1))) {
                                            m_Url = "http://tweip02.adata.com/webservice.nsf/AG0E01?openagent&key=" + Item.Linkdata + "^*^" + ACCII();
                                        }
                                    });
                                    $("#tabSignBox").html(m_SignBoxHTML);
                                   
                                }
                                else {
                                    $("#spSignBoxCount").text("0");
                                }

                            }
                            else {
                                alert("GetSignBox Error!! please try again later. LogMessage:" + Result.d.LogMessage);
                               
                            }
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("GetSignBox Error  please try again later.");
                       
                    }
                });
            }
        }
    }
    catch (e) {
        alert("GetSignBox Error  please try again later.");
       
    }
}


function GoToCarouselLink(p_Url) {
    if (p_Url != "") {
        window.open(p_Url, "_blank");
    }
}



var g_isBindingSignBox = null;



function OpenFunction(p_Url, p_MenuID) {

    var m_URL = "";
    
    var m_MenuID = "";
   
    m_MenuID = "MenuID=" + p_MenuID;

    
    if (p_Url.indexOf("?") == -1) {
        m_URL = p_Url + "?" + m_MenuID;
    }
    else {
        m_URL = p_Url + "&" + m_MenuID;
    }
    window.open(m_URL, '_blank');
}


function ChangeSite() {
    GetMainModle();
    GetPeriodCarouselBySite();
}


