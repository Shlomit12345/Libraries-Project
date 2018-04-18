app.controller('loginCtrl', function($scope, activeUserService, $log, $location) {
        

    //$scope.test = "aaablabla"

    $scope.invalidCredentails = false;

    $scope.login = function() {
        // TODO: Here you should disable the login button until there is a response from the service
        activeUserService.load($scope.idNum, $scope.pwd).then(function() {
            var successLogin = activeUserService.login($scope.idNum, $scope.pwd);
            //alert("successLogin==="+successLogin);
            if (successLogin) {
                $location.path("/books");
            } else {
                // TODO: Missing hadleing of next try
                $scope.invalidCredentails = true;
            }
        })
    }
});



