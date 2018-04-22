app.controller("bookDetailsCtrl", function ($scope, $routeParams, bookService, borrowService, readerService, activeUserService,  $location) {
    
        // This is an authotization check. If the user is not logged going back to the home screen
        if (!activeUserService.isLoggedIn()) {
            $location.path("/");
            return;
        }
    
        var indexToDisplay = parseInt($routeParams.index);
    
        var currentUser = activeUserService.getUser();
        bookService.load(currentUser).then(function () {
            $scope.book = bookService.books[indexToDisplay];
            borrowService.isBorrowed($scope.book.id).then(function(response){
                $scope.book.locked = response;    
            })



            if (currentUser.role === "ספרנית") {
                $scope.isLibrarian = true;
            
            } else {
                $scope.isLibrarian = false;
        
            }

            borrowService.getBorrowObj($scope.book.id).then(function(response){
                $scope.borrowObj = response; 
                readerService.getReaderObj($scope.borrowObj.id).then(function(response){
                    $scope.readerObj = response; 
                    
                })
            })
            


        



        })
    
    }) 