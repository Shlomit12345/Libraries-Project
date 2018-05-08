app.factory('bookService', function ($log, $http, $q, borrowService) {
    
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
    
        function load() {
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

        function saveBook (bookname, bookauthor, coverimg, publish) { 
            var index = books.length;
            books.push({     
                "id": index,
                "coverImg": "app/images/lib_logo.jpg",
                "name": bookname,
                "author": bookauthor,
                "publishingHouse": publish,
                "borrowId": null
            });
        }

        function bookReturnBook (bookName, bookAuthor) { 
            for (var i = 0; i < books.length; i++) {
                if (books[i].name === bookName && books[i].author === bookAuthor) {
                    books[i].borrowId = null;
                }
            }
        }

        function bookBorrowBook (bookId, borrowId) {
            flag = 0;
            for (var i = 0; i < books.length && flag === 0; i++) {
                if (books[i].id === bookId) {
                    books[i].borrowId = borrowId;
                    flag = 1;
                }
            }
        }

        return {
            books: books,
            saveBook: saveBook,
            bookReturnBook: bookReturnBook,
            bookBorrowBook: bookBorrowBook,
            load: load
        }
    }) 