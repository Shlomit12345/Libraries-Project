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

    if (activeUserService.getUser().role === "ספרנית") {
        $scope.isLibrarian = true;
    } else {
        $scope.isLibrarian = false;
	}

});