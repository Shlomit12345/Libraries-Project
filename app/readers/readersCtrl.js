app.controller('readersCtrl', function($scope, activeUserService, $location) {
    
    if (!activeUserService.isLoggedIn()) {
                $location.path("/");
                return;
    }
    
    }) 