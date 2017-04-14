'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.logout = function(){
        $http.post('/login/login/login-out')
            .then(function(response) {
                /* if(response.errcode==0){
                    window.location.href='/views/system/login.html';
                 }*/
                window.location.href='/views/system/login.html';
            });
    }
}]);
