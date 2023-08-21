<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainForm.aspx.cs" Inherits="KF_Web.MainForm" %>

<!--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">-->
<!DOCTYPE html>
<html>

<head>
	<!-- Meta, title, CSS, favicons, etc. -->
	
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>KF Web-國峯租賃</title>
	<meta name="keywords" content="KF Web" />
	<meta name="description" content="KF Web" />
	<meta name="author" content=" Kuo Fong Co" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<!-- Font CSS (Via CDN) -->
	
	<link rel='stylesheet' type='text/css' href='fonts/flaticon/flaticon.css'/>
	<!-- Theme CSS -->
	<link rel="stylesheet" type="text/css" href="Content/flag-icon-css-master/css/flag-icon.min.css"/>
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome/font-awesome.css"/>
	<link rel="stylesheet" type="text/css" href="Content/theme.css"/>
	<!-- Admin Forms CSS -->
	<link rel="stylesheet" type="text/css" href="Content/admin-forms.css"/>
	<!-- Favicon -->
	<link rel="shortcut icon" href="img/favicon.ico"/>

	<script  type="text/javascript" src="Scripts/jquery/jquery-1.11.1.min.js"></script>
	<script  type="text/javascript" src="Scripts/jquery/jquery_ui/jquery-ui.min.js"></script>
   <script type="text/javascript" src="Scripts/jquery.blockUI.js" ></script>
   <style type="text/css">    
   .hand
{
	cursor:pointer;
}
.Carousel
{
	Max-Height:600px;
	Max-Width:1550px;
	
	}
</style>
</head>

<body class="dashboard-page sb-l-o">
<form id="MainForm" runat="server">
	<!-- Start: Main -->
	<div id="main">
     
    <asp:TextBox ID="txtCompanyCode" Width="90px" style="display:none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtDisplayName" Width="90px" style="display:none" Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtWorkID" Width="90px" style="display:none"  Enabled="false" runat="server" AutoPostBack="True"></asp:TextBox>
    <asp:TextBox ID="txtSiteFormID" style="display:none" ReadOnly="true" runat="server" AutoPostBack="True"></asp:TextBox>

		<!-- Start: Header -->
		<header class="navbar navbar-fixed-top">
			<div class="navbar-branding">
				<a class="navbar-brand" href="#"><img src="img/logo/logo.png" style="width:200px;" alt="KF Web SYSTEM" title="KF Web SYSTEM"/> </a> <span id="toggle_sidemenu_l" class="ad ad-lines"></span> </div>
			<!--             <ul class="nav navbar-nav navbar-left">
                <li>
                    <a class="topbar-menu-toggle" href="#"> <span class="fa fa-heart fs16"></span> </a>
                </li>
            </ul> -->
              <select class="nav navbar-nav navbar-right " id="selSite" style="width:100px;margin-top:18px ;display:none" onchange="ChangeSite()"></select>

			<ul class="nav navbar-nav navbar-right">

				<!--<li class="dropdown">
					   <select id="selLanguage" runat="server"  onchange="GetLanguageByPage()">
        <option value="TW">中文</option>
        <option value="US">English</option>
    </select>
				</li>-->
				<li class="dropdown">
					<a href="#" class="dropdown-toggle fw600 p15" data-toggle="dropdown"><img src="img/avatars/1.jpg" alt="avatar" class="mw30 br64 mr15"/><span runat="server" id="spDisPlayName"/></span>
                  
                     <!--<span class="caret caret-tp hidden-xs"></span>--> </a>
					<ul class="dropdown-menu list-group dropdown-persist w250" role="menu">
						<%--<li class="list-group-item">
							<a href="#" class="animated animated-short fadeInUp"> <span class="fa fa-gear"></span> 帳戶設定 </a>
						</li>--%>
						<li class="dropdown-footer">
							<a href="Login.aspx" target="_self" class=""> <span class="fa fa-power-off pr5"></span> 登出 </a>
						</li>
					</ul>
				</li>
                  
			</ul>
          
		</header>
		<!-- End: Header -->
		<!-- Start: Sidebar Left -->
		<aside id="sidebar_left" class="nano nano-primary affix">
			<!-- Start: Sidebar Left Content -->
			<div id="divMainMenu" runat="server" class="sidebar-left-content nano-content divMainMenu">
				<!-- Start: Sidebar Left Menu -->
			
				<!-- End: Sidebar Menu -->
				<!-- Start: Sidebar Collapse Button -->
				<div class="sidebar-toggle-mini">
					<a href="#"> <span class="fa fa-sign-out"></span> </a>
				</div>
				<!-- End: Sidebar Collapse Button -->
			</div>
			<!-- End: Sidebar Left Content -->
		</aside>
		<!-- End: Sidebar Left -->
		<!-- Start: Content-Wrapper -->
		<section id="content_wrapper">
			<!-- Start: Topbar-Dropdown -->
		
			<section id="content" class="table-layout animated fadeIn">
				<!-- begin: .tray-center -->
				<div class="tray tray-center p40 va-t posr">
					<div class="row">
						<div class="col-md-12">
							<div id="col-left" class="col-lg-8 col-md-12 mb25" style="width:100%">
								<div id="myCarousel" class="carousel slide mb25" data-ride="carousel">
									<!-- Wrapper for slides -->
									<div id="divPageCarousels" runat="server" class="carousel-inner">
										
									</div>
									<!-- End Carousel Inner -->
									<!-- Controls -->
									<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a>
									<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a>
									<ul id="ulCarouselTab" runat="server" class="nav nav-pills nav-justified">
										<li data-target="#myCarousel" data-slide-to="0" ><a href="#">資訊系統</a></li>
										<li data-target="#myCarousel" data-slide-to="1"class="active"><a href="#">創意中心</a></li>
										<li data-target="#myCarousel" data-slide-to="2"><a href="#">舊版首頁</a></li>
									</ul>
								</div>
								<!-- End Carousel -->
								<div id="index-table" style="display:none" class="tab-block">
									<div class="nav nav-tabs mb25 mt5">
										<ul class="nav nav-tabs">
											<li class="active"> <a href="#tab1_1" data-toggle="tab" aria-expanded="true"><img alt="refresh"  onclick="GetSignBox();" src="Img/refresh.gif" /><label runat="server" id="lblSignBox">待簽核文件</label><span id='spSignBoxCount' class="badge badge-danger"></span></a> </li>
											
										</ul>
										<div class="tab-content panel-scroller scroller-lg scroller-pn pn ">
											<div class="tab-content pn br-n admin-form ">
												<div id="divSignBox" style="width:100%;height:100%;" class="tab-pane active divSignBox">
													<table id="tabSignBox" runat="server" class="table mbn tc-med-1 tc-bold-last">
														<tbody>
															
															
														</tbody>
													</table>
												</div>
											
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="col-right" style="display:none" class="col-lg-4 col-md-12 mb25">
								<div class="panel bg-alert of-h mb20" id="divLeaveDayInfo">
									<div class="pn pl20">
										<div class="icon-bg"><i class="fa fa-plane"></i> </div>
										<div class="panel-2col col-lg-10">
											<div class="col-md-6 col-sm-6 col-xs-6" style="border-right:1px solid rgba(255,255,255,0.2);">
												<h3 class="mt15 lh15">
												                  <b><label  id="Annualleave"></label></b>
												                </h3>
												<h5 class="text-muted"><label runat="server" id="lblSP_Holiday">特休可休</label></h5>
											</div>
											<div class="col-md-6 col-sm-6 col-xs-6 row" style="padding-left:20%;">
												<h3 class="mt15 lh15">
												                  <b><label  id="compensatoryleave"></label></b>
												                </h3>
												<h5 class="text-muted"><label runat="server" id="lblCO_Holiday">補休可休</label></h5>
											</div>
										</div> </div>
								</div>
								<div id="divLeave" runat="server" class="panel panel-warning">
								
								</div>
								<div id="divRoom" runat="server" class="panel panel-system">
								
								</div>
								<div  class="panel panel-primary">
									<div id="divFavorite" runat="server" class="panel-heading"> <span class="panel-title"><i class="fa fa-heart"></i> </span> </div>
									<div class="panel-scroller scroller-sm scroller-pn">
									<div id="divFavoriteList" runat="server" class="panel-menu mn pn br-n">
										
										</div></div>
								</div>
								<div  class="panel panel-tile bg-info light">
									<div id="divIssue" runat="server" class="panel-body pn pl20 p5">
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- end: .tray-center -->
			</section>
			<!-- End: Content -->
			<!-- Begin: Page Footer -->
			<footer id="content-footer">
				<div class="row">
					<div class="col-md-6"> <span class="footer-legal">© 2023 Kuo Fong Co., Ltd</span> </div>
					<div class="col-md-6 text-right">
						<a href="#content" class="footer-return-top"> <span class="fa fa-arrow-up"></span> </a>
					</div>
				</div>
			</footer>
			<!-- End: Page Footer -->
		</section>
		<!-- End: Content-Wrapper -->
	</div>
	<!-- End: Main -->
	<!-- BEGIN: PAGE SCRIPTS -->
	<!-- jQuery -->
	
	<!-- Theme Javascript -->
	<script  type="text/javascript" src="Scripts/utility/utility.js"></script>
	<script  type="text/javascript" src="Scripts/main.js"></script>
	<!-- Widget Javascript -->
	<script type="text/javascript">
	    jQuery(document).ready(function () {
	        "use strict";
	        // Init Theme Core      
	        Core.init();
	        // Init Widget Demo JS
	        // demoHighCharts.init();
	        // Because we are using Admin Panels we use the OnFinish 
	        // callback to activate the demoWidgets. It's smoother if
	        // we let the panels be moved and organized before 
	        // filling them with content from various plugins
	        // Init plugins used on this page
	        // HighCharts, JvectorMap, Admin Panels
	        // Init Admin Panels on widgets inside the ".admin-panels" container
	        $('.admin-panels').adminpanel({
	            grid: '.admin-grid'
				, draggable: true
				, preserveGrid: true
				, mobile: false
				, onStart: function () {
				    // Do something before AdminPanels runs
				}
				, onFinish: function () {
				    $('.admin-panels').addClass('animated fadeIn').removeClass('fade-onload');
				    // Init the rest of the plugins now that the panels
				    // have had a chance to be moved and organized.
				    // It's less taxing to organize empty panels
				    demoHighCharts.init();
				    runVectorMaps(); // function below
				}
				, onSave: function () {
				    $(window).trigger('resize');
				}
	        });
	    });
	</script>
	<script  type="text/javascript">
        $(function () {
	        var $carousel = $('#myCarousel'), // Carousel Wrapper
				$carouselNav = $('#myCarousel .nav'); // Carousel-Navigation (UL-Element)
	        $carousel.carousel({
	            interval: 6000
	        });
	        $carousel.find('.nav a').on('click', function () {
	            $carouselNav.find('li.active').removeClass('active');
	            $(this).parent().addClass('active');
	        });
	        $carousel.on('slide.bs.carousel', function (e) {
	            var currentSlideNo = $(e.relatedTarget).index();
	            $carouselNav.find('li.active').removeClass('active');
	            $carouselNav.find('li[data-slide-to="' + currentSlideNo + '"]').addClass('active');
	        });
	    });
    </script>
	<!-- END: PAGE SCRIPTS -->
    </form>
</body>

</html>