app.controller('HeaderCtrl',['$rootScope','MenusService','$scope',function($rootScope,MenusService,$scope){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        changeMenus(toState.name);
    });

    /*监听路由的变化*/
    var changeMenus = function(name){
        var routeArr = name.split('.');
        if(routeArr.length >2){
            $scope.menusChoose =routeArr[0]+'.'+routeArr[1];
        }

        /*如果菜单已经下载下来了就做重新赋值(要求菜单最少两级)*/
        if($scope.app.menusList){
            var len  = $scope.app.menusList.length;
            var menuNameList = [];//路由列表
            for(var i=0;i<len;i++){
                menuNameList = $scope.app.menusList[i].menu_url.split('.');
                if($scope.menusChoose == menuNameList[0]+'.'+menuNameList[1]){
                    $scope.app.menus_root =  $scope.app.menusList[i];
                    break;
                }
            }
        }
    };
    changeMenus($rootScope.$state.current.name);

    MenusService.list({},{},function(res){
        $scope.app.menusList = res.data.list;
        $scope.app.menus_root = $scope.app.menusList[0];
    });

    /**
     * 路由截取
     */
    $scope.routeSplit = function(route){
        var routeArr = route.split('.');
        if(routeArr.length >2){
            return routeArr[0]+'.'+routeArr[1];
        }else{
            return route;
        }
    }
}]);