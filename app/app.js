
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