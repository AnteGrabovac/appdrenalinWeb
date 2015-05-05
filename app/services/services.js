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

.service('GeolocationComments', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/geolocations/:id/comments',
					null, {'add' : {method: 'POST'}}
					);
}])

.service('Towns', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/towns');
}])

.service('Countries', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/countries');
}])

.service('Locations', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/locations/:id');
}])

.service('Comments', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/comments',
					null, {'add' : { method:'POST'}}
					);
}])

.service('Login', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/login',
					null, {'login' : { method:'POST'}}
					);
}]);