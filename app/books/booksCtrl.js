app.controller('booksCtrl', function($scope, activeUserService, $location) {
    
    if (!activeUserService.isLoggedIn()) {
                $location.path("/");
                return;
    }
    
    }) 