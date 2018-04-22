app.controller("bookDetailsCtrl", function ($scope, $routeParams, bookService, borrowService, activeUserService,  $location) {
    
        // This is an authotization check. If the user is not logged going back to the home screen
        if (!activeUserService.isLoggedIn()) {
            $location.path("/");
            return;
        }
    
        var indexToDisplay = parseInt($routeParams.index);
    
        bookService.load(activeUserService.getUser()).then(function () {
            $scope.book = bookService.books[indexToDisplay];
            borrowService.isBorrowed($scope.book.id).then(function(response){
                $scope.book.locked = response;    
            })
        })
    
    }) 