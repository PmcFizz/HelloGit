/**
 * 加载列表页需要的基础控件 依赖 app对象
 * customPage：分页指令 需要$scope.page 标准对象支持
 * customGridSelect：页面列表单选多选指令
 * listHttp：列表页发送http服务（已废弃）
 */
(function(app){
    /*指令*/
    app.directive('customGridSelect',function(){
            return {
                restrice: 'A',
                controller: function($scope){
                    var selectedAll = false;
                    $scope.select_ids = [];
                    $scope.selected_item = function(id){
                        var n = $scope.select_ids.indexOf(id);
                        if(n != -1){
                            $scope.select_ids.splice(n, 1);
                            return false;
                        }else{
                            $scope.select_ids.push(id);
                            return true;
                        }
                    };

                    $scope.selected_delAll = function(){
                        if(!$scope.datas) return;
                        $scope.select_ids = [];
                        if (selectedAll) {
                            selectedAll = false;
                        } else {
                            selectedAll = true;
                        }
                        for (var i = 0; i < $scope.datas.length; i++) {
                            $scope.datas[i].select_stats = selectedAll;
                            if (selectedAll == true) {
                                $scope.select_ids.push($scope.datas[i].id);
                            }
                        }
                    }
                }
            }
        });

    /*已废弃，定义服务*/
    app.service('listHttp',['$http',function($http){
        this.post = function($scope,obj,successFun,errFun){
            var page  = {
                'page':{
                    "current_page":$scope.page.current_page,
                    "page_size":$scope.page.page_size
                }
            };

            var search = { 'search':$scope.search};
            $http.post(
                $scope.app.http.DATA_URL+obj.url,
                extend(extend(page,search),obj)
            ).success(function (data) {

                $scope.list = data.data.list;
                $scope.page = data.data.page;
                successFun(data);
            }).error(function(data){
                errFun(data);
            });
        };

        var extend =  function (jsonbject1, jsonbject2) {
            var resultJsonObject={};
            for(var attr in jsonbject1){
                resultJsonObject[attr]=jsonbject1[attr];
            }
            for(var attr in jsonbject2){
                resultJsonObject[attr]=jsonbject2[attr];
            }
            return resultJsonObject;
        };
    }]);

    /*全局变量*/
    app.constant('pagerConfig', {
        text: {
            'first': '首页',
            'provie': '上一页',
            'next': '下一页',
            'last': '尾页'
        }
    });
})(app);