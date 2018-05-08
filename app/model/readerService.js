app.factory('readerService', function ($log, $http, $q, $location) {
    
    var readers = [];
    var wasEverLoaded = false;

    // reader Constructor
    function Reader(plainReader) {
        this.id = plainReader.id;
        this.fname = plainReader.fname;
        this.lname = plainReader.lname;
        this.email = plainReader.email;
        this.password = plainReader.password;
        this.phone = plainReader.phone;
        this.address = plainReader.address;
        this.borrowId = plainReader.borrowId;
        this.role = plainReader.role;
    }


    function load(user) {
        var async = $q.defer();
        
        // Checking if the readers were ever loaded
        if (wasEverLoaded) {
            // Immediatly resolving the promise since readers are already available
            async.resolve();
        } else {
            // Loading the data from JSON
            $http.get("app/data/users.json").then(function (response) {
                // on success  
                readers.splice(0, readers.length);
                $log.debug("BOOKAPP: " + JSON.stringify(response));
                for (var i = 0; i < response.data.length; i++) {
                    readers.push(new Reader(response.data[i]));
                }
                wasEverLoaded = true;
                async.resolve();
            }, function (response) {
                // on failure
                $log.error("BOOKAPP: error in getting users json - " + JSON.stringify(response));
                async.reject();
            });
        }
        return async.promise;
    }

    function getReaderObj (id) {
        var async = $q.defer();
        load().then(function (response) {
            // on success  
            flag = 0;    
            $log.debug("BOOKAPP: " + JSON.stringify(response));
            for (var i = 0; i < readers.length && flag === 0; i++) {
                if (id === readers[i].borrowId) {
                    readerObj = readers[i];
                    flag = 1;
                }          
            }
            async.resolve(readerObj);
        }, function (response) {
            // on failure
            $log.error("BOOKAPP: error in getting borrows json - " + JSON.stringify(response));
            async.reject();
        });
        return async.promise;
    }

    function readerReturnBook (userId) {
        for (var i = 0; i < readers.length; i++) {
            if (readers[i].id === userId) {
                readers[i].borrowId = null;
                $location.path("/books");
            }
        }
    }

    function readerBorrowBook (userId, borrowId) {
        flag = 0;
        for (var i = 0; i < readers.length && flag === 0; i++) {
            if (readers[i].id === userId) {
                readers[i].borrowId = borrowId;
                flag = 1;
            }
        }  
        $location.path("/books");
    }

    return {
        readers: readers,
        load: load,
        getReaderObj: getReaderObj,
        readerReturnBook: readerReturnBook,
        readerBorrowBook: readerBorrowBook
    }

}) 