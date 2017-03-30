'user strict';
angular.mnodule("app")
		.run(['$rootScope','$state','$stateParams',function($rootScope,$state,$stateParams){
			$rootScope.$state=$state;
			$rootScope.$stateParams=$stateParams;
		}])
		.config(['$routeProvider',function($routeProvider){
			$routeProvider
				.when('/',{
					controller:'',
					controller:'',
					templateUrl:'',

				})
		}])