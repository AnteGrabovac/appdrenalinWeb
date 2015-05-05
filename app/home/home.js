'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'Locations', function($scope, Locations) {
	
		Locations.query(function(locations) {
			$scope.locations = locations.slice(0, 5);
		});
		
}]);