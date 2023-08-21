<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestForm.aspx.cs" Inherits="KF_Web.TestForm" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="keywords" content="KF Web SYSTEM" />
<meta name="description" content="KF Web SYSTEM"/>
<meta name="author" content="KF"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="Scripts/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="Scripts/jsapi.js" ></script>
<script type="text/javascript" src="Scripts/uds_api_contents.js" ></script>

 

  <script>
    

      // Here We will fill chartData

      $(document).ready(function () {

          $.ajax({
              url: "TestForm.aspx/GetChartData",
              data: "",
              dataType: "json",
              type: "POST",
              contentType: "application/json; chartset=utf-8",
              success: function (data) {
                  
                  drawVisualization(data.d);
              },
              error: function () {
                  alert("Error loading data! Please try again.");
              }
          }).done(function () {

              google.setOnLoadCallback(drawVisualization);
          });
      });



      function drawVisualization(p_data) {
          var data = google.visualization.arrayToDataTable(p_data);

          new google.visualization.LineChart(document.getElementById('chart_div')).
        draw(
          data,
          {
              title: "Company Revenue",
              pointSize: 3
          }
        );
      }



 
            </script>


<link rel="shortcut icon" href="img/favicon.ico"/>
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
<form id="FormMaintain" runat="server">

<div id="chart_div" style="width:500px;height:400px">
                <%-- Here Chart Will Load --%>
            </div>



     <div id='DtlAddCtrl' style='display:inline'>
        
        <table style="width:90%;display:inline">
            <tr> 
                <td>
                    <label>Request：</label> 

                </td>
                <td>
                <textarea id="TextArea1" rows="10" cols="80"></textarea>
                <input type="button" onclick="Submit()" value="Submit" />

                </td>
               
            </tr>
             <tr style="height:auto"> 
                <td style="height:auto">
                    <label>Response：</label> 
                </td>
                <td style="height:auto">
                <div id="divResponse"></div>
                </td>
            </tr>
         </table>
        
     </div>
    </form>
</body>
 <script type="text/javascript" >
     
     function Submit() {
        
       
        var params = {
            // These are optional request parameters. They are set to their default values.
            "timezoneOffset": "0",
            "verbose": "false",
            "spellCheck": "false",
            "staging": "false",
            "q": $("#TextArea1").val()
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/f434cbc5-190f-4169-91f8-d169d8978680?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9a02831d4cec44ddbc00b3acafc09e01");
            },
            type: "GET",
            // The request body may be empty for a GET request
            data: "{body}",
        })
        .done(function(data) {
            if(data.topScoringIntent.intent=="None")
            {
               $("#lblResponse").append("<br/><label style='color:Green;font-weight:300'> CharBot："+"我聽不懂'" + data.query+"'的意思</label>");
            }
            else
            {
                var m_MSG="";
                if(data.entities.length!=0)
                {
                m_MSG+="<label>共點了"+data.entities.length+"個項目分別是</label></br>";
                $.each(data.entities, function (index, entitie) {
                    
                    if(data.entities[index].type)
                    {
                       m_MSG +="<label >類別："+data.entities[index].type+"；</label>";
                    }
                    if(data.entities[index].entity)
                    {
                       m_MSG +="<label style='color:Red;'>實體："+data.entities[index].entity+"；</label></br>";
                    }
                });

                  
                }
                var m_Result="<br/><label style='color:Blue;font-weight:300'> User："+$("#TextArea1").val()+"</label>"+"<br/><label style='color:Green;font-weight:300'> CharBot："+ data.topScoringIntent.intent+"；</label>"+"<br/><label style='color:Green;font-weight:300'> "+m_MSG+"</label>";
             //  $("#lblResponse").before(m_Result);
             $("#divResponse").html(m_Result+ $("#divResponse").html());
              $("#TextArea1").val("");
            }

        })
        .fail(function() {
            alert("error");
        });
     }


   </script>
</html>
