'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'Users', function($scope, Users) {
	
		Users.query(function(data) {
		$scope.myVar  = data[1].sports[0].sportname;
		});
		
}]);