app.controller('booksCtrl', function($scope, activeUserService, $location, bookService) {
    
    if (!activeUserService.isLoggedIn()) {
                $location.path("/");
                return;
    }


    bookService.load(activeUserService.getUser()).then(function() {
                $scope.books = bookService.books;
            });

    
}) 