var demo=angular.module("demo",[]);

demo.controller('myctrl',function($scope,$http){
	$scope.task="";
	$scope.tasks=[];
	$scope.people=['wkd','mjh','zqy','zff']
	$scope.add=function(str){
		console.log(str);
		$http.post('/223/45',{name:1,age:2},function(res){

		});

		$.ajax({
			url:'/12/31',
			type:"post",
			data:{name:21,age:3},
			dataType:"json",
			contentType:"application/json;charset=UTF-8"
			//Content-Type:text/html; charset=utf-8

		})

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
	};

	$scope.menuTree=[
      {
        "functionUrl": null,
        "functionPage": null,
        "functionName": "系统管理",
        "functionId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f9",
        "functionPId": "0"
      },
      {
        "functionUrl": null,
        "functionPage": null,
        "functionName": "数据管理",
        "functionId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f5",
        "functionPId": "0"
      },
      {
        "functionUrl": "orderSon/getOrderFrt",
        "functionPage": "financial2.html",
        "functionName": "订单费用审核",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb12sr234",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f47"
      },
      {
        "functionUrl": "sysUser/getSysUsers",
        "functionPage": "AccountManagement.html",
        "functionName": "账号管理",
        "functionId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f1",
        "functionPId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f9"
      },
      {
        "functionUrl": null,
        "functionPage": null,
        "functionName": "调度管理",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f46",
        "functionPId": "0"
      },
      {
        "functionUrl": null,
        "functionPage": "",
        "functionName": "资料管理",
        "functionId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f4",
        "functionPId": "0"
      },
      {
        "functionUrl": "tmsDriver/getDrivers",
        "functionPage": "TheDriverInformation.html",
        "functionName": "司机资料",
        "functionId": "8c30b92c4-bfeb-416b-8a29-7cfbb1sd2133",
        "functionPId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f4"
      },
      {
        "functionUrl": "crmUserPc/getUsers",
        "functionPage": "CustomerData.html",
        "functionName": "客户资料",
        "functionId": "8c30b92c4-bfeb-416b-8a29-7cfbbb141w2",
        "functionPId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f4"
      },
      {
        "functionUrl": null,
        "functionPage": null,
        "functionName": "运营管理",
        "functionId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f0",
        "functionPId": "0"
      },
      {
        "functionUrl": " sysOpLog/getOpLogs",
        "functionPage": "OperationManagement.html",
        "functionName": "操作管理",
        "functionId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f12",
        "functionPId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f9"
      },
      {
        "functionUrl": null,
        "functionPage": null,
        "functionName": "订单管理",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f45",
        "functionPId": "0"
      },
      {
        "functionUrl": "tmsOrder/getOrdersList",
        "functionPage": "order.html",
        "functionName": "订单记录",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb14111",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f45"
      },
      {
        "functionUrl": "orderSon/getOrderAccountForHX",
        "functionPage": "statements.html",
        "functionName": "应收对账单分页条件查询",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbbsd4579",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f47"
      },
      {
        "functionUrl": "tmsAttemper/getAttemperList",
        "functionPage": "scheduling.html",
        "functionName": "调度记录",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb1123e3",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f46"
      },
      {
        "functionUrl": "OrderAndAccountController/getExceptions",
        "functionPage": "ExceptionManagement.html",
        "functionName": "异常管理",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb123446",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f46"
      },
      {
        "functionUrl": "tmsVehicle/getYunLis",
        "functionPage": "capacity.html",
        "functionName": "运力信息",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb147f47",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f46"
      },
      {
        "functionUrl": "invoiceManager/getInvoices",
        "functionPage": "InvoiceManagement.html",
        "functionName": "发票管理",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb14s54a4",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f47"
      },
      {
        "functionUrl": "tmsOrderReturn/getOrderReturns",
        "functionPage": "receipt.html",
        "functionName": "回单管理",
        "functionId": "c30b92c4-bfeb-416b-8a29-7sssaaas-322",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f45"
      },
      {
        "functionUrl": "attemperSon/getAttemperHXs",
        "functionPage": "statements2.html",
        "functionName": "应付对账单条件查询",
        "functionId": "c30b92c4-bfeb-4132-8a29-7cfbbb145f47",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f47"
      },
      {
        "functionUrl": null,
        "functionPage": null,
        "functionName": "财务管理",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f47",
        "functionPId": "0"
      },
      {
        "functionUrl": "sysRole/getSysListRole",
        "functionPage": "RightsManagement.html",
        "functionName": "权限管理",
        "functionId": "c30b92c4-4feb-416b-8a29-7cfbbb15f11",
        "functionPId": "8c30b92c4-bfeb-416b-8a29-7cfbbb145f9"
      },
      {
        "functionUrl": "TmsPushHistory/getOnWays",
        "functionPage": "transit.html",
        "functionName": "在途管理",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfwww1121",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f46"
      },
      {
        "functionUrl": "tmsAccount/getAttemperFrt",
        "functionPage": "financial.html",
        "functionName": "调度费用审核",
        "functionId": "c30b92c4-bfeb-416b-8a29-7cfbbb123235",
        "functionPId": "c30b92c4-bfeb-416b-8a29-7cfbbb145f47"
      }
    ]
	
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

demo.filter("menuFilter1", function () {
       return function (input) {
           var output = [];
           angular.forEach(input, function (value, key) {
               if (value.functionPId == 0) {
                   output.push(value);
               }
           });
           return output;
       }
   });

demo.filter("menuFilter2", function () {
       return function (arr,pid) {
       	console.log(arr);
       	console.log(pid);
           var output = [];
           for(var i = 0; i < arr.length; i++) {	          
	            if (pid == arr[i].functionId) {
	               output.push(arr[i]);	               
	            }	          
           }
           return output;
       }
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