'use strict';

angular.module('myApp.sidebar', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Sport/:id', {
    templateUrl: 'sport/sport.html',
    controller: 'SportCtrl'
  });
}])

.controller('SidebarCtrl', ['$scope', 'Sports', function($scope, Sports) {
 
	Sports.query(function(sports) {
		$scope.sports = sports;
		});
}])

.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
};
	
}])

.controller('SportCtrl', ['$scope', '$resource', '$routeParams', 
	function($scope, $resource, $routeParams) {

	$scope.id = $routeParams.id;
}]);