app.factory("activeUserService", function() {
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
    
        return {
            User: User
        }
    }) 



    