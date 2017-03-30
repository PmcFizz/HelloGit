//Angularjs Demo  home.js
var app=angular.module("app",["ui.router"]);
// angular.module("app",[
// 		"ui.router"
// 	])
app.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/home.html");

		$stateProvider
			.state("header",{
					url:"/header",
					templateUrl:"./header.html",				 
				})

			.state("content",{
					url:"/content",
					templateUrl:"./content.html"
				})

			.state("footer",{
					url:"/foter",
					templateUrl:"./footer.html"
				})

	})