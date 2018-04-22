app.controller("bookDetailsCtrl", function ($scope, $routeParams, bookService, borrowService, readerService, activeUserService,  $location) {
    
        // This is an authotization check. If the user is not logged going back to the home screen
        if (!activeUserService.isLoggedIn()) {
            $location.path("/");
            return;
        }
    
        var indexToDisplay = parseInt($routeParams.index);
    
        var currentUser = activeUserService.getUser();

        bookService.load().then(function () {
            $scope.book = bookService.books[indexToDisplay];
            borrowService.isBorrowed($scope.book.id).then(function(response){
                if (response) {
                    $scope.book.borrowed = true; 
                    $scope.book.notBorrowed = false; 
                } else {
                    $scope.book.borrowed = false;
                    $scope.book.notBorrowed = true; 
                }   
            })



            if (currentUser.role === "ספרנית") {
                $scope.isLibrarian = true;
            
            } else {
                $scope.isLibrarian = false;
        
            }

            $scope.borrowObj = null;
            
            if ($scope.book.borrowId) {
                borrowService.getBorrowObj($scope.book.borrowId).then(function(response){
                    $scope.borrowObj = response; 
                    readerService.getReaderObj($scope.book.borrowId).then(function(response){
                        $scope.readerObj = response; 
                        
                    })
                })
            }


        



        })
    
    }) 