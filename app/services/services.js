'use strict';

angular.module('myApp.services', [])

.service('Sports', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/sports/:id');
}])

.service('Users', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id');
}])

.service('Geolocations', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/geolocations/:id');
}])

.service('Towns', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/towns');
}])

.service('Locations', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/locations/:id');
}]);