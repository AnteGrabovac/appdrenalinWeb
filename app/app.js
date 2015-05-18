'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngMessages',
  'dropbox',
  'flow',
  'myApp.home',
  'ui.map',
  'myApp.user',
  'myApp.auth',
  'myApp.location',
  'myApp.services',
  'myApp.sidebar',
  'myApp.event',
  'ui.bootstrap'
]).



config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/Home'});
}]);
