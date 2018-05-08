app.factory('borrowService', function ($log, $http, $q, $location) {
    
    var borrows = [];
    var wasEverLoaded = false;

    // reader Constructor
    function Borrow(plainBorrow) {
        this.id = plainBorrow.id;
        this.bookId = plainBorrow.bookId;
        this.readerId = plainBorrow.readerId;
        this.borrowDate = plainBorrow.borrowDate;
        this.reminderdateSent = plainBorrow.reminderdateSent;
    }

    function load() {
        var async = $q.defer();
        // Checking if the borrows were ever loaded
        if (wasEverLoaded) {
            // Immediatly resolving the promise since borrows are already available
            async.resolve();
        } else {
            // Loading the data from JSON
            $http.get("app/data/borrow.json").then(function (response) {
                // on success  
                borrows.splice(0, borrows.length);
                $log.debug("BOOKAPP: " + JSON.stringify(response));
                for (var i = 0; i < response.data.length; i++) {
                    borrows.push(new Borrow(response.data[i]));
                }
                wasEverLoaded = true;
                async.resolve();
            }, function (response) {
                // on failure
                $log.error("BOOKAPP: error in getting borrows json - " + JSON.stringify(response));
                async.reject();
            });
        }

        return async.promise;
    }

    function isBorrowed (id) {
        var async = $q.defer();
        var result = false;
        load().then(function (response) {
            // on success
            $log.debug("BOOKAPP: " + JSON.stringify(response));
            for (var i = 0; i < borrows.length && !result; i++) {        
                if (id === borrows[i].bookId) {
                    result = true;
                }          
            }
            async.resolve(result);
        }, function (response) {
            // on failure
            $log.error("BOOKAPP: error in getting borrows json - " + JSON.stringify(response));
            async.reject();
        });
        return async.promise;
    }

    function getBorrowObj (id) {
        var async = $q.defer();
        var result = false;
        // $http.get("app/data/borrow.json").then(function (response) {
        load().then(function (response) {
            // on success  
            $log.debug("BOOKAPP: " + JSON.stringify(response));
            for (var i = 0; i < borrows.length; i++) {
                if (id === borrows[i].id) {
                    borrowObj = borrows[i];
                }          
            }
            async.resolve(borrowObj);
        }, function (response) {
            // on failure
            $log.error("BOOKAPP: error in getting borrows json - " + JSON.stringify(response));
            async.reject();
        });
        return async.promise;
    }

    function borrowReturnBook (borrowId) {
        for (var i = 0; i < borrows.length; i++) {
            if (borrows[i].id === borrowId) {
                borrows.splice(i, 1);
            }
        }
    }

    function borrowBorrowBook (bookId, userId) { 
        var borrowId = borrows.length + 1;
        var borrowD = new Date().getDate();
        var borrowM = new Date().getMonth();
        borrowM ++;
        var borrowY = new Date().getFullYear();
        var fullDate = borrowD+"/"+borrowM+"/"+borrowY;
        borrows.push({     
             "id": borrowId,
             "bookId": bookId,
             "readerId": userId,
             "borrowDate": fullDate,
             "reminderdateSent": null
        });
        return borrowId;
    }

    return {
        borrows: borrows,
        load: load,
        isBorrowed: isBorrowed,
        getBorrowObj: getBorrowObj,
        borrowReturnBook: borrowReturnBook,
        borrowBorrowBook: borrowBorrowBook
    }
}) 