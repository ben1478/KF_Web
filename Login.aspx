<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="KF_Web.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ><head>
<title>國峯租賃</title>
</head>
<body style="background-repeat: no-repeat; background-position: top center; background-image: url(img/loginKF.jpg)" class="xspView tundra">
    <form runat="server">
        <div align="center">
            <table id="view:_id1:tableBody" border="0" cellpadding="0" cellspacing="0" style="width: auto; margin-top: 80px">
                <tbody>
                    <tr>
                        <td style="width: 1.0%"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style="width: 0.0%"></td>
                    </tr>
                    <tr>
                        <td style="width: 1.0%"></td>
                        <td colspan="3" style="width: 1000px; height: 500px" valign="bottom">
                            <table style="width: 100%; padding-top: 250px; margin-left: 20px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 31%"></td>
                                        <td align="right" style="width: 20%"><span style="color: rgb(0,0,0); font-size: 13pt; font-weight: bolder">帳號：</span>
                                        </td>
                                        <td align="left" style="width: 49%">
                                            <input runat="server" type="text" id="txtLoginID" style="font-size: 12pt; width: 165px" tabindex="1" /></td>
                                        <td align="left" rowspan="2"></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 1.0%"></td>

                                        <td align="right"><span style="color: rgb(0,0,0); font-size: 13pt; font-weight: bolder">密碼：</span>
                                        </td>
                                        <td align="left">
                                            <input id="txtPassword" runat="server" type="password" style="font-size: 12pt; width: 165px" tabindex="2" />
                                        </td>
                                         <td style="width: 0.0%"></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 1.0%"></td>
                                        <td colspan="2" style="height: 55px; text-align: left; width: auto" valign="top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgb(255,0,0); font-weight: bold; padding-left: 148px; font-size: 12pt">&nbsp;&nbsp;&nbsp;</span>

                                            <asp:Button ID="btnLogin" OnClientClick="return ChkLogin()" Style="font-family: 微軟正黑體; font-size: 14px; width: 100px; height: 30px; font-weight: bold"
                                                runat="server" Text="登入驗證" OnClick="btnLogin_Click" />
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgb(255,0,0); font-weight: bold; padding-left: 148px; font-size: 12pt">&nbsp;&nbsp;&nbsp;</span><label id="lblErrMSG" style="color: red"></label>
                                        </td>
                                        <td style="width: 0.0%"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="width: 0.0%"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
    <script type="text/javascript">

        function ChkLogin() {
            if (!(document.getElementById("txtLoginID").value.trim() != "" && document.getElementById("txtPassword").value != "")) {

                document.getElementById("lblErrMSG").innerText = "請輸入帳號密碼!!";
                return false;
            }
            else {
                document.getElementById("lblErrMSG").innerText = "";
                return true;
            }
        }

    </script>

</body></html>