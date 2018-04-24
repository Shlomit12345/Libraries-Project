
var app = angular.module('librariesApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
          templateUrl : "app/home/home.html"
        })
        .when("/login", {
          templateUrl : "app/login/login.html",
          controller: 'loginCtrl'
        })
        .when("/books", {
          templateUrl : "app/books/books.html",
          controller: 'booksCtrl'
        })
        .when("/books/:index", {
          templateUrl : "app/books/bookDetails.html",
          controller: 'bookDetailsCtrl'
        })
        .when("/readers", {
          templateUrl : "app/readers/readers.html",
          controller: 'readersCtrl'
        })
        .when("/libdetails", {
          templateUrl : "app/libdetails/libDetails.html",
          controller: 'libDetailsCtrl'
        })
        .otherwise({
          redirectTo: "/"
        })
    });

app.controller("testCtrl", function($scope, activeUserService) {
  // var user = new activeUserService.User( {
  //   "id": "112233",
  //   "fname": "מיקי",
  //   "lnama": "מאוס",
  //   "email": "mickey@mouse.com",
  //   "password": "abcsef",
  //   "phone": "03-45624752",
  //   "address": "רחוב וולפסון 42, ראשון לציון",
  //   "borrowId": "2"
  // })
})
 
