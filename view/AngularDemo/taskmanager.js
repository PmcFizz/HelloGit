var demo=angular.module("demo",[]);
demo.controller('myctrl',function($scope){
	$scope.task="";
	$scope.tasks=[];
	$scope.add=function(){
		$scope.tasks.push($scope.task);
		$scope.task="";
	}
})