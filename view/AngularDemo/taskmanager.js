var demo=angular.module("demo",[]);
demo.controller('myctrl',function($scope){
	$scope.task="";
	$scope.tasks=[];
	$scope.add=function(){
		$scope.tasks.push($scope.task);
		$scope.task="";
	};
	$scope.show=true;
	$scope.isNow=function(index){
		console.log(1);
		return "as";
	}

	$scope.addRow=function(){
		console.log("addrow")

	}

	$scope.delRow=function(){
		console.log("delrow")		
	}

	
})
// var str=[{"a":"b"}, {"a":"d"}, {"a":"f"}, {"a":"h"}].reduce(function(previousValue, currentValue, index, array){
//  return (previousValue.a ? previousValue.a : previousValue) + currentValue.a;
// });
// console.log(str);

//arr.reduce(function(a,b){return (a.a ?a.a :a)+b.a});