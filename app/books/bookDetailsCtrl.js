
app.controller("bookDetailsCtrl", function ($scope, $routeParams, bookService, borrowService, readerService, activeUserService, $location) {

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

    $scope.returnBook = function(bookName, bookAuthor, userId, bookBorrowId) {
        bookService.bookReturnBook(bookName, bookAuthor);
        borrowService.borrowReturnBook(bookBorrowId);
        readerService.readerReturnBook(userId);
        $scope.book.borrowed = false;
        $scope.book.notBorrowed = true;
    }

    $scope.borrowABook = function(bookName, bookAuthor, bookId, userId) {
        $scope.missingUserId = false;
        $scope.UserHasAlreadyBorrowedABook = false;
        if (userId == null || userId == "") {
            $scope.missingUserId = true;
        } else {
            readerService.IsReaderIdValid(userId).then(function(response){
                if (response) {
                    var alreadyHasBorroedBook = borrowService.isUserHasBorrowedBook(userId);
                    if (alreadyHasBorroedBook) {
                        $scope.UserHasAlreadyBorrowedABook = true;
                    } else {
                        borrowIndex = borrowService.borrowBorrowBook(bookId, userId);
                        bookService.bookBorrowBook(bookId, borrowIndex);
                        readerService.readerBorrowBook(userId, borrowIndex);
                        $scope.book.borrowed = true;
                        $scope.book.notBorrowed = false;
                    }
                } else {
                    $scope.missingUserId = true;
                }
            }, function (response) {
                $scope.missingUserId = true;
            })
        }
    }
});