
var app = angular.module('librariesApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
          templateUrl : "app/home/home.html"
        })
    });