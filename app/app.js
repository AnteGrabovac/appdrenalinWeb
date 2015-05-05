'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.home',
  'ui.map',
  'myApp.user',
  'myApp.auth',
  'myApp.location',
  'myApp.services',
  'myApp.sidebar',
  'ui.bootstrap'
]).



config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/Home'});
}]);
