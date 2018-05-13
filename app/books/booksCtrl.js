app.controller('booksCtrl', function($scope, activeUserService, $location, bookService) {

	if (!activeUserService.isLoggedIn()) {
		$location.path("/");
		return;
	}

	bookService.load().then(function() {
		$scope.books = bookService.books;
	});

	// Open book details
	$scope.openBook = function(book) {
		$location.path('/books/' + $scope.books.indexOf(book));
	}

	$scope.saveBook = function() {
		if ($scope.bookname == null || $scope.bookname == "" || $scope.bookauthor == null || $scope.bookauthor == "" || $scope.publish == null || $scope.publish == "") {
			$scope.missingBookName = true;
		} else {
			bookService.saveBook($scope.bookname, $scope.bookauthor, $scope.coverimg, $scope.publish);
			$scope.bookname = null;
			$scope.bookauthor = null;
			$scope.coverimg = null;
			$scope.publish = null;
			$scope.missingBookName = false;
			$("#myModal").modal("hide");
		}
	}

	$scope.closeError = function() {
	   $scope.missingBookName = false;
	}

    if (activeUserService.getUser().role === "ספרנית") {
        $scope.isLibrarian = true;
    } else {
        $scope.isLibrarian = false;
	}

});