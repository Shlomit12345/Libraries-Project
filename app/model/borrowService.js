app.factory('borrowService', function ($log, $http, $q) {
    
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
        // $http.get("app/data/borrow.json").then(function (response) {
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

    return {
        borrows: borrows,
        load: load,
        isBorrowed: isBorrowed,
        getBorrowObj: getBorrowObj
    }
}) 