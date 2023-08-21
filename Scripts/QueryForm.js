

function RemoveQueryMode(p_Value) {
    var m_Attr = p_Value;
    if ($("#hidQueryMode").val() != "") {
        if (p_Value.toString().indexOf($("#hidQueryMode").val()) == 0) {
            m_Attr = p_Value.replace($("#hidQueryMode").val(), "");
        }
   }
   return m_Attr;

}
function SetValueToOpener(p_Value) {

    if (opener != null) {
        if ($("#hidEventElement").val() != "") {
            $.each($("#hidEventElement").val().split(','), function (key, value) {
                if (opener.document.getElementById(value) != null) {
                    if (opener.document.getElementById(value).nodeName == "LABEL") {

                        opener.document.getElementById(value).innerText = p_Value[RemoveReservedWords(RemoveQueryMode(value))];
                    }
                    else if ($("#hidControlType").val() == "MultiSelect") {
                        var m_SelText = p_Value[$("#hisSelectText").val()];
                        var m_SelValue = p_Value[$("#hisSelectValue").val()];

                        if ($('#selSelected option[value="' + m_SelValue + '"]').length == 0) {
                            $('#selSelected').append('<option value="' + m_SelValue + '">' + m_SelText + '</option>');
                            $(opener.document.getElementById(value)).append('<option value="' + m_SelValue + '">' + m_SelText + '</option>');
                        }
                    }
                    else {
                        if ($("#hidControlType").val() == "Query") {
                            $(opener.document.getElementById(value)).val(p_Value[RemoveReservedWords(RemoveQueryMode(value))]);
                            $(opener.document.getElementById(value)).attr("SelectedData", JSON.stringify(p_Value));
                            opener.document.getElementById(value).onchange();
                        }

                    }
                }
            });

        }
        if ($("#hidControlType").val() != "MultiSelect") {
            this.close();
        }
    }
}

$(function () {
    if ($("#btnSearch").length != 0) {
        if ($("#hidQueryParam").val() != "") {
            $.each($("#hidQueryParam").val().split('|'), function (key, value) {
                var m_ElementId = value.split(':')[0];
                var m_Value = value.split(':')[1];
                SetValueToCtrl(m_ElementId, m_Value);
            });
        }
        $("#btnSearch").click();
    }

    if ($("#hidControlType").val() == "MultiSelect") {
        $("#divSELECT").show();
        if ($("#hidEventElement").val() != "") {
            $('#selSelected').html($(opener.document.getElementById($("#hidEventElement").val())).html());
        }
    }
});


function SetValueToCtrl(p_ElementId, p_Value) {
    var QueryCtrls = ["Qtxt", "Qdis", "Qsel", "QQry"];

    $.each(QueryCtrls, function (key, value) {
        if ($("#" + value + p_ElementId).length != 0) {
            if ($("#" + value + p_ElementId)[0].nodeName == "LABEL") {
                $("#" + value + p_ElementId).text(p_Value);
            }
            else {
                $("#" + value + p_ElementId).val(p_Value);
            }
        }
    });
}