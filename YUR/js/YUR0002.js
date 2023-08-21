


var m_WebAPI_Path = "";

var m_Citys =
	[
		{ 'val': '', 'text': '' },
		{ 'val': '2', 'text': '新北市' },
		{ 'val': '1', 'text': '臺北市' },
		{ 'val': '3', 'text': '桃園市' },
		{ 'val': '0', 'text': '基隆市' },
		{ 'val': '4', 'text': '新竹市' },
		{ 'val': '5', 'text': '新竹縣' },
		{ 'val': '6', 'text': '苗栗縣' },
		{ 'val': '7', 'text': '臺中市' },
		{ 'val': '8', 'text': '彰化縣' },
		{ 'val': '9', 'text': '南投縣' },
		{ 'val': '10', 'text': '雲林縣' },
		{ 'val': '11', 'text': '嘉義市' },
		{ 'val': '12', 'text': '嘉義縣' },
		{ 'val': '13', 'text': '臺南市' },
		{ 'val': '14', 'text': '高雄市' },
		{ 'val': '15', 'text': '屏東縣' },
		{ 'val': '16', 'text': '臺東縣' },
		{ 'val': '17', 'text': '花蓮縣' },
		{ 'val': '18', 'text': '宜蘭縣' },
		{ 'val': '19', 'text': '澎湖縣' },
		{ 'val': '20', 'text': '金門縣' },
		{ 'val': '21', 'text': '連江縣' }
	] 



// product_id JSON data
var m_product_id = {
    'AEON1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
    'commodity': [{'Finance': '商品原融'}],
		'E-MOTOR': [{'電動機車': '電動機車'}],
    'E-MOVING': [{'電動機車': '電動機車'}],
		'GOGORO': [{'電動機車': '電動機車'}],
		'HARTFORD1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
		'HONDA1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
		'KYMCO1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
		'OTHER MOTOR': [{'一般白牌機車': '一般白牌機車'}],
		'PGO1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
		'SUZUKI1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
		'SYM1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
		'VESPA1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
		'YAMAHA1': [{'一般白牌機車': '一般白牌機車'},{'電動機車': '電動機車'}],
    };
  // bus_type JSON data
    var m_bus_type = {
          "AA21": "機車原車抵押AR",
          "AA22": "機車借新還舊AR",
          "AA23": "機車他行代償AR"
          }    
//promotion_no JSON data
var promotion_Value = {
	'DQ74': { 'value': 350000, 'info': '不可超過上限35萬' },
	'DQ01': { 'value': 350000, 'info': '不可超過上限35萬' },
	'DQ02': { 'value': 300000, 'info': '不可超過上限30萬' },
	'DQ03': { 'value': 200000, 'info': '不可超過上限20萬' },
	'DQ04': { 'value': 200000, 'info': '不可超過上限20萬' },
	'DQ05': { 'value': 350000, 'info': '不可超過上限35萬' },
	'DQ06': { 'value': 300000, 'info': '不可超過上限30萬' },
	'DQ07': { 'value': 200000, 'info': '不可超過上限20萬' }
}
	
var m_promotion_no = {};




// 取得民國年份的西元年份
function getROCYearToAD(rocYear) {
	var year = parseInt(rocYear.substr(0, rocYear.length - 4)) + 1911;
	var month = rocYear.substr(rocYear.length - 4, 2);
	var day = rocYear.substr(rocYear.length - 2, 2);

	// 檢查月份和日期的合理性
	var isValidDate = validateDate(parseInt(month), parseInt(day));
	if (!isValidDate) {
		return 'Invalid date';
	}

	return year + '/' + month + '/' + day;
}

// 檢查月份和日期的合理性
function validateDate(month, day) {
	if (month < 1 || month > 12) {
		return false; // 月份無效
	}

	var maxDay = new Date(2000, month, 0).getDate();
	if (day < 1 || day > maxDay) {
		return false; // 日期無效
	}

	return true;
}


$(function () {


	if ($("#Action").val() == "upd") {
		m_promotion_no = {
			'AA21': [
				{ 'DQ74': 'OA機車原融(原車)超優13％_上限35萬' },
				{ 'DQ01': '新_OA機車原融(原車抵押-超優)13％_上限35萬' },
				{ 'DQ02': '新_OA機車原融(原車抵押-優加)13.25％_上限30萬' },
				{ 'DQ03': 'OA機車原融(原車抵押-優質)13.5％_上限20萬' }
			],
			'AA22': [
				{ 'DQ04': '新_OA機車原融(借新還舊-優加)13.25％_上限20萬' }
			],
			'AA23': [
				{ 'DQ05': '新_OA機車原融(他行代償-超優)13％_上限35萬' },
				{ 'DQ06': '新_OA機車原融(他行代償-優加)13.25％_上限30萬' },
				{ 'DQ07': '新_OA機車原融(他行代償-優質)13.5％_上限20萬' }
			],
		};
	}
	else {
		m_promotion_no = {
			'AA21': [
				{ 'DQ74': 'OA機車原融(原車)超優13％_上限35萬' },

				{ 'DQ02': '新_OA機車原融(原車抵押-優加)13.25％_上限30萬' },
				{ 'DQ03': 'OA機車原融(原車抵押-優質)13.5％_上限20萬' }
			],
			'AA22': [
				{ 'DQ04': '新_OA機車原融(借新還舊-優加)13.25％_上限20萬' }
			],
			'AA23': [
				{ 'DQ05': '新_OA機車原融(他行代償-超優)13％_上限35萬' },
				{ 'DQ06': '新_OA機車原融(他行代償-優加)13.25％_上限30萬' },
				{ 'DQ07': '新_OA機車原融(他行代償-優質)13.5％_上限20萬' }
			],
		};
	}

	$('.timeout').block({
		theme: true,
		message: '<img src="/KF_Web/Img/loading.gif" />',
		showOverlay: false,
		centerY: false,
		centerX: true,
		draggable: true,
		themedCSS: {
			opacity: 0.7,
			width: '85%',
			height: '40%',
			cursor: 'initial',
			top: '1%'
		}
	});


	
	m_WebAPI_Path = $("#hidWebAPI_Path").val();

	GetAreaCode();

	 $.each($("td.Key"), function(idx, Index) {
		 $(Index).text("*"+$(Index).text());
	 });


	$.each($(".dte"), function (key, Item) {
		$("#" + Item.id).datepicker(g_optTW);
	});


    // bus_type JSON data
    var m_Months = ["01","02","03","04","05","06","07","08","09","10","11","12"];

    //居住時間-月
    $.each(m_Months, function(key, value) {
      $('#customer_dwell_month').append($('<option>', {
        value: value,
        text: value
      }));
    });

    //年資-月
    $.each(m_Months, function(key, value) {
      $('#customer_work_month').append($('<option>', {
        value: value,
        text: value
      }));
    });
    //有效日期
    $.each(m_Months, function(key, value) {
      $('#customer_creditcard_validdate_month').append($('<option>', {
        value: value,
        text: value
      }));
    });



	
	/*
	$.each(m_Citys, function(key, value) {
		$('#Selcustomer_resident_addcity').append($('<option>', {
        value: key,
        text: value
		}));
		$('#Selcustomer_mail_addcity').append($('<option>', {
			value: key,
			text: value
		}));
		$('#Selcustomer_check_addcity').append($('<option>', {
			value: key,
			text: value
		}));
		$('#Selcustomer_company_addcity').append($('<option>', {
			value: key,
			text: value
		}));
		$('#Selguarantor_addcity').append($('<option>', {
			value: key,
			text: value
		}));
    });*/

  

    $.each(m_bus_type, function(key, value) {
      $('#bus_type').append($('<option>', {
        value: key,
        text: value
      }));
    });
    var selBT= $('#bus_type option:selected').val();

   

    $.each(m_promotion_no[selBT], function(key, value) {
        $.each(value, function(key1, value1) {
          $('#promotion_no').append($('<option>', {
              value: key1,
              text: value1
            }));
        });
    });
    
	$('#lblstaging_amount').text(promotion_Value[$('#promotion_no').val()].info);

// product_category_id JSON data
	var m_product_category_id = {
		
	 		"AEON1": "宏佳騰機車",
			"commodity": "委外商品",
			"E-MOTOR": "電動機車",
			"E-MOVING": "中華電動車-專案",
			"GOGORO": "睿能",
			"HARTFORD1": "哈特佛機車",
			"HONDA1": "HONDA",
			"KYMCO1": "光陽機車",
			"OTHER MOTOR": "其它廠牌機車",
			"PGO1": "比雅久",
			"SUZUKI1": "台鈴機車",
			"SYM1": "三陽機車",
			"VESPA1": "偉士牌機車",
			"YAMAHA1": "山葉"
			}

	$('#product_category_id').append($('<option>', {
		value: '',
		text: ''
	}));


$.each(m_product_category_id, function(key, value) {
  $('#product_category_id').append($('<option>', {
    value: key,
    text: value
  }));
});

var selPCI= $('#product_category_id option:selected').val();
	if (selPCI != '') {
		$.each(m_product_id[selPCI], function (key, value) {
			$.each(value, function (key1, value1) {
				$('#product_id').append($('<option>', {
					value: key1,
					text: value1
				}));
			});
		});
	}

	$('#guarantor_birthday').bind('change', function () {
		if ($('#guarantor_birthday').val().indexOf("/") == -1) {
			$('#guarantor_birthday').val(getROCYearToAD($('#guarantor_birthday').val()));
		}
	});
	

	$('#customer_birthday').bind('change', function () {
		if ($('#customer_birthday').val().indexOf("/") == -1) {
			$('#customer_birthday').val(getROCYearToAD($('#customer_birthday').val()));
		}
	});


	$('#customer_id_issue_date').bind('change', function () {
		if ($('#customer_id_issue_date').val().indexOf("/") == -1) {
			$('#customer_id_issue_date').val(getROCYearToAD($('#customer_id_issue_date').val()));
		}
	});
	 

	$('#dealer_note_date_yyyymm').bind('change', function () {
		if ($('#dealer_note_date_yyyymm').val().indexOf("/") == -1) {
			$('#dealer_note_date_yyyymm').val(getROCYearToAD($('#dealer_note_date_yyyymm').val()));
		}
	});
	



	$('#staging_amount').bind('change', function () {
		//$('#staging_total_price').val($('#staging_amount').val());
	});


	$('#periods_num').bind('change', function () {
		if ($('#payment').val() != "" && $('#periods_num').val() != "")
		{
			var staging_amount = parseInt($('#payment').val()) * parseInt($('#periods_num').val());
			$('#staging_total_price').val(staging_amount);
			//$('#staging_amount').val(staging_amount);
		}
	});
	$('#payment').bind('change', function () {
		if ($('#payment').val() != "" && $('#periods_num').val() != "") {
			var staging_amount = parseInt($('#payment').val()) * parseInt($('#periods_num').val());
			$('#staging_total_price').val(staging_amount);
			//$('#staging_amount').val(staging_amount);
		}
	});

	$('#promotion_no').bind('change', function () {

		$('#lblstaging_amount').text(promotion_Value[$('#promotion_no').val()].info);
	});

	
    $('#bus_type').bind('change', function() {
        $('#promotion_no').empty();
        var selBT= $('#bus_type option:selected').val();
        BindSubSel(m_promotion_no,selBT,"promotion_no");
        $('#bus_type_name').val($('#bus_type option:selected').text())
    });




    $('input[name="customer_edutation_status"]').bind('change', function() {
        $('input[name="customer_edutation_status"]').not($("#"+this.id)).prop('checked', false);
		});
    $('input[name="customer_id_number_status"]').bind('change', function() {
        $('input[name="customer_id_number_status"]').not($("#"+this.id)).prop('checked', false);
		});
    $('input[name="marital"]').bind('change', function() {
        $('input[name="marital"]').not($("#"+this.id)).prop('checked', false);
		});
    $('input[name="payment_mode"]').bind('change', function() {
        $('input[name="payment_mode"]').not($("#"+this.id)).prop('checked', false);
			if($('input[name="payment_mode"]:checked').val()=="3")
			{
				SetKey("customer_email",true);
			}
			else
			{
				SetKey("customer_email",false);
			}
		});
    
    $('input[name="customer_profession_status"]').bind('change', function() {
        $('input[name="customer_profession_status"]').not($("#"+this.id)).prop('checked', false);
		if($('input[name="customer_profession_status"]:checked').val()=="1")
		{
			$("#customer_company_name").val("無");
		}
		else
		{
			if($('input[name="customer_profession_status"]:checked').val()=="2")
			{
				$("#customer_company_name").val("家管");
				$("#TD_customer_company_tel").text("聯絡電話");
					$("#TD_customer_company_tel_code").text("職業資料-區碼");
					$("#TD_customer_company_tel_num").text("職業資料-電話");
			}
			else
			{
				$("#customer_company_name").val("");
				$("#TD_customer_company_tel").text("公司電話");
				$("#TD_customer_company_tel_code").text("職業資料-公司區碼");
				$("#TD_customer_company_tel_num").text("職業資料-公司電話");
			}
		}
	});
		
	$('input[name="guarantor_profession_status"]').bind('change', function() {
			$('input[name="guarantor_profession_status"]').not($("#"+this.id)).prop('checked', false);
			if($('input[name="guarantor_profession_status"]:checked').val()=="1")
			{
				$("#guarantor_company_name").val("無")
			}
			else
			{
				if($('input[name="guarantor_profession_status"]:checked').val()=="2")
				{
					$("#guarantor_company_name").val("家管");
					$("#TD_guarantor_company").text("聯絡電話");
					$("#TD_guarantor_company_tel_code").text("保人資訊-區碼");
					$("#TD_guarantor_company_tel_num").text("保人資訊-電話");
				}
				else
				{
					$("#guarantor_company_name").val("");
					$("#TD_guarantor_company").text("公司電話");
					$("#TD_guarantor_company_tel_code").text("保人資訊-公司區碼");
					$("#TD_guarantor_company_tel_num").text("保人資訊-公司電話");
				}
			}
	});
		
		
    $('input[name="customer_creditcard_status"]').bind('change', function() {
        $('input[name="customer_creditcard_status"]').not($("#"+this.id)).prop('checked', false);
		});
    
    $('input[name="customer_dwell_status"]').bind('change', function() {
        $('input[name="customer_dwell_status"]').not($("#"+this.id)).prop('checked', false);
		});
    


	
    $('input[name="guarantor_option"]').bind('change', function() {
        $('input[name="guarantor_option"]').not($("#"+this.id)).prop('checked', false);
		if($('input[name="guarantor_option"]:checked').val()=="1")
		{
			SetKey("guarantor_name",true);
			SetKey("guarantor_relation",true);
			SetKey("guarantor_idcard_no",true);
			SetKey("guarantor_birthday",true);
			SetKey("guarantor_mobile_phone",true);
			SetKey("guarantor_company_name",true);
			SetKey("guarantor_company_tel_code",true);
			SetKey("guarantor_company_tel_num",true);
			$("#TD_guarantor_company").prop('class', 'Key');
			$("#TD_guarantor_company").text("*"+$("#TD_guarantor_company").text());
			
		}
		else
		{
			SetKey("guarantor_name",false);
			SetKey("guarantor_relation",false);
			SetKey("guarantor_idcard_no",false);
			SetKey("guarantor_birthday",false);
			SetKey("guarantor_mobile_phone",false);
			SetKey("guarantor_company_name",false);
			SetKey("guarantor_company_tel_code",false);
			SetKey("guarantor_company_tel_num",false);
			$("#TD_guarantor_company").prop('class', '');
			$("#TD_guarantor_company").text($("#TD_guarantor_company").text().replace("*",""));
		}
	});
    
	
	
	
    $('#customer_mail_identical').change(function(){
        if(this.checked){
            CtrlAddress("customer_resident","customer_mail");
        }
    });
    $('#customer_check_identical').change(function(){
        if(this.checked){
            CtrlAddress("customer_mail","customer_check");
        }
    }); 

	if ($("#Action").val() == "upd" && $("#form_no").val() != "") {
		GetYRData();
	}
	else {
		setTimeout('PageUnblock()', 100);
	}

    $('.file').bind('change', function() {
        convertFiles('.file',"attachmentFile") 
    });

    $('.RSfile').bind('change', function() {
        convertFiles('.RSfile',"RSattachmentFile") 
    });


    $('.REfile').bind('change', function() {
        convertFiles('.REfile',"REattachmentFile") 
    });
     $('.RPfile').bind('change', function() {
        convertFiles('.RPfile',"RPattachmentFile") 
    });
});


function SetKey(p_ObjNa, isKey) {
	if (isKey) {
		$("#" + p_ObjNa).prop('class', $("#" + p_ObjNa).prop('class') + " Key");
		$("#TD_" + p_ObjNa).prop('class', 'Key');
		$("#TD_" + p_ObjNa).text("*" + $("#TD_" + p_ObjNa).text());
	}
	else {
		$("#" + p_ObjNa).prop('class', $("#" + p_ObjNa).prop('class').replace(" Key", ""));
		$("#TD_" + p_ObjNa).prop('class', '');
		$("#TD_" + p_ObjNa).text($("#TD_" + p_ObjNa).text().replace("*", ""));
	}
}

function GetFile(Index,Type)
{
   
    $.ajax({
         url: m_WebAPI_Path+'GetFileBySeq?KeyID='+ $("#form_no").val() +'&Type='+ Type +'&Index='+Index,
         type: 'POST',
         data: {},
         contentType: 'application/json; charset=utf-8',
         success: function(result) {
         if(result.resultCode=="000")
         {
         
           DownloadAtta(result.objResult);
         }
         else
         {
           alert(result.resultMsg);
           $("#txtError").val(result.resultMsg);
         }
         
         },
         error: function(xhr, status, error) {
         console.log(error);
         }
   });
}



function OnChangPCI() {
	$('#product_id').empty();
	var selPCI = $('#product_category_id option:selected').val();
	BindSubSel(m_product_id, selPCI, "product_id");
}


function DownloadAtta(p_Atta) 
	{
		var base64 =p_Atta.file_body_encode;
		if (base64) 
		{
		  const byteString = atob(base64);
		  const mimeString = p_Atta.content_type;

		  const ab = new ArrayBuffer(byteString.length);
		  const ia = new Uint8Array(ab);

		  for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		  }

		  const blob = new Blob([ab], { type: mimeString });
		  const url = URL.createObjectURL(blob);

		  const a = document.createElement('a');
		  a.href = url;
		  a.download = p_Atta.file_name;
      
      
		  $("#divDownload")[0].appendChild(a);
		  a.click();

		  URL.revokeObjectURL(url);
		  $("#divDownload")[0].removeChild(a);
		}
	}

function BindSubSel(p_Datas,p_Val,p_SubID)
{
	$('#' + p_SubID).empty();
	
    var selPCI= p_Val;
    $.each(p_Datas[selPCI], function(key, value) {
        $.each(value, function(key1, value1) {
            $('#'+p_SubID).append($('<option>', {
                value: key1,
                text: value1
            }));
        });
	});

	if (p_SubID == "promotion_no") {
		
		$('#lblstaging_amount').text(promotion_Value[$('#promotion_no').val()].info);
	}

}


function GetObjByClass(p_Class)
{
    var objData = new Object();
    var objAttr = "";
    var objVal = "";
    var chkName = "";
    $.each($("#MainTable ." + p_Class), function (index, objCols) 
		{
        objAttr = "";
        objVal = "";
        var m_id = $(objCols).attr("id");
        switch ($(objCols).attr("type")) 
        {   
            case 'checkbox':
                if(chkName != $('#' + m_id).attr("name"))
                {
                    chkName = $('#' + m_id).attr("name");
                    if($('input[name='+ chkName +']:checked').length==0)
                    {
                        objVal="";
                    }
                    else
                    {
                         objVal = $('input[name='+ chkName +']:checked').val();
                    }
                    objAttr = chkName;
                    objData[objAttr]=objVal;
                }
            break;
            case 'select':
                objAttr = m_id;
                objVal = $('#'+ m_id +' option:selected').val();
                objData[objAttr]=objVal;
            break;
			case 'number':
			case 'text':
            case 'hidden':
                objAttr = m_id;
                objVal = $('#'+ m_id).val();
                objData[objAttr]=objVal;
            break;
        }
    });
    return objData;
}


function SetObjToCtrl(p_Obj)
{
    SetObjToCtrlByClass(p_Obj,$(".YRData"));
    SetObjToCtrlByClass(p_Obj,$(".KFData"));
    $("#lblCaseStatusDesc").text(p_Obj["casestatusdesc"]);
    $("#lblRP_StatusDesc").text(p_Obj["rp_statusdesc"]);
	$("#TransactionId").text(p_Obj["transactionId"]);
	$("#Add_date").val(p_Obj["add_date"]);
	
	
	ShowREInfo(p_Obj.lisRE);
	ShowQcsInfo(p_Obj.lisQCS);
	ShowRSInfo(p_Obj.lisRS);  
	ShowRPInfo(p_Obj.lisRP); 
    $("#casestatus").val(p_Obj["casestatus"]);
    $("#rp_status").val(p_Obj["rp_status"]);
    CheckAttFile(p_Obj.attachmentFile,"R");
    CheckAttFile(p_Obj.rEattachmentFile,"RE");
    CheckAttFile(p_Obj.rSattachmentFile,"RS");
    CheckAttFile(p_Obj.rPattachmentFile,"RP");
    
}



function ShowQcsInfo(p_lisQCS)
{
	if(p_lisQCS.length>0)
	{
		$("#QCSInfo").show();
		$(p_lisQCS).each(function(i, QCS)
		{
			var newRow = $('<tr><td style="text-align:center" >' + QCS.resulType + '</td><td style="text-align:center" >' + QCS.explain + '</td><td>' + QCS.comment + '</td><td style="text-align:center">' + QCS.qcs_time + '</td></tr>');
			$('#tbQCS').append(newRow);

		});	
	}
}

function ShowREInfo(p_lisRE)
{
	if(p_lisRE.length>0)
	{
		$("#REInfo").show();
		$(p_lisRE).each(function(i, RE)
		{
			var ReRow = $('<tr><td style="text-align:center" >' + RE.re_idx + '</td><td colspan="2">' + RE.comment + '<div id="Att'+RE.transactionId+'"><div></td><td style="text-align:center" >' + RE.re_time + '</td></tr>');
			$('#tbRE').append(ReRow);
			var QcsRow = $('<tr><td style="text-align:center">' + RE.explain + '</td><td colspan="2" >' + RE.qcs_comment + '</td><td style="text-align:center">' + RE.qcs_time + '</td></tr>');
			$('#tbRE').append(QcsRow);
		});	
	}
}

function ShowRSInfo(p_lisRS)
{
	if(p_lisRS.length>0)
	{
		$("#RSInfo").show();
		$(p_lisRS).each(function(i, RS)
		{
			var RsRow = $('<tr><td style="text-align:center" >' + RS.rs_idx + '</td><td colspan="2">' + RS.comment1+ RS.comment2+ RS.comment3+ RS.comment4+ RS.comment5 + '<div id="Att'+RS.transactionId+'"><div></td><td style="text-align:center" >' + RS.rs_time + '</td></tr>');
			$('#tbRS').append(RsRow);
			var QcsRow = $('<tr><td style="text-align:center">' + RS.explain + '</td><td colspan="2" >' + RS.qcs_comment + '</td><td style="text-align:center">' + RS.qcs_time + '</td></tr>');
			$('#tbRS').append(QcsRow);
		});	
	}
}


function ShowRPInfo(p_lisRP)
{
	if(p_lisRP.length>0)
	{
		$("#RPInfo").show();
		$(p_lisRP).each(function(i, RP)
		{
			var RpRow = $('<tr><td style="text-align:center" >' + RP.rp_idx + '</td><td colspan="2">' + '<div id="Att'+RP.transactionId+'"><div></td><td style="text-align:center" >' + RP.rp_time + '</td></tr>');
			$('#tbRP').append(RpRow);
			var m_tbApply="";
			if(RP.capitalApply != null)
			{
				m_tbApply+='<table border="1" id="tbRP" width="80%" cellspacing="0" cellpadding="3">';
				m_tbApply+='<tr class="InfoTitle">';
				m_tbApply+='<td style="width20%;text-align:center"> 撥款日期</td>';
				m_tbApply+='<td style="width20%;text-align:center"> 撥款金額</td>';
				m_tbApply+='<td style="width60%;text-align:center"> 撥款對象說明</td>';
				m_tbApply+='</tr>';
				$(RP.capitalApply).each(function(i, Apply)
				{
					m_tbApply+='<tr>';
					m_tbApply+='<td text-align:center"> '+ Apply.appropriateDate +'</td>';
					m_tbApply+='<td text-align:center"> '+ Apply.remitAmount +'</td>';
					m_tbApply+='<td text-align:center"> '+ Apply.payeeTypeName +'</td>';
					m_tbApply+='</tr>';
				});
				m_tbApply+="</table>";
			}
			
			var QcsRow = $('<tr><td style="text-align:center">' + RP.statusDesc + '</td><td colspan="2" >' + m_tbApply + '</td><td style="text-align:center">' + RP.resq_time + '</td></tr>');
			$('#tbRP').append(QcsRow);
		});	
	}
}

function SetObjToCtrlByClass(p_Obj,p_Ctrl)
{
    p_Ctrl.each(function(i, ctrl) 
    {
        if(ctrl.type=="checkbox")
        {
            var PropName = $(ctrl).attr("name").toLowerCase();
            
            if(p_Obj[PropName]!=undefined)
            {
                var PropVal = p_Obj[PropName];
                $('input[type="checkbox"][name="' + PropName + '"][value="' + PropVal + '"]').prop('checked', true);
            }
        }
        else
        {
            var PropName = $(ctrl).attr("id").toLowerCase();
          
            if(p_Obj[PropName]!=undefined)
            {
                var PropVal = p_Obj[PropName];
                $('#'+PropName).val(PropVal);
                
                if(PropName=="bus_type" )
                {
                    BindSubSel(m_promotion_no,p_Obj[PropName],"promotion_no");
                }
                if(PropName=="product_category_id")
                {
                    BindSubSel(m_product_id,p_Obj[PropName],"product_id");
                }
            }
		}
    });
}

function CheckAttFile(p_AttFile,p_Type)
{
    var m_hasData=true;
    if(p_AttFile ==null)
    {
        m_hasData=false;
    }
    else
    {
         if(p_AttFile.length==0)
         {
             m_hasData=false;
         }
    }
    if(m_hasData)
    {
        SetUpd_attachmentFile(p_AttFile,p_Type);
    }
}


function CheckCaseStatus() {
	$(".YRData").prop('disabled', true);
	$(".KFData").prop('disabled', true);
	$("#btnSubmit").prop('disabled', true);
	$("#divAddFile").hide();
	$("#divREAddFile").hide();
	$("#divRSAddFile").hide();
	$("#divRPAddFile").hide();
	$(".btnAddress").prop('disabled', true);

	switch ($("#casestatus").val()) {
		case '0'://未送裕富
			$(".YRData").prop('disabled', false);
			$(".KFData").prop('disabled', false);
			$("#btnSubmit").prop('disabled', false);
			$("#divAddFile").show();
			break;
		case '1'://收件

			break;
		case '2'://核准

			$("#RequestPayment").show();
			$("#divRPAddFile").show();
			$("#RequestSupplement").show();
			$("#divRSAddFile").show();
			break;
		case '3'://婉拒
			$("#RequestforExam").show();
			$("#divREAddFile").show();
			break;
		case '4'://附條件
			$("#RequestSupplement").show();
			$("#divRSAddFile").show();
			$("#RequestforExam").show();
			$("#divREAddFile").show();
			break;
		case '5'://待補
			$("#RequestSupplement").show();
			$("#divRSAddFile").show();
			break;
		case '6'://補件
			$("#RequestSupplement").show();
			$("#divRSAddFile").show();
			break;
		case '7'://申覆
			$("#RequestforExam").show();
			$("#divREAddFile").show();
			break;
		case '8'://自退
			$("#RequestSupplement").show();
			$("#divRSAddFile").show();
			break;
		case 'RS'://補件中
			$("#RequestSupplement").hide();
			$("#btnRS").prop('disabled', true);
			$("#RequestSupplement").show();
			$("#divRSAddFile").show();
			$("#btnRS").prop('disabled', false);
			break;
		case 'RE'://申覆中
			$("#RequestforExam").hide();
			$("#btnRE").prop('disabled', true);

			break;
		case 'RP'://請款中
			$("#RequestPayment").hide();
			$("#btnRP").prop('disabled', true);
			break;
	}
}

function PageUnblock() {
	$(".timeout").unblock({ fadeOut: 500 });
}

function GetYRData() 
{
	

    var m_form_no = $("#form_no").val();
    // 執行POST請求
      $.ajax({
        url: m_WebAPI_Path+'GetYRData?form_no=' + m_form_no,
        type: 'GET',
        data: {},
        contentType: 'application/json; charset=utf-8',
        success: function(result) 
        {
          if(result.resultCode=="000")
          {
              if(result.objResult.length!=0)
              {
                  SetObjToCtrl(result.objResult[0]);
				  CheckCaseStatus();
				  setTimeout('PageUnblock()', 100);
              }
          }
          else
          {
              alert(result.resultMsg)
          }
        },
          error: function(xhr, status, error) 
          {
            alert(error)
          }
      });
}

function AddArray(p_arr,p_obj)
{
     if(p_obj.val()!="")
    {
        var objSupplement = {};
        objSupplement['item']="00";
        objSupplement['comment']=p_obj.val();
        p_arr.push(objSupplement);
    }
}


function btnRPOnClick()
{
	$("#btnRP").prop('disabled', true);
	if(SubmitCheck('RP'))
	{
		var objRPData = {};
		var objBankInfo = {};
		if($("#RPattachmentFile").length!=0)
		{
			if(RPattachmentFile.textContent!="")
			{
				objRPData["attachmentFile"]=JSON.parse(RPattachmentFile.textContent);
			}
			else
			{
				objRPData["attachmentFile"]=null;
			}
		}
		objRPData["salesNo"] = $("#txtWorkID").val();
		objBankInfo = { "BankCode": $("#txtBankCode").val(), "BankName": $("#txtBankName").val(), "BankID": $("#txtBankID").val(), "AccountID": $("#txtAccountID").val(), "AccountName": $("#txtAccountName").val() };
		var requestData = {
			RequestPayment: objRPData,
			BankInfo: objBankInfo
		};


		// 執行POST請求
		$.ajax({
			url: m_WebAPI_Path+'RequestPayment?Form_No='+$("#form_no").val(),
			type: 'POST',
			data: JSON.stringify(requestData),
			contentType: 'application/json; charset=utf-8',
			success: function(result) 
			{
				if(result.resultCode=="000")
				{
				   var m_Result = result.objResult;
				   if(m_Result.code !="S001")
				   {
					  alert("請款-"+m_Result.msg);
				   }
				   else
				   {
					  alert("請款-"+m_Result.msg);
				   }
				}
				else
				{
					YuRichError(result.resultMsg);
				}
			},
			error: function(xhr, status, error) 
			{
				alert(error);
			} 
		});
	}
}


function btnREOnClick()
{
	$("#btnRE").prop('disabled', true);
	if(SubmitCheck('RE'))
	{
		var objREData = {};
		objREData["comment"]=$("#REcomment").val();
		if($("#REattachmentFile").length!=0)
		{
			if(REattachmentFile.textContent!="")
			{
				objREData["attachmentFile"]=JSON.parse(REattachmentFile.textContent);
			}
			else
			{
				objREData["attachmentFile"]=null;
			}
		}
		 objREData["salesNo"]=$("#txtWorkID").val();
		// 執行POST請求
		$.ajax({
			url: m_WebAPI_Path+'RequestforExam?Form_No='+$("#form_no").val(),
			type: 'POST',
			data: JSON.stringify(objREData),
			contentType: 'application/json; charset=utf-8',
			success: function(result) 
			{
				if(result.resultCode=="000")
				{
				   var m_Result = result.objResult;
				   if(m_Result.code !="S001")
				   {
					  alert("申覆-"+m_Result.msg);
				   }
				   else
				   {
					  alert("申覆-"+m_Result.msg);
				   }
				}
				else
				{
					YuRichError(result.resultMsg);
				}
			},
			error: function(xhr, status, error) 
			{
				alert(error);
			} 
		});
	}
}

function btnRSOnClick()
{
	$("#btnRS").prop('disabled', true);
	if(SubmitCheck('RS'))
	{
		var objRSData = {};
		var arrSupplement=[];
		AddArray(arrSupplement,$("#comment1"));
		AddArray(arrSupplement,$("#comment2"));
		AddArray(arrSupplement,$("#comment3"));
		AddArray(arrSupplement,$("#comment4"));
		
		if(arrSupplement.length!=0)
		{
			 objRSData["supplement"]=arrSupplement;
		}
		if($("#RSattachmentFile").length!=0)
		{
			if(RSattachmentFile.textContent!="")
			{
				objRSData["attachmentFile"]=JSON.parse(RSattachmentFile.textContent);
			}
			else
			{
				objRSData["attachmentFile"]=[{}];
			}
		}
		objRSData["salesNo"]=$("#txtWorkID").val();
		
		
		// 執行POST請求
		$.ajax({
			url: m_WebAPI_Path+'RequestSupplement?Form_No='+$("#form_no").val(),
			type: 'POST',
			data: JSON.stringify(objRSData),
			contentType: 'application/json; charset=utf-8',
			success: function(result) 
			{
				if(result.resultCode=="000")
				{
				   var m_Result = result.objResult;
				   if(m_Result.code !="S001")
				   {
					  alert("補件-"+m_Result.msg);
				   }
				   else
				   {
					  alert("補件-"+m_Result.msg);
				   }
				}
				else
				{
					YuRichError(result.resultMsg);
				}
			},
			error: function(xhr, status, error) 
			{
				alert("WebAPI連線錯誤!!");
			} 
		});
	}
}

function YuRichError(p_MSG)
{
	alert("裕富送件失敗-" + p_MSG);
	var page = 'YUR0002.aspx?Action=upd&MenuID=' + $("#hidMenuID").val() +'&form_no='+ $("#form_no").val() +'&CaseStatus=0&rdn='+Math.random();
	//window.location.href = page;
}

function btnSubmitOnClick(p_Class)
{
	$("#btnSubmit").prop('disabled', true);
	//裕富欄位
	var objYRData = GetObjByClass("YRData");
	//國?欄位
	var objKFData = GetObjByClass("KFData");
	//處理附件
	if($("#attachmentFile").length!=0)
	{
		if(attachmentFile.textContent!="")
		{
			objYRData["attachmentFile"]=JSON.parse(attachmentFile.textContent);
		}
		else
		{
			objYRData["attachmentFile"]=null;
		}
	}
	//tbReceive集合裕富國?欄位,處理國?的table
	var objInsReceive = $.extend({}, objYRData, objKFData);
	
	if($("#casestatus").val()=="0")
	{
		if($("#Action").val()=="upd")
		{
			if(SubmitCheck('RR'))
			{
				UpdateReceive(objInsReceive,objYRData);
			}
		}
	}
	else
	{
		if(SubmitCheck('RR'))
		{	
			InsertReceive(objInsReceive,objYRData);
		}   
	}
}

function InsertReceive(objInsReceive,objYRData)
{
	// 執行POST請求
	$.ajax({
		url: m_WebAPI_Path + 'InsertReceive?salesNo=' + $("#txtWorkID").val() + '&Case_Company=' + $("#hidCase_Company").val(),
		type: 'POST',
		data: JSON.stringify({ _Receive1: objInsReceive}),
		contentType: 'application/json; charset=utf-8',
		success: function(result) 
		{
			if(result.resultCode=="000")
			{
				var m_form_no=result.resultMsg;
				alert("單號:" + m_form_no + " ,存檔成功 ");
				$("#form_no").val(m_form_no);
				SubmitYuRich(objYRData);
			}
			else
			{
				alert("存檔失敗;"+result.resultMsg);
			}
		 },
		error: function(xhr, status, error) 
		{
		  alert("WebAPI連線錯誤!!");
		}
	});
}



function UpdateReceive(objInsReceive,objYRData)
{
	// 執行POST請求
	$.ajax({
		url: m_WebAPI_Path + 'UpdReceive?form_no=' + $("#form_no").val() + '&salesNo=' + $("#txtWorkID").val() + '&Case_Company=' + $("#hidCase_Company").val(),
		type: 'POST',
		data: JSON.stringify({ _Receive1: objInsReceive}),
		contentType: 'application/json; charset=utf-8',
		success: function(result) 
		{
			if(result.resultCode=="000")
			{
				alert(result.resultMsg+"更新成功!");
				SubmitYuRich(null);
			}
			else
			{
				alert(result.resultMsg);
			}
		 },
		error: function(xhr, status, error) 
		{
		  alert("WebAPI連線錯誤!!");
		}
	});
}



function SubmitYuRich(p_objYRData)
{
	var objYRData=null;
	if(p_objYRData==null)
	{
		//裕富欄位
		objYRData = GetObjByClass("YRData");
		//處理附件
		if($("#attachmentFile").length!=0)
		{
			if(attachmentFile.textContent!="")
			{
				objYRData["attachmentFile"]=JSON.parse(attachmentFile.textContent);
			}
			else
			{
				objYRData["attachmentFile"]=null;
			}
		}
		//修改模式進來時,原本有的檔案要再回傳到裕富API
		if($("#Upd_attachmentFile").length!=0)
		{
			if(Upd_attachmentFile.textContent!="")
			{
				var m_OldFiles=JSON.parse(Upd_attachmentFile.textContent);
				if(attachmentFile.textContent!="")
				{
					var m_NewFiles=JSON.parse(attachmentFile.textContent);
					$(m_NewFiles).each(function(index, element) 
					{
						m_OldFiles.push(element);
					});
				}
				objYRData["attachmentFile"]=m_OldFiles;
			}
		}
	}
	else
	{
		objYRData=p_objYRData;
	}
	

	$('.timeout').block({

		theme: true,
		message: '<img src="/KF_Web/Img/loading.gif" /><H1>資料拋轉裕富...</H1>',
		showOverlay: false,
		centerY: false,
		centerX: true,
		draggable: true,
		themedCSS: {
			opacity: 0.7,
			width: '85%',
			height: '40%',
			cursor: 'initial',
			top: '65%'
		}
		
	});

	//===================呼叫裕富API============================
	// 執行POST請求
	$.ajax({
		url: m_WebAPI_Path+'Receive?Form_No='+ $("#form_no").val() +'&salesNo='+$("#txtWorkID").val(),
		type: 'POST',
		data: JSON.stringify(objYRData),
		contentType: 'application/json; charset=utf-8',
		success: function(result) 
		{
			if(result.resultCode=="000")
			{
				var m_Result = result.objResult;
				if(m_Result.code !="1000")
				{
					YuRichError(m_Result.msg);
				}
				else
				{
					//裕富單號
					var m_examineNo= m_Result.examineNo;
					alert("裕富送件成功,單號-" + m_examineNo);
					opener.document.getElementById('btnSearch').onclick();
					window.close();
				}
			}
			else
			{
				YuRichError(result.resultMsg);
			}
			$('.timeout').unblock();
		},
		error: function(xhr, status, error) 
		{
			alert("WebAPI連線錯誤!!");
		}
	});
	//======================
}



function SubmitCheck(p_Type)
{
	var m_Result = true;
	var Error = "";
	var ErrID='';
	if(p_Type=="RR")
	{
		$.each($("input.Key"), function(idx, Index) {
		
			if (Index.type == "text" || Index.type == "number")
			 {
				 if(Index.value=="")
				 {
					 Error+="請輸入:" + $("#TD_"+Index.id).text()+" <br>";
					 ErrID = Index.id;
				 }
			 }
			 else
			 {
				 if($('input[name='+ Index.name +']:checked').length==0)
				 {
					 Error += "請勾選:" + $("#TD_" + Index.name).text() + " <br>";
					 ErrID = Index.id;
				 }
			 }
		});

		if ($("#product_category_id").val() == "") {
			Error += "請選擇:" + $("#TD_product_category_id").text() + " <br>";
			ErrID = "product_category_id";
		}
		


		if ($("#staging_amount").val() != "") {
			if (promotion_Value[$('#promotion_no').val()].value < parseInt($("#staging_amount").val())) {
				Error += $("#TD_staging_amount").text() + ": " + promotion_Value[$('#promotion_no').val()].info +" <br>";
				ErrID = "staging_amount";
			}
			
		}
		if ($("#staging_amount").val() != "") {
			if (promotion_Value[$('#promotion_no').val()].value < parseInt($("#staging_amount").val())) {
				Error += $("#TD_staging_amount").text() + ": " + promotion_Value[$('#promotion_no').val()].info + " <br>";
				ErrID = "staging_amount";
			}

		}

		

		if($("#Action").val()=="upd")
		{
			if(attachmentFile.textContent=="" && Upd_attachmentFile=="")
			{
			   Error+="未上傳附件! ";
			}
		}
		else
		{
			if(attachmentFile.textContent=="")
			{
			   Error+="未上傳附件! ";
			}
		}
		if(Error!="")
		{
			$("#btnSubmit").prop('disabled', false);
		}
	}
	else if(p_Type=="RE")
	{
		if($("#REcomment").val()=="")
		{
			Error +="請輸入:申覆備註 <br>";
		}
		/*if(REattachmentFile.textContent=="" )
		{
		   Error+="未上傳附件! ";
		}*/
		if(Error!="")
		{
			$("#btnRE").prop('disabled', false);
		}
	}
	else if(p_Type=="RS")
	{	
		if(RSattachmentFile.textContent=="")
		{
		   Error+="未上傳附件! ";
		}
		else
		{
			Error += CheckFileAndComm('1');
			Error += CheckFileAndComm('2');
			Error += CheckFileAndComm('3');
			Error += CheckFileAndComm('4');
		}
		if(Error!="")
		{
			$("#btnRS").prop('disabled', false);
		}
	}
	else if(p_Type=="RP")
	{	
		if(RPattachmentFile.textContent=="")
		{
			Error +="未上傳附件! <br>";
		}
		else
		{
			Error += CheckFileAndComm('1');
			Error += CheckFileAndComm('2');
			Error += CheckFileAndComm('3');
			Error += CheckFileAndComm('4');
		}
		
		if ($("#txtBankCode").val() == "")
		{
			Error += "請輸入:匯款銀行代碼 <br>";
			ErrID = "txtBankCode";
		}
		if ($("#txtBankName").val() == "") {
			Error += "請輸入:匯款銀行 <br>";
			ErrID = "txtBankName";
		}
		if ($("#txtBankID").val() == "") {
			Error += "請輸入:銀行帳號 <br>";
			ErrID = "txtBankID";
		}
		if ($("#txtAccountID").val() == "") {
			Error += "請輸入:戶名ID <br>";
			ErrID = "txtAccountID";
		}
		if ($("#txtAccountName").val() == "") {
			Error += "請輸入:戶名 <br>";
			ErrID = "txtAccountName";
		}

		if(Error!="")
		{
			$("#btnRP").prop('disabled', false);
		}
	}
	if (Error != "")
	{
		AlertMSG(Error, ErrID,true)
		m_Result = false;
	}
	return m_Result
}


function OnClickSame(p_Type) {
	if (p_Type == "AccountID") {
		$("#txtAccountID").val($("#customer_idcard_no").val());
	}
	else {
		$("#txtAccountName").val($("#customer_name").val());
	}
}

function CheckFileAndComm(p_Idx)
{
	var Error="";
	if($('#RS_File'+p_Idx).get(0).files.length !=0 && $('#comment'+p_Idx).val()=="")
	{
		Error=" 請輸入補件備註"+p_Idx +"\r";
	}
	return Error
}


function readFile(InputID,file, index, callback) 
{
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => 
    {
        const fileObj = 
        {
            file_index: index.toString(),
            file_body_encode: reader.result.split(',')[1],
            file_size: file.size.toString(),
            content_type: file.name.split('.').pop(),
            file_name: file.name
        };
        const fileSizeInBytes = file.size;
        $("#lbl"+InputID).html(  Math.floor((fileSizeInBytes / 1024)).toString()+"KB");
        
        callback(fileObj);
		};
}



function SetUpd_attachmentFile(p_Files,p_Type)
{
    const fileInputs = p_Files;
    const results = [];
    switch (p_Type) 
    {
         case 'R':
            checkId="Upd_attachmentFile";
            break;
         case 'RS':
            checkId="Upd_RSattachmentFile";
            break;
         case 'RE':
            checkId="Upd_REattachmentFile";
            break;
         case 'RP':
            checkId="Upd_RPattachmentFile";
            break;
    }
    for (let i = 0; i < fileInputs.length; i++) 
    {
        var decodedData = atob(fileInputs[i].file_body_encode);
        const file = new Blob([decodedData], { type: 'application/octet-stream' });
        UpdReadFile("lbl" + p_Type +"UpdFile"+ fileInputs[i].file_index,p_Type,fileInputs[i].transactionId ,file, fileInputs[i].file_name,fileInputs[i].file_index, (fileObj) => 
        {
            results.push(fileObj);
            $("#" + checkId).prop("textContent",JSON.stringify(results, null, 2));
        });
       
    }
    return false;
}

function UpdReadFile(InputID, Type, transactionId, file, fileName, index, callback) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		const fileObj =
		{
			file_index: index.toString(),
			file_body_encode: reader.result.split(',')[1],
			file_size: file.size.toString(),
			content_type: fileName.split('.').pop(),
			file_name: fileName
		};
		const fileSizeInBytes = file.size;
		var isBreak = false;
		switch (Type) {
			case 'R':
				DivId = "divUpdFile";
				isBreak = false;
				break;
			case 'RS':
				DivId = "Att" + transactionId;
				break;
			case 'RE':
				DivId = "Att" + transactionId;
				break;
			case 'RP':
				DivId = "Att" + transactionId;
				break;
		}
		var targetDiv = $('#' + DivId);
		// 創建一個新的input元素
		var newLabel1 = $('<label>');
		newLabel1.attr('id', InputID);
		newLabel1.attr('style', 'text-decoration: underline;cursor: pointer;color:#2828FF');
		newLabel1.click(function () {
			GetFile(index, Type)
		});
		newLabel1.text(fileName);

		var newLabel2 = $('<label>');
		newLabel2.text("    " + Math.floor((fileSizeInBytes / 1024)).toString() + "KB　");

		targetDiv.append(newLabel1);
		targetDiv.append(newLabel2);
		callback(fileObj);
	};
}

function getFileIndex(p_Class)
{
    var rtnIndex=0;
	var checkId = "";
	var PlusIndex = 0;

    switch (p_Class) 
    {
         case '.file':
            checkId="Upd_attachmentFile";
            break;
         case '.RSfile':
			checkId = "Upd_RSattachmentFile";
			if ($("#tbRS label[id^='lblRSUpdFile']").length!=0) {
				PlusIndex = $("#tbRS label[id^='lblRSUpdFile']").length;
			}
            break;
         case '.REfile':
            checkId="Upd_REattachmentFile";
            break;
         case '.RPfile':
            checkId="Upd_RPattachmentFile";
            break;
    }
    //修改模式進來時,原本有的檔案要再回傳到裕富API,FilesIdx要重新指定
    if($("#"+checkId).length!=0)
    {
        if($("#" + checkId).prop("textContent")!="")
        {
            var m_OldFiles = JSON.parse($("#" + checkId).prop("textContent"));
            //取得舊附件index
            rtnIndex = parseInt(m_OldFiles[m_OldFiles.length-1].file_index)+1;
        }
	}
	rtnIndex = rtnIndex + PlusIndex;
    return rtnIndex;
}

function convertFiles(p_Class,p_preName) 
{
    const fileInputs = [];
		$(p_Class).each(function(index, element) 
    {
        fileInputs.push(element)
		});
    const results = [];
    let m_fileIndex = getFileIndex(p_Class);
    for (let i = 0; i < fileInputs.length; i++) 
		{
        if (fileInputs[i].files.length > 0)
        {
            const file = fileInputs[i].files[0];
            readFile(fileInputs[i].id,file, m_fileIndex, (fileObj) => 
            {
                results.push(fileObj);
                $("#" + p_preName).prop("textContent",JSON.stringify(results, null, 2));
            });
            m_fileIndex += 1;
        }
    }
    return false;
}
        
function CtrlAddress(p_From,p_To)
{
    $("#"+ p_To +"_postalcode").val($("#"+ p_From +"_postalcode").val());
    $("#"+ p_To +"_addcity").val($("#"+ p_From +"_addcity").val());
    $("#"+ p_To +"_addregion").val($("#"+ p_From +"_addregion").val());
    $("#"+ p_To +"_address").val($("#"+ p_From +"_address").val());
}        

cityarea = new Array();
cityarea_account = new Array();
cityarea_account[0] = 0;
cityarea[1] = "仁愛區";
cityarea[2] = "信義區";
cityarea[3] = "中正區";
cityarea[4] = "中山區";
cityarea[5] = "安樂區";
cityarea[6] = "暖暖區";
cityarea[7] = "七堵區";
cityarea_account[1] = 7;
cityarea[8] = "中正區";
cityarea[9] = "大同區";
cityarea[10] = "中山區";
cityarea[11] = "松山區";
cityarea[12] = "大安區";
cityarea[13] = "萬華區";
cityarea[14] = "信義區";
cityarea[15] = "士林區";
cityarea[16] = "北投區";
cityarea[17] = "內湖區";
cityarea[18] = "南港區";
cityarea[19] = "文山區";
cityarea_account[2] = 19;
cityarea[20] = "萬里區";
cityarea[21] = "金山區";
cityarea[22] = "板橋區";
cityarea[23] = "汐止區";
cityarea[24] = "深坑區";
cityarea[25] = "石碇區";
cityarea[26] = "瑞芳區";
cityarea[27] = "平溪區";
cityarea[28] = "雙溪區";
cityarea[29] = "貢寮區";
cityarea[30] = "新店區";
cityarea[31] = "坪林區";
cityarea[32] = "烏來區";
cityarea[33] = "永和區";
cityarea[34] = "中和區";
cityarea[35] = "土城區";
cityarea[36] = "三峽區";
cityarea[37] = "樹林區";
cityarea[38] = "鶯歌區";
cityarea[39] = "三重區";
cityarea[40] = "新莊區";
cityarea[41] = "泰山區";
cityarea[42] = "林口區";
cityarea[43] = "蘆洲區";
cityarea[44] = "五股區";
cityarea[45] = "八里區";
cityarea[46] = "淡水區";
cityarea[47] = "三芝區";
cityarea[48] = "石門區";
cityarea_account[3] = 48;
cityarea[49] = "中壢區";
cityarea[50] = "平鎮區";
cityarea[51] = "龍潭區";
cityarea[52] = "楊梅區";
cityarea[53] = "新屋區";
cityarea[54] = "觀音區";
cityarea[55] = "桃園區";
cityarea[56] = "龜山區";
cityarea[57] = "八德區";
cityarea[58] = "大溪區";
cityarea[59] = "復興區";
cityarea[60] = "大園區";
cityarea[61] = "蘆竹區";
cityarea_account[4] = 61;
cityarea[62] = "東區";
cityarea[63] = "北區";
cityarea[64] = "香山區";
cityarea_account[5] = 64;
cityarea[65] = "竹北市";
cityarea[66] = "湖口鄉";
cityarea[67] = "新豐鄉";
cityarea[68] = "新埔鎮";
cityarea[69] = "關西鎮";
cityarea[70] = "芎林鄉";
cityarea[71] = "寶山鄉";
cityarea[72] = "竹東鎮";
cityarea[73] = "五峰鄉";
cityarea[74] = "橫山鄉";
cityarea[75] = "尖石鄉";
cityarea[76] = "北埔鄉";
cityarea[77] = "峨眉鄉";
cityarea_account[6] = 77;
cityarea[78] = "竹南鎮";
cityarea[79] = "頭份市";
cityarea[80] = "三灣鄉";
cityarea[81] = "南庄鄉";
cityarea[82] = "獅潭鄉";
cityarea[83] = "後龍鎮";
cityarea[84] = "通霄鎮";
cityarea[85] = "苑裡鎮";
cityarea[86] = "苗栗市";
cityarea[87] = "造橋鄉";
cityarea[88] = "頭屋鄉";
cityarea[89] = "公館鄉";
cityarea[90] = "大湖鄉";
cityarea[91] = "泰安鄉";
cityarea[92] = "銅鑼鄉";
cityarea[93] = "三義鄉";
cityarea[94] = "西湖鄉";
cityarea[95] = "卓蘭鎮";
cityarea_account[7] = 95;
cityarea[96] = "中區";
cityarea[97] = "東區";
cityarea[98] = "南區";
cityarea[99] = "西區";
cityarea[100] = "北區";
cityarea[101] = "北屯區";
cityarea[102] = "西屯區";
cityarea[103] = "南屯區";
cityarea[104] = "太平區";
cityarea[105] = "大里區";
cityarea[106] = "霧峰區";
cityarea[107] = "烏日區";
cityarea[108] = "豐原區";
cityarea[109] = "后里區";
cityarea[110] = "石岡區";
cityarea[111] = "東勢區";
cityarea[112] = "和平區";
cityarea[113] = "新社區";
cityarea[114] = "潭子區";
cityarea[115] = "大雅區";
cityarea[116] = "神岡區";
cityarea[117] = "大肚區";
cityarea[118] = "沙鹿區";
cityarea[119] = "龍井區";
cityarea[120] = "梧棲區";
cityarea[121] = "清水區";
cityarea[122] = "大甲區";
cityarea[123] = "外埔區";
cityarea[124] = "大安區";
cityarea_account[8] = 124;
cityarea[125] = "彰化市";
cityarea[126] = "芬園鄉";
cityarea[127] = "花壇鄉";
cityarea[128] = "秀水鄉";
cityarea[129] = "鹿港鎮";
cityarea[130] = "福興鄉";
cityarea[131] = "線西鄉";
cityarea[132] = "和美鎮";
cityarea[133] = "伸港鄉";
cityarea[134] = "員林市";
cityarea[135] = "社頭鄉";
cityarea[136] = "永靖鄉";
cityarea[137] = "埔心鄉";
cityarea[138] = "溪湖鎮";
cityarea[139] = "大村鄉";
cityarea[140] = "埔鹽鄉";
cityarea[141] = "田中鎮";
cityarea[142] = "北斗鎮";
cityarea[143] = "田尾鄉";
cityarea[144] = "埤頭鄉";
cityarea[145] = "溪州鄉";
cityarea[146] = "竹塘鄉";
cityarea[147] = "二林鎮";
cityarea[148] = "大城鄉";
cityarea[149] = "芳苑鄉";
cityarea[150] = "二水鄉";
cityarea_account[9] = 150;
cityarea[151] = "南投市";
cityarea[152] = "中寮鄉";
cityarea[153] = "草屯鎮";
cityarea[154] = "國姓鄉";
cityarea[155] = "埔里鎮";
cityarea[156] = "仁愛鄉";
cityarea[157] = "名間鄉";
cityarea[158] = "集集鎮";
cityarea[159] = "水里鄉";
cityarea[160] = "魚池鄉";
cityarea[161] = "信義鄉";
cityarea[162] = "竹山鎮";
cityarea[163] = "鹿谷鄉";
cityarea_account[10] = 163;
cityarea[164] = "斗南鎮";
cityarea[165] = "大埤鄉";
cityarea[166] = "虎尾鎮";
cityarea[167] = "土庫鎮";
cityarea[168] = "褒忠鄉";
cityarea[169] = "東勢鄉";
cityarea[170] = "臺西鄉";
cityarea[171] = "崙背鄉";
cityarea[172] = "麥寮鄉";
cityarea[173] = "斗六市";
cityarea[174] = "林內鄉";
cityarea[175] = "古坑鄉";
cityarea[176] = "莿桐鄉";
cityarea[177] = "西螺鎮";
cityarea[178] = "二崙鄉";
cityarea[179] = "北港鎮";
cityarea[180] = "水林鄉";
cityarea[181] = "口湖鄉";
cityarea[182] = "四湖鄉";
cityarea[183] = "元長鄉";
cityarea_account[11] = 183;
cityarea[184] = "東區";
cityarea[185] = "西區";
cityarea_account[12] = 185;
cityarea[186] = "番路鄉";
cityarea[187] = "梅山鄉";
cityarea[188] = "竹崎鄉";
cityarea[189] = "阿里山鄉";
cityarea[190] = "中埔鄉";
cityarea[191] = "大埔鄉";
cityarea[192] = "水上鄉";
cityarea[193] = "鹿草鄉";
cityarea[194] = "太保市";
cityarea[195] = "朴子市";
cityarea[196] = "東石鄉";
cityarea[197] = "六腳鄉";
cityarea[198] = "新港鄉";
cityarea[199] = "民雄鄉";
cityarea[200] = "大林鎮";
cityarea[201] = "溪口鄉";
cityarea[202] = "義竹鄉";
cityarea[203] = "布袋鎮";
cityarea_account[13] = 203;
cityarea[204] = "中西區";
cityarea[205] = "東區";
cityarea[206] = "南區";
cityarea[207] = "北區";
cityarea[208] = "安平區";
cityarea[209] = "安南區";
cityarea[210] = "永康區";
cityarea[211] = "歸仁區";
cityarea[212] = "新化區";
cityarea[213] = "左鎮區";
cityarea[214] = "玉井區";
cityarea[215] = "楠西區";
cityarea[216] = "南化區";
cityarea[217] = "仁德區";
cityarea[218] = "關廟區";
cityarea[219] = "龍崎區";
cityarea[220] = "官田區";
cityarea[221] = "麻豆區";
cityarea[222] = "佳里區";
cityarea[223] = "西港區";
cityarea[224] = "七股區";
cityarea[225] = "將軍區";
cityarea[226] = "學甲區";
cityarea[227] = "北門區";
cityarea[228] = "新營區";
cityarea[229] = "後壁區";
cityarea[230] = "白河區";
cityarea[231] = "東山區";
cityarea[232] = "六甲區";
cityarea[233] = "下營區";
cityarea[234] = "柳營區";
cityarea[235] = "鹽水區";
cityarea[236] = "善化區";
cityarea[237] = "大內區";
cityarea[238] = "山上區";
cityarea[239] = "新市區";
cityarea[240] = "安定區";
cityarea_account[14] = 240;
cityarea[241] = "新興區";
cityarea[242] = "前金區";
cityarea[243] = "苓雅區";
cityarea[244] = "鹽埕區";
cityarea[245] = "鼓山區";
cityarea[246] = "旗津區";
cityarea[247] = "前鎮區";
cityarea[248] = "三民區";
cityarea[249] = "楠梓區";
cityarea[250] = "小港區";
cityarea[251] = "左營區";
cityarea[252] = "仁武區";
cityarea[253] = "大社區";
cityarea[254] = "東沙群島";
cityarea[255] = "南沙群島";
cityarea[256] = "岡山區";
cityarea[257] = "路竹區";
cityarea[258] = "阿蓮區";
cityarea[259] = "田寮區";
cityarea[260] = "燕巢區";
cityarea[261] = "橋頭區";
cityarea[262] = "梓官區";
cityarea[263] = "彌陀區";
cityarea[264] = "永安區";
cityarea[265] = "湖內區";
cityarea[266] = "鳳山區";
cityarea[267] = "大寮區";
cityarea[268] = "林園區";
cityarea[269] = "鳥松區";
cityarea[270] = "大樹區";
cityarea[271] = "旗山區";
cityarea[272] = "美濃區";
cityarea[273] = "六龜區";
cityarea[274] = "內門區";
cityarea[275] = "杉林區";
cityarea[276] = "甲仙區";
cityarea[277] = "桃源區";
cityarea[278] = "那瑪夏區";
cityarea[279] = "茂林區";
cityarea[280] = "茄萣區";
cityarea_account[15] = 280;
cityarea[281] = "屏東市";
cityarea[282] = "三地門鄉";
cityarea[283] = "霧臺鄉";
cityarea[284] = "瑪家鄉";
cityarea[285] = "九如鄉";
cityarea[286] = "里港鄉";
cityarea[287] = "高樹鄉";
cityarea[288] = "鹽埔鄉";
cityarea[289] = "長治鄉";
cityarea[290] = "麟洛鄉";
cityarea[291] = "竹田鄉";
cityarea[292] = "內埔鄉";
cityarea[293] = "萬丹鄉";
cityarea[294] = "潮州鎮";
cityarea[295] = "泰武鄉";
cityarea[296] = "來義鄉";
cityarea[297] = "萬巒鄉";
cityarea[298] = "崁頂鄉";
cityarea[299] = "新埤鄉";
cityarea[300] = "南州鄉";
cityarea[301] = "林邊鄉";
cityarea[302] = "東港鎮";
cityarea[303] = "琉球鄉";
cityarea[304] = "佳冬鄉";
cityarea[305] = "新園鄉";
cityarea[306] = "枋寮鄉";
cityarea[307] = "枋山鄉";
cityarea[308] = "春日鄉";
cityarea[309] = "獅子鄉";
cityarea[310] = "車城鄉";
cityarea[311] = "牡丹鄉";
cityarea[312] = "恆春鎮";
cityarea[313] = "滿州鄉";
cityarea_account[16] = 313;
cityarea[314] = "臺東市";
cityarea[315] = "綠島鄉";
cityarea[316] = "蘭嶼鄉";
cityarea[317] = "延平鄉";
cityarea[318] = "卑南鄉";
cityarea[319] = "鹿野鄉";
cityarea[320] = "關山鎮";
cityarea[321] = "海端鄉";
cityarea[322] = "池上鄉";
cityarea[323] = "東河鄉";
cityarea[324] = "成功鎮";
cityarea[325] = "長濱鄉";
cityarea[326] = "太麻里鄉";
cityarea[327] = "金峰鄉";
cityarea[328] = "大武鄉";
cityarea[329] = "達仁鄉";
cityarea_account[17] = 329;
cityarea[330] = "花蓮市";
cityarea[331] = "新城鄉";
cityarea[332] = "秀林鄉";
cityarea[333] = "吉安鄉";
cityarea[334] = "壽豐鄉";
cityarea[335] = "鳳林鎮";
cityarea[336] = "光復鄉";
cityarea[337] = "豐濱鄉";
cityarea[338] = "瑞穗鄉";
cityarea[339] = "萬榮鄉";
cityarea[340] = "玉里鎮";
cityarea[341] = "卓溪鄉";
cityarea[342] = "富里鄉";
cityarea_account[18] = 342;
cityarea[343] = "宜蘭市";
cityarea[344] = "頭城鎮";
cityarea[345] = "礁溪鄉";
cityarea[346] = "壯圍鄉";
cityarea[347] = "員山鄉";
cityarea[348] = "羅東鎮";
cityarea[349] = "三星鄉";
cityarea[350] = "大同鄉";
cityarea[351] = "五結鄉";
cityarea[352] = "冬山鄉";
cityarea[353] = "蘇澳鎮";
cityarea[354] = "南澳鄉";
cityarea[355] = "釣魚臺";
cityarea_account[19] = 355;
cityarea[356] = "馬公市";
cityarea[357] = "西嶼鄉";
cityarea[358] = "望安鄉";
cityarea[359] = "七美鄉";
cityarea[360] = "白沙鄉";
cityarea[361] = "湖西鄉";
cityarea_account[20] = 361;
cityarea[362] = "金沙鎮";
cityarea[363] = "金湖鎮";
cityarea[364] = "金寧鄉";
cityarea[365] = "金城鎮";
cityarea[366] = "烈嶼鄉";
cityarea[367] = "烏坵鄉";
cityarea_account[21] = 367;
cityarea[368] = "南竿鄉";
cityarea[369] = "北竿鄉";
cityarea[370] = "莒光鄉";
cityarea[371] = "東引鄉";
cityarea_account[22] = 371;
cityarea[372] = "東沙群島";
cityarea[373] = "南沙群島";
cityarea_account[23] = 373;
cityarea[374] = "釣魚臺";
city_account = 23;

var zipcode_database = {
	'基隆市': { '仁愛區': '200', '信義區': '201', '中正區': '202', '中山區': '203', '安樂區': '204', '暖暖區': '205', '七堵區': '206' },
	'臺北市': { '中正區': '100', '大同區': '103', '中山區': '104', '松山區': '105', '大安區': '106', '萬華區': '108', '信義區': '110', '士林區': '111', '北投區': '112', '內湖區': '114', '南港區': '115', '文山區': '116' },
	'新北市': {
		'萬里區': '207', '金山區': '208', '板橋區': '220', '汐止區': '221', '深坑區': '222', '石碇區': '223',
		'瑞芳區': '224', '平溪區': '226', '雙溪區': '227', '貢寮區': '228', '新店區': '231', '坪林區': '232',
		'烏來區': '233', '永和區': '234', '中和區': '235', '土城區': '236', '三峽區': '237', '樹林區': '238',
		'鶯歌區': '239', '三重區': '241', '新莊區': '242', '泰山區': '243', '林口區': '244', '蘆洲區': '247',
		'五股區': '248', '八里區': '249', '淡水區': '251', '三芝區': '252', '石門區': '253'
	},
	'宜蘭縣': {
		'宜蘭市': '260', '頭城鎮': '261', '礁溪鄉': '262', '壯圍鄉': '263', '員山鄉': '264', '羅東鎮': '265',
		'三星鄉': '266', '大同鄉': '267', '五結鄉': '268', '冬山鄉': '269', '蘇澳鎮': '270', '南澳鄉': '272',
		'釣魚臺列嶼': '290'
	},
	'新竹市': { '東區': '300', '北區': '300', '香山區': '300' },
	'新竹縣': {
		'竹北市': '302', '湖口鄉': '303', '新豐鄉': '304', '新埔鎮': '305', '關西鎮': '306', '芎林鄉': '307',
		'寶山鄉': '308', '竹東鎮': '310', '五峰鄉': '311', '橫山鄉': '312', '尖石鄉': '313', '北埔鄉': '314',
		'峨眉鄉': '315'
	},
	'桃園市': {
		'中壢區': '320', '平鎮區': '324', '龍潭區': '325', '楊梅區': '326', '新屋區': '327', '觀音區': '328',
		'桃園區': '330', '龜山區': '333', '八德區': '334', '大溪區': '335', '復興區': '336', '大園區': '337',
		'蘆竹區': '338'
	},
	'苗栗縣': {
		'竹南鎮': '350', '頭份市': '351', '三灣鄉': '352', '南庄鄉': '353', '獅潭鄉': '354', '後龍鎮': '356',
		'通霄鎮': '357', '苑裡鎮': '358', '苗栗市': '360', '造橋鄉': '361', '頭屋鄉': '362', '公館鄉': '363',
		'大湖鄉': '364', '泰安鄉': '365', '銅鑼鄉': '366', '三義鄉': '367', '西湖鄉': '368', '卓蘭鎮': '369'
	},
	'臺中市': {
		'中區': '400', '東區': '401', '南區': '402', '西區': '403', '北區': '404', '北屯區': '406', '西屯區': '407', '南屯區': '408',
		'太平區': '411', '大里區': '412', '霧峰區': '413', '烏日區': '414', '豐原區': '420', '后里區': '421',
		'石岡區': '422', '東勢區': '423', '和平區': '424', '新社區': '426', '潭子區': '427', '大雅區': '428',
		'神岡區': '429', '大肚區': '432', '沙鹿區': '433', '龍井區': '434', '梧棲區': '435', '清水區': '436',
		'大甲區': '437', '外埔區': '438', '大安區': '439'
	},
	'彰化縣': {
		'彰化市': '500', '芬園鄉': '502', '花壇鄉': '503', '秀水鄉': '504', '鹿港鎮': '505', '福興鄉': '506',
		'線西鄉': '507', '和美鎮': '508', '伸港鄉': '509', '員林市': '510', '社頭鄉': '511', '永靖鄉': '512',
		'埔心鄉': '513', '溪湖鎮': '514', '大村鄉': '515', '埔鹽鄉': '516', '田中鎮': '520', '北斗鎮': '521',
		'田尾鄉': '522', '埤頭鄉': '523', '溪州鄉': '524', '竹塘鄉': '525', '二林鎮': '526', '大城鄉': '527',
		'芳苑鄉': '528', '二水鄉': '530'
	},
	'南投縣': {
		'南投市': '540', '中寮鄉': '541', '草屯鎮': '542', '國姓鄉': '544', '埔里鎮': '545', '仁愛鄉': '546',
		'名間鄉': '551', '集集鎮': '552', '水里鄉': '553', '魚池鄉': '555', '信義鄉': '556', '竹山鎮': '557',
		'鹿谷鄉': '558'
	},
	'嘉義市': { '東區': '600', '西區': '600' },
	'嘉義縣': {
		'番路鄉': '602', '梅山鄉': '603', '竹崎鄉': '604', '阿里山鄉': '605', '中埔鄉': '606', '大埔鄉': '607',
		'水上鄉': '608', '鹿草鄉': '611', '太保市': '612', '朴子市': '613', '東石鄉': '614', '六腳鄉': '615',
		'新港鄉': '616', '民雄鄉': '621', '大林鎮': '622', '溪口鄉': '623', '義竹鄉': '624', '布袋鎮': '625'
	},
	'雲林縣': {
		'斗南鎮': '630', '大埤鄉': '631', '虎尾鎮': '632', '土庫鎮': '633', '褒忠鄉': '634', '東勢鄉': '635',
		'臺西鄉': '636', '崙背鄉': '637', '麥寮鄉': '638', '斗六市': '640', '林內鄉': '643', '古坑鄉': '646',
		'莿桐鄉': '647', '西螺鎮': '648', '二崙鄉': '649', '北港鎮': '651', '水林鄉': '652', '口湖鄉': '653',
		'四湖鄉': '654', '元長鄉': '655'
	},
	'臺南市': {
		'中西區': '700', '東區': '701', '南區': '702', '北區': '704', '安平區': '708', '安南區': '709',
		'永康區': '710', '歸仁區': '711', '新化區': '712', '左鎮區': '713', '玉井區': '714', '楠西區': '715',
		'南化區': '716', '仁德區': '717', '關廟區': '718', '龍崎區': '719', '官田區': '720', '麻豆區': '721',
		'佳里區': '722', '西港區': '723', '七股區': '724', '將軍區': '725', '學甲區': '726', '北門區': '727',
		'新營區': '730', '後壁區': '731', '白河區': '732', '東山區': '733', '六甲區': '734', '下營區': '735',
		'柳營區': '736', '鹽水區': '737', '善化區': '741', '大內區': '742', '山上區': '743', '新市區': '744',
		'安定區': '745'
	},
	'高雄市': {
		'新興區': '800', '前金區': '801', '苓雅區': '802', '鹽埕區': '803', '鼓山區': '804', '旗津區': '805',
		'前鎮區': '806', '三民區': '807', '楠梓區': '811', '小港區': '812', '左營區': '813',
		'仁武區': '814', '大社區': '815', '東沙群島': '817', '南沙群島': '819', '岡山區': '820', '路竹區': '821',
		'阿蓮區': '822', '田寮區': '823',
		'燕巢區': '824', '橋頭區': '825', '梓官區': '826', '彌陀區': '827', '永安區': '828', '湖內區': '829',
		'鳳山區': '830', '大寮區': '831', '林園區': '832', '鳥松區': '833', '大樹區': '840', '旗山區': '842',
		'美濃區': '843', '六龜區': '844', '內門區': '845', '杉林區': '846', '甲仙區': '847', '桃源區': '848',
		'那瑪夏區': '849', '茂林區': '851', '茄萣區': '852'
	},
	'屏東縣': {
		'屏東市': '900', '三地門鄉': '901', '霧臺鄉': '902', '瑪家鄉': '903', '九如鄉': '904', '里港鄉': '905',
		'高樹鄉': '906', '鹽埔鄉': '907', '長治鄉': '908', '麟洛鄉': '909', '竹田鄉': '911', '內埔鄉': '912',
		'萬丹鄉': '913', '潮州鎮': '920', '泰武鄉': '921', '來義鄉': '922', '萬巒鄉': '923', '崁頂鄉': '924',
		'新埤鄉': '925', '南州鄉': '926', '林邊鄉': '927', '東港鎮': '928', '琉球鄉': '929', '佳冬鄉': '931',
		'新園鄉': '932', '枋寮鄉': '940', '枋山鄉': '941', '春日鄉': '942', '獅子鄉': '943', '車城鄉': '944',
		'牡丹鄉': '945', '恆春鎮': '946', '滿州鄉': '947'
	},
	'臺東縣': {
		'臺東市': '950', '綠島鄉': '951', '蘭嶼鄉': '952', '延平鄉': '953', '卑南鄉': '954', '鹿野鄉': '955',
		'關山鎮': '956', '海端鄉': '957', '池上鄉': '958', '東河鄉': '959', '成功鎮': '961', '長濱鄉': '962',
		'太麻里鄉': '963', '金峰鄉': '964', '大武鄉': '965', '達仁鄉': '966'
	},
	'花蓮縣': {
		'花蓮市': '970', '新城鄉': '971', '秀林鄉': '972', '吉安鄉': '973', '壽豐鄉': '974', '鳳林鎮': '975',
		'光復鄉': '976', '豐濱鄉': '977', '瑞穗鄉': '978', '萬榮鄉': '979', '玉里鎮': '981', '卓溪鄉': '982',
		'富里鄉': '983'
	},
	'金門縣': { '金沙鎮': '890', '金湖鎮': '891', '金寧鄉': '892', '金城鎮': '893', '烈嶼鄉': '894', '烏坵鄉': '896' },
	'連江縣': { '南竿鄉': '209', '北竿鄉': '210', '莒光鄉': '211', '東引鄉': '212' },
	'澎湖縣': { '馬公市': '880', '西嶼鄉': '881', '望安鄉': '882', '七美鄉': '883', '白沙鄉': '884', '湖西鄉': '885' }
};

function addrInputer(p_event, Type) {
	var m_Html = '<div style="width:400px"> ';
	m_Html += ' <table style="width: 95%;margin:auto" border="1" id="Title" cellspacing="0" cellpadding="3" bgcolor=""> ';
	m_Html += ' <tr bgcolor="#CCCCFF" height="35" align="center"> '; 
	m_Html += '  <td colspan="4">選擇地址</td> '; 
	m_Html += '</tr> '; 
	m_Html += '<tr><td> '; 
	m_Html += ' <input type="text" size="8" id="zipcode" name="zipcode" placeholder="郵遞區號" readonly=""/>                                                                                               ';
	m_Html += '    <select name="cities" id="cities" onchange="getCities();">                                                                                                                         ';
	m_Html += '        <option value=""></option>                                                                                                                                                ';
	m_Html += '        <option value="2">新北市</option>                                                                                                                                                 ';
	m_Html += '        <option value="1">臺北市</option>                                                                                                                                                 ';
	m_Html += '        <option value="3">桃園市</option>                                                                                                                                                 ';
	m_Html += '        <option value="0">基隆市</option>                                                                                                                                                 ';
	m_Html += '        <option value="4">新竹市</option>                                                                                                                                                 ';
	m_Html += '        <option value="5">新竹縣</option>                                                                                                                                                 ';
	m_Html += '        <option value="6">苗栗縣</option>                                                                                                                                                 ';
	m_Html += '        <option value="7">臺中市</option>                                                                                                                                                 ';
	m_Html += '        <option value="8">彰化縣</option>                                                                                                                                                 ';
	m_Html += '        <option value="9">南投縣</option>                                                                                                                                                 ';
	m_Html += '        <option value="10">雲林縣</option>                                                                                                                                                ';
	m_Html += '        <option value="11">嘉義市</option>                                                                                                                                                ';
	m_Html += '        <option value="12">嘉義縣</option>                                                                                                                                                ';
	m_Html += '        <option value="13">臺南市</option>                                                                                                                                                ';
	m_Html += '        <option value="14">高雄市</option>                                                                                                                                                ';
	m_Html += '        <option value="15">屏東縣</option>                                                                                                                                                ';
	m_Html += '        <option value="16">臺東縣</option>                                                                                                                                                ';
	m_Html += '        <option value="17">花蓮縣</option>                                                                                                                                                ';
	m_Html += '        <option value="18">宜蘭縣</option>                                                                                                                                                ';
	m_Html += '        <option value="19">澎湖縣</option>                                                                                                                                                ';
	m_Html += '        <option value="20">金門縣</option>                                                                                                                                                ';
	m_Html += '        <option value="21">連江縣</option>                                                                                                                                                ';
	m_Html += '    </select>                                                                                                                                                                          ';
	m_Html += '    <select name="cityarea" id="cityarea" onchange="cityareaChange()" class="red-point">                                                                                               ';
	m_Html += '        <option value=""></option>                                                                                                                                               ';
	m_Html += '    </select>                                                                                                                                                                          ';
	m_Html += '</td></tr> '; 
	/*m_Html += '<tr><td> '; 
	m_Html += '    <input type="text" size="5" name="village" id="village" value="" class="em5">里                                                                                                     ';
	m_Html += '    <input type="number" size="5" name="neighborhood" id="neighborhood" value="" class="em5">鄰                                                                                         ';
	m_Html += '    &nbsp;                                                                                                                                                                             ';
	m_Html += '    <select id="sltRoad"  class="red-point">                                                                                                                ';
	m_Html += '        <option value="">(選擇路街段)</option>                                                                                                                                              ';
	m_Html += '    </select> /                                                                                                                                                                        ';
	m_Html += '    <input type="text" size="25" name="road" id="road" value="" placeholder="自行輸入路街段 (中文)" class="em25" >                           ';
	m_Html += '</td></tr> '; 
	m_Html += '<tr><td> '; 
	m_Html += '    <input type="number" size="5" name="lane" id="lane" value="" class="em5">巷                                                                                                         ';
	m_Html += '    &nbsp;                                                                                                                                                                             ';
	m_Html += '    <input type="number" size="5" name="Alley" id="Alley" value="" class="em5">弄                                                                                                       ';
	m_Html += '    &nbsp;                                                                                                                                                                             ';
	m_Html += '    <input type="number" size="5" name="Alley2" id="Alley2" value="" class="em5">衖                                                                                                     ';
	m_Html += '    <input type="number" size="2" name="no2" id="no2" value="">號                                                                                              ';
	m_Html += '    <input type="number" size="2" name="floor" id="floor" onchange="ChkfloorNo()"" value="" class="em2" >樓 <span id="lblfloorNo" style="display:none"> 之</span><input style="display:none" type="number" size="2" name="floorNo" id="floorNo" value="" class="em2" >                                                                                                                                               ';
	m_Html += '</td></tr> '; */
	m_Html += '<tr><td> '; 
	m_Html += "    <input type='submit' name='OK' value='確定' onclick='jsCheck()'>     ";
	m_Html += '</td></tr> '; 
	m_Html += '</table> '; 
	m_Html += '   </div>   <input type="hidden" id="hidAddGroup" value="' + Type +'"  />     ';
	var m_top = $(window).height() - ($(window).height() - p_event.pageY) - 10;
	$.blockUI({
		onOverlayClick: $.unblockUI,
		overlayCSS: { backgroundColor: '#FFF', opacity: 0.5, cursor: 'default' },
		theme: true,
		title: '選擇地址', 
		themedCSS: {
			width: '450px',
		    left: '150px', border: '1px solid', cursor: 'default',
			centerY: false,
			centerX: true,
		}, 
		message: m_Html
	});

	setTimeout("CheckArrress()", 100);

}
/*
function ChkfloorNo() {
	if ($("#floor").val() != "") {
		$("#lblfloorNo").show();
		$("#floorNo").show();
	}
	else {
		$("#lblfloorNo").hide();
		$("#floorNo").hide();
		$("#floorNo").val("");
	}
}
*/
function setSelAddress(p_address)
{
	var RoadArray = $("#sltRoad option").map(function () {
		return $(this).text();
	}).get();

	RoadArray.sort(function (a, b) {
		return b.length - a.length;
	});

	var SelRoad = "";
	$.each(RoadArray, function (idx, Item) {
		if (p_address.indexOf(Item) != -1) {
			p_address = p_address.replace(Item, '');
			SelRoad = Item;
		}
	});

	$("#sltRoad option").filter(function () {
		return $(this).text() === SelRoad;
	}).prop("selected", true);

	
	/*
	//擷取號後面的文字
	var strFloor = p_address.substring(p_address.indexOf("號")+1);
	if (strFloor.indexOf("之") != -1) {
		
		$('#floorNo').show();
		$('#lblfloorNo').show();
		$('#floorNo').val(strFloor.substring(strFloor.indexOf("之") + 1));

		p_address = p_address.replace("之" + $('#floorNo').val(), '');
	}


	var separators = ["里", "鄰", "段", "弄", "巷", "衖", "號", "樓"];
	var sections = [];
	var currentSection = "";
	for (var i = 0; i < p_address.length; i++) {
		currentSection += p_address[i];
		if (separators.includes(p_address[i]) || i === p_address.length - 1) {
			sections.push(currentSection);
			currentSection = "";
		}
	}

	
	
	$.each(sections, function (idx, Item) {
		if (Item.indexOf("里") != -1) {
			$('#village').val(Item.replace('里', ''));
		}
		if (Item.indexOf("鄰") != -1) {
			$('#neighborhood').val(Item.replace('鄰', ''));
		}
		if (Item.indexOf("段") != -1) {
			$('#road').val(Item);
		}
		if (Item.indexOf("巷") != -1) {
			$('#lane').val(Item.replace('巷', ''));
		}
		if (Item.indexOf("弄") != -1) {
			$('#Alley').val(Item.replace('弄', ''));
		}
		if (Item.indexOf("衖") != -1) {
			$('#Alley2').val(Item.replace('衖', '').replace('里', ''));
		}
		if (Item.indexOf("號") != -1) {
			$('#no2').val(Item.replace('號', ''));
		}
		if (Item.indexOf("樓") != -1) {
			$('#floor').val(Item.replace('樓', ''));
			$("#lblfloorNo").show();
			$("#floorNo").show();
		}
	});*/
}


function CheckArrress() {
	var m_AddGroup = $("#hidAddGroup").val();
	var m_zipcode = $("#" + m_AddGroup + "_postalcode").val();
	var m_cities = $("#" + m_AddGroup + "_addcity").val();
	var m_cityarea = $("#" + m_AddGroup + "_addregion").val();
	var m_address = $("#" + m_AddGroup + "_address").val();




	if (m_zipcode != "") {
		$("#zipcode").val(m_zipcode);
	}
	if (m_cities != "") {
		$("#cities option").filter(function () {
			return $(this).text() === m_cities;
		}).prop("selected", true);
		getCities();
	}
	if (m_cityarea != "") {
		$("#cityarea option").filter(function () {
			return $(this).text() === m_cityarea;
		}).prop("selected", true);
		cityareaChange(m_address);
	}

}


function jsCheck() {
	var m_AddGroup =$("#hidAddGroup").val();
	/*var val = ''
	val += $('#village').val() ? $('#village').val() + '里' : ''
	val += $('#neighborhood').val() > 0 ? $('#neighborhood').val() + '鄰' : ''
	if ($('#road').val() == "") {
		val += $('#sltRoad option:selected').text();
	}
	else {
		val += $('#sltRoad option:selected').text()+ $('#road').val();
	}
	val += $('#lane').val() > 0 ? $('#lane').val() + '巷' : ''
	val += $('#Alley').val() > 0 ? $('#Alley').val() + '弄' : ''
	val += $('#Alley2').val() > 0 ? $('#Alley2').val() + '衖' : ''
	val += $('#no2').val() > 0 ? $('#no2').val() + '號' : ''
	val += $('#floor').val() > 0 ? $('#floor').val() + '樓' : ''
	val += $('#floorNo').val() > 0 ? '之' + $('#floorNo').val()  : ''
	document.getElementById(m_AddGroup + '_address').value = val;
	*/
	document.getElementById(m_AddGroup + '_postalcode').value = $('#zipcode').val();
	document.getElementById(m_AddGroup + '_addcity').value = $('#cities option:selected').text();
	document.getElementById(m_AddGroup + '_addregion').value = $('#cityarea option:selected').text();
	
	$.unblockUI();
}


function getCities() {
	var ct = document.getElementById("cityarea");
	var selectCity = document.getElementById("cities");
	console.log(361, ct, selectCity)
	ct.removeElement;
	ct.length = cityarea_account[parseInt(selectCity.value) + 1] - cityarea_account[parseInt(selectCity.value)] + 1;
	var index = cityarea_account[parseInt(selectCity.value)] + 1;
	ct.options[0].text = "";
	for (j = 1; j < ct.length; j++) {
		ct.options[j].value = cityarea[index + j - 1];
		ct.options[j].text = cityarea[index + j - 1];
	}
	//console.log(251,cityarea , '<%=cityarea%>')
	if ('' != '<%=cityarea%>') {
		$('#cityarea').val('<%=cityarea%>')
		cityareaChange()
	}
}


function cityareaChange(p_address) {
	if (!$('#cities').val() || !$('#cityarea').val()) return false
	var selCity = $('#cities option:selected').text();
	var selSite = $('#cityarea option:selected').text();
	var m_Employee = {  "CompanyCode": $("#txtCompanyCode").val(), "WorkID": $("#txtWorkID").val(), "Remark": $('#txtRemark').val(), "DisplayName": $('#DisplayName').val() };

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: "YUR0002.aspx/GetCityInfo",
		data: JSON.stringify({ "Employee": m_Employee, "City": selCity, "Site": selSite }),
		dataType: "json",
		success: function (Result) {
			if (Result.d != null) {
				if (Result.d.isSuccess) {
					$('#sltRoad').empty();
					$.each(Result.d.ResultEntity, function (idx, Item) {
						$('#sltRoad').append('<option value="' + Item.road + '">' + Item.road + '</option>');
					});

					if (p_address) {
						setSelAddress(p_address);
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
	let zipcode = zipcode_database[$('#cities option:selected').text()][$('#cityarea').val()];
	$('#zipcode').val(zipcode);
}