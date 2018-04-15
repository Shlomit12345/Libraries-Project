
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
app.controller("testCtrl", function($scope, activeUserService) {
  var user = new activeUserService.User( {
    "id": "112233",
    "fname": "מיקי",
    "lnama": "מאוס",
    "email": "mickey@mouse.com",
    "password": "abcsef",
    "phone": "03-45624752",
    "address": "רחוב וולפסון 42, ראשון לציון",
    "borrowId": "2"
  })
  $scope.bla = "kuku";

})
 
