
var app = angular.module('librariesApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
          templateUrl : "app/home/home.html"
        })
        .when("/login", {
          templateUrl : "app/login/login.html"
        })
    });

// TODO: Delete this later
app.controller("testCtrl", function($scope) {
  $scope.bla = "kuku";
})
 