app.controller('navbarCtrl', function($scope, activeUserService, $location) {
    
    $scope.logout = function() {
        activeUserService.logout();
        $location.path('/');
    }


})