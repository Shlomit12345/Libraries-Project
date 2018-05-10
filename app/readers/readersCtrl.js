app.controller('readersCtrl', function($scope, activeUserService, $location, readerService, borrowService, bookService) {

	if (!activeUserService.isLoggedIn()) {
		$location.path("/");
		return;
	}

	readerService.load(activeUserService.getUser()).then(function() {
		$scope.readers = readerService.readers;
	});

	$scope.selectReader = function(readerId, borrowId) {
		if ($scope.selectedReaderId === readerId) {
			$scope.selectedReaderId = null;
		} else {
			$scope.selectedReaderId = readerId;
		}
		
		$scope.borrowObj = null;
		$scope.bookObj = null;
		if (borrowId != null) {
			$scope.selectedReaderBorrowId = borrowId;
			borrowService.getBorrowObj(borrowId).then(function(response){
				$scope.borrowObj = response;
				bookService.getBookObj(borrowId).then(function(response){
					$scope.bookObj = response;
				})
			})
		} else {
			$scope.selectedReaderBorrowId = null;
		}
	};
		
});

