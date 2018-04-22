app.factory('bookService', function ($log, $http, $q, borrowService ) {
    
        var books = [];
        var wasEverLoaded = false;
    
        // book Constructor
        function Book(plainBook) {
            this.id = plainBook.id;
            this.coverImg = plainBook.coverImg;
            this.name = plainBook.name;
            this.author = plainBook.author;
            this.publishingHouse = plainBook.publishingHouse;
            this.borrowId = plainBook.borrowId;
        }
    

        function load(user) {
            var async = $q.defer();
            
    
            // Checking if the books were ever loaded
            if (wasEverLoaded) {
                // Immediatly resolving the promise since books is already available
                async.resolve();
            } else {
                // Loading the data from JSON
                $http.get("app/data/books.json").then(function (response) {
                    // on success  
                    books.splice(0, books.length);
                   
                    //alert("response.data.length="+response.data.length);
                    $log.debug("BOOKAPP: " + JSON.stringify(response));
                    for (var i = 0; i < response.data.length; i++) {
                        books.push(new Book(response.data[i]));
                    
                    }





                    wasEverLoaded = true;
                    async.resolve();
    
                }, function (response) {
                    
                    // on failure
                    $log.error("BOOKAPP: error in getting book json - " + JSON.stringify(response));
                    async.reject();
                });
            }
    
            return async.promise;
        }

 



        return {
            books: books,
            load: load
            
        }
    
    }) 