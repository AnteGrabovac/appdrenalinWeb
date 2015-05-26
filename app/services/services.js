'use strict';

angular.module('myApp.services', [])

.service('Sports', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/sports/:id');
}])

.service('Events', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/events/:id');
}])

.service('Users', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id');
}])

.service('RSVP', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/rsvp/:id');
}])

.service('UsersProfile', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id/myProfile');
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

.service('AddEvent', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/events',
					null, {'add' : { method:'POST'}}
					);
}])

.service('Profile', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id',
					null, {'edit' : { method:'POST'}}
					);
}])

.service('UserLocation', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id/locations',
					null, {'add' : { method:'POST'}}
					);
}])

.service('UserGallery', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id/gallery',
					null, {'add' : { method:'POST'}}
					);
}])

.service('UserEvent', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:userid/events/:eventid',
					null, {'attend' : { method:'POST'}}
					);
}])

.service('UserPrivacy', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id/privacy',
					null, {'change' : { method:'POST'}}
					);
}])

.service('UserFavorites', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id/favorites',
					null, {'add' : { method:'POST'}}
					);
}])

.service('UserProfilePicture', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users/:id/profilePicture',
					null, {'change' : { method:'POST'}}
					);
}])

.service('Register', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/users',
					null, {'register' : { method:'POST'}}
					);
}])

.service('Login', ['$resource', function($resource) {
	return $resource('https://appdrenalin.herokuapp.com/api/login',
					null, {'login' : { method:'POST'}}
					);
}]);