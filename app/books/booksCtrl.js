app.controller('booksCtrl', function($scope, activeUserService, $location, bookService) {
    
    if (!activeUserService.isLoggedIn()) {
                $location.path("/");
                return;
    }


    bookService.load(activeUserService.getUser()).then(function() {
                $scope.books = bookService.books;
                
            });


  // Open book details
  $scope.openBook = function (book) {
     
    $location.path('/books/' + $scope.books.indexOf(book));
    
}

    
}) 