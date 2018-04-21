app.factory("activeUserService", function($http, $log, $q) {
        function User(plainUser) {
            this.id = plainUser.id;
            this.fname = plainUser.fname;
            this.lname = plainUser.lname;
            this.email = plainUser.email;
            this.password = plainUser.password;
            this.phone = plainUser.phone;
            this.address = plainUser.address;
            this.borrowId = plainUser.borrowId;
            this.role = plainUser.role;
        }
    
        var activeUser = null;
        
        // Loading all the users from JSON
        var users = [];
        
        // $http.get('app/data/users.json').then(
        // function (response) {
        //     //alert(response.data[0].id);
        //     for (var i = 0; i < response.data.length; i++) {
        //         users.push(new User(response.data[i]));
        //     }
        // }, function (response) {
        //     $log.error("error in getting user json: " + JSON.stringify(response));
        // });




                function load() {
                    var async = $q.defer();
            
                    $http.get('app/data/users.json').then(
                        function (response) {
                            for (var i = 0; i < response.data.length; i++) {
                                users.push(new User(response.data[i]));
                            }
            
                            async.resolve();
                            // Testing
                            //alert(users[1].lname); 
                        }, function (response) {
                            $log.error("error in getting user json: " + JSON.stringify(response));
                            async.reject();
                    });
            
                    return async.promise;
                
                }
            
            
                // This function will update the active user property with the logged in user
                // Will return true in case of successfull login. otherwise return false
                function login(idNum, pwd) {
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].id == idNum && users[i].password == pwd) {
                            activeUser = users[i];
                            return true;
                        }
                    }
            
                    return false;
                }
                 
                function getUser() {
                    return activeUser;
                }

                function isLoggedIn() {
                    return activeUser ? true : false;
                }
            
                function logout() {
                    activeUser = null;
                }




        return {
            // User: User
            load: load,
            login: login,
            getUser: getUser,
            isLoggedIn: isLoggedIn,
            logout: logout
        }
    }) 



    