'use strict';

/**
 *@intro 全局控件
 *@autor yubingyang
 *@time 2017/1/13
 */
(function(app){
    //弹窗基础控件（已废弃，保留版本兼容）
    app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items',ModalInstanceCtrl]);
    //弹窗控件（已废弃，保留版本兼容）
    app.controller('ModalCtrl', ['$scope', '$modal', '$log', ModalCtrl]);
    //选项卡事件
    app.controller('TabCtrl', ['$scope', function($scope) {
        $scope.tabs = [true,false,false,false,false,false,false,false,false];
        $scope.tab = function(index,fun){
            angular.forEach($scope.tabs, function(i, v) {
                $scope.tabs[v] = false;
            });
            $scope.tabs[index] = true;
            if(arguments.length >1){
                fun(index);
            }
        }
    }]);
    //表格状态
    app.directive('cutomTableShow',function(){
        return {
            restrict:'EA',
            templateUrl:'/views/system/blocks/table-show.html',
            replace:true,//是否覆盖当前标签
            scope:true,//不继承父类的scope
            link: function (scope,elements,attrs) {
                scope.show={};
                scope.show.col = attrs.col;
                attrs.$observe('status',function(val){
                    scope.show.status = val;
                });
            }
        }
    });

    function ModalInstanceCtrl($scope, $modalInstance, items){
        //从主窗口带过来的参数rootItems 作为备份 $scope.rootItems 数据绑定
        var rootItems = $scope.rootItems = items;
        $scope.ok = function (ret) {
            var result = {};
            //判断有没有指定输入回调函数，有的话直接使用回调
            if(rootItems.hasOwnProperty('ret_fun')){
                var retFun = $scope[rootItems.ret_fun];
                result = retFun();
            }else{
                //如果存在返回值且返回值有被设置则设置返回值
                if(rootItems.ret && arguments.length>0){
                    jQuery.each(rootItems.ret,function(name,value) {
                        if(ret.hasOwnProperty(value)){
                            result[value] = ret[value];
                        }
                    });
                }
            }

            $modalInstance.close(result);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    function ModalCtrl($scope, $modal, $log){
            $scope.items = {};
            /**弹窗函数
             *@param url 模板url
             *@param data json对象 输入参数
             *@param ret  string|function 输入对象 如果是函数则是回调函数 如果是字符串则是 回调字段名字例如 param1,param2
             *@param size 弹窗大小 sm|lg
             */
            $scope.open = function (url,data,ret,size) {
                var len = arguments.length;
                /*判断是否有输入参数*/
                if(len > 1 && data != ''){
                    /*初始话参数*/
                    var $data = $scope.$eval('['+data+']');
                    jQuery.each($data[0],function(name,value) {
                        $scope['items'][name] = value;
                    });
                    //end
                }


                /*初始化回调参数*/
                var arr_ret = false;
                if(len>2 && ret != '' && typeof ret != "function"){
                    arr_ret = ret.split(",");
                }

                var modalInstance = $modal.open({
                    templateUrl: url,
                    size:len>3?size:'lg',
                    controller:'ModalInstanceCtrl',
                    resolve: {
                        items: function () {
                            return {
                                'items':$scope.items,//页面参数
                                'ret':arr_ret//回调参数
                            };
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    if(selectedItem){
                        if(typeof ret == "function"){
                            ret(selectedItem);
                        }else{
                            jQuery.each(selectedItem,function(name,value) {
                                $scope[name] = value;
                            });
                        }
                    }
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };
    };
})(app);