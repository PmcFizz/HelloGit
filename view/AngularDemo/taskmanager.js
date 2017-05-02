var demo=angular.module("demo",[]);
demo.controller('myctrl',function($scope){
	$scope.task="";
	$scope.tasks=[];
	$scope.people=['wkd','mjh','zqy','zff']
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

demo.directive('hello',function(){
	return {
		restrict:"E",
		template:""+
		"<div class='panel panel-success'>"+
		"<div class='panel-title'><h4>Hi This is Hello content</h4></div>"+
		"</div>",
		replace:true
	};
});

demo.directive('pmc',function(){
	return {
		restrict:"E",
		template:'<div>Hi there <a ng-transclude></a></div>',
		transclude:true
	}
})

demo.directive('wkd',function(){
	return {
		restrict:"E",
		template:"<span>Do you like me ?",
		replace:true
	}
})
// var str=[{"a":"b"}, {"a":"d"}, {"a":"f"}, {"a":"h"}].reduce(function(previousValue, currentValue, index, array){
//  return (previousValue.a ? previousValue.a : previousValue) + currentValue.a;
// });
// console.log(str);

//arr.reduce(function(a,b){return (a.a ?a.a :a)+b.a});