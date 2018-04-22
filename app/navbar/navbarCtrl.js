app.controller('navbarCtrl', function($scope, activeUserService, $location) {
    
    $scope.logout = function() {
        activeUserService.logout();
        $location.path('/');
    }

    var currentUser = activeUserService.getUser();

    if (currentUser.role === "ספרנית") {
        $scope.isLibrarian = true;
        $scope.isReader = false;
    } else {
        $scope.isLibrarian = false;
        $scope.isReader = true;
    }

    $scope.fullName = currentUser.fname + " " + currentUser.lname;
    


})


