//Angularjs Demo  home.js
var app=angular.module("app",["ui.router"]);
// angular.module("app",[
// 		"ui.router"
// 	])
app.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/header");

		$stateProvider
			.state("header",{
					url:"/header",
					templateUrl:"./header.html",				 
				})

			.state("content",{
					url:"/content",
					templateUrl:"./content.html",
					controller:function($scope){
						$scope.things=11112123
					}
				})

			.state("footer",{
					url:"/foter",
					templateUrl:"./footer.html"
				})

	})