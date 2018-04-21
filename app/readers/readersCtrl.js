app.controller('readersCtrl', function($scope, activeUserService, $location, readerService) {
    
    if (!activeUserService.isLoggedIn()) {
                $location.path("/");
                return;
    }
    
    readerService.load(activeUserService.getUser()).then(function() {
        $scope.readers = readerService.readers;
        
    });


    }) 




    
    

    
    
       
    

    
        
   