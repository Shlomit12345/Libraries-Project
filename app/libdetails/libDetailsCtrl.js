
app.controller("libDetailsCtrl", function ($scope, activeUserService, $location) {

    // This is an authotization check. If the user is not logged going back to the home screen
    if (!activeUserService.isLoggedIn()) {
        $location.path("/");
        return;
    }
});