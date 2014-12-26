'use strict';
angular.module('myApp.user', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/User/:id', {
    templateUrl: 'user/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/User', {
    templateUrl: 'user/user.html',
    controller: 'UserCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$routeParams',
					function($scope, Geolocations, $routeParams) {
							
}])

.controller('UserCtrl', ['$scope', 'Users', 'Sports',
					function($scope, Users, Sports) {
		var allUsers;
		Users.query(function(users) {
			$scope.users = users;
			allUsers = users;
		});	
		Sports.query(function(sports) {
			$scope.sports = sports;
		});
		$scope.sportTitle = "Sport";
		$scope.sportFilter = function(selectedSport) {
			if (selectedSport == null) {
				$scope.sportTitle = "Sport";
				$scope.users = allUsers;
				return;
			}
			var users = [];
			var i, j;
			for (i = 0; i < allUsers.length; ++i) {
				for (j = allUsers[i].sports.length -1; j > -1; j--) {
					if (allUsers[i].sports[j].sportid === selectedSport.sportid) {
						users.push(allUsers[i]);
					}
				}
			}
			$scope.users = users;
			$scope.sportTitle = selectedSport.sportname;
		}
}]);