app.factory("activeUserService", function($http, $log) {
        function User(plainUser) {
            this.id = plainUser.id;
            this.fname = plainUser.fname;
            this.lname = plainUser.lname;
            this.email = plainUser.email;
            this.password = plainUser.password;
            this.phone = plainUser.phone;
            this.address = plainUser.address;
            this.borrowId = plainUser.borrowId;
        }
    
        var activeUser = null;
        
        // Loading all the users from JSON
        var users = [];
        $http.get('app/data/users.json').then(
        function (response) {
            //alert(response.data[0].id);
            for (var i = 0; i < response.data.length; i++) {
                users.push(new User(response.data[i]));
            }
        }, function (response) {
            $log.error("error in getting user json: " + JSON.stringify(response));
        });


        return {
            User: User
        }
    }) 



    