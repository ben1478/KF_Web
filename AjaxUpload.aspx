<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AjaxUpload.aspx.cs" Inherits="KF_Web.AjaxUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
  <script src="Scripts/jquery-1.9.1.min.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
      <input type="file" id="filecontrol" />
    <input type="button" onclick="DownloadDOC('20170718014659041');" value="Upload File" />

    </div>
    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
    <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
    <asp:TextBox ID="TextBox3" runat="server"></asp:TextBox>
    </form>
</body>
  <script type="text/javascript" >
      function DownloadDOC(p_DocID) {
          p_dlLink = "DownloadPage.aspx?mode=download&DocID=" + p_DocID;
          var $ifrm = $("<iframe id='" + p_DocID + "' style='display:none' />");
          $ifrm.attr("src", p_dlLink);
          $ifrm.appendTo("body");
          $ifrm.load(function () {
            
              alert('Failed to download!!DocID:' + p_DocID + ";MSG:"+$("#" + p_DocID).contents().find("#DownErr" + p_DocID).text());
          });
      }


   </script>
</html>
