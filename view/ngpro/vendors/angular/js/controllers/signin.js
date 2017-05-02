'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
        $scope.authError = null;
        $http({
            method: 'post',
            url: './site/login',
            data: {username: $scope.user.email, password: $scope.user.password}
        }).success(function (response) {
            if (response == '1') {
                //$state.reload('app.tp1');
               // $state.reload('app.tp1');
                window.location.href='./';
            } else {
                $scope.authError = '账号或密码错误！';
            }
        });
    };
    $scope.logout = function(){
        $http.post('/site/logout')
            .then(function(response) {
                if(response.data  == 1){
                    $state.go('login');
                }else{

                }
            });
    }
}]);
