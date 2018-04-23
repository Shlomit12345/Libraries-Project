app.controller('loginCtrl', function($scope, activeUserService, $log, $location) {
        
    $scope.invalidCredentails = false;

    $scope.login = function() {
        activeUserService.load($scope.idNum, $scope.pwd).then(function() {
            var successLogin = activeUserService.login($scope.idNum, $scope.pwd);
            if (successLogin) {
                $location.path("/books");
            } else {
                $scope.invalidCredentails = true;
            }
        })
    }
});

