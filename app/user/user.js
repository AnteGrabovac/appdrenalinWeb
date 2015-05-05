'use strict';
angular.module('myApp.user', ['ui.map'])

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

.controller('ProfileCtrl', ['$scope', 'Users', '$routeParams', 
					function($scope, Users, $routeParams) {
			$scope.model = {};
			var map;
			var i;
		Users.get({id : $routeParams.id}, function(user) {
			$scope.user = user;
			
			$scope.mapOptions = {
				center: new google.maps.LatLng(44.9667, 
				16.7),
				zoom: 6,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var marker = [];
			for (i = 0; i < $scope.user.locations.length; i++) {
				marker[i] = new google.maps.Marker({
					position: new google.maps.LatLng($scope.user.locations[i].geolocationlat, 
					$scope.user.locations[i].geolocationlng),
					title: $scope.user.locations[i].geolocationname
					});
				marker[i].setMap($scope.model.myMap);
			}
				
			$scope.loaded = true;	
			
		});					
}])

.controller('UserCtrl', ['$scope', 'Users', 'Sports', 'Countries',
					function($scope, Users, Sports, Countries) {
		var allUsers;
		var countryFiltered;
		var sportFiltered;
		var townFiltered;
		Users.query(function(users) {
			$scope.users = users;
			allUsers = users;
			countryFiltered = users;
			sportFiltered = users;
			townFiltered = users;
		});	
		Sports.query(function(sports) {
			$scope.sports = sports;
		});
		Countries.query(function(countries) {
			$scope.countries = countries;
		});
		$scope.sportTitle = "Sport";
		$scope.countryTitle = "Država";
		$scope.townTitle = "Grad";
		$scope.towns;
		$scope.townDrop = false;

		$scope.sportFilter = function(selectedSport) {
			if (selectedSport == null) {
				$scope.sportTitle = "Sport";
				sportFiltered = allUsers;
				$scope.mainFilter();
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
			sportFiltered = users;
			$scope.sportTitle = selectedSport.sportname;
			$scope.mainFilter();
		}
		$scope.countryFilter = function(selectedCountry) {
			if (selectedCountry == null) {
				$scope.countryTitle = "Država";
				$scope.townTitle = "Grad";
				townFiltered = allUsers;
				$scope.townDrop = false;
				$scope.mainFilter();
				return;
			}
			var users = [];
			var i, j;
			for (i = 0; i < allUsers.length; ++i) {
				if (allUsers[i].countryname === selectedCountry.countryname) {
					users.push(allUsers[i]);
				}
			}
			countryFiltered = users;
			townFiltered = countryFiltered;
			$scope.countryTitle = selectedCountry.countryname;
			$scope.towns = selectedCountry.towns;
			$scope.townDrop = true;
			$scope.mainFilter();
		}
		
			$scope.townFilter = function(selectedTown) {
			if (selectedTown == null) {
				$scope.townTitle = "Grad";
				townFiltered = countryFiltered;
				$scope.mainFilter();
				return;
			}
			var users = [];
			var i, j;
			for (i = 0; i < countryFiltered.length; ++i) {
				if (countryFiltered[i].townname === selectedTown.townname) {
					users.push(countryFiltered[i]);
				}
			}
			townFiltered = users;
			$scope.townTitle = selectedTown.townname;
			$scope.mainFilter();
		}
				
		$scope.mainFilter = function() {
			var i;
			var users = [];
			for (i = 0; i < sportFiltered.length; i++) {
				if (townFiltered.indexOf(sportFiltered[i]) > -1) {
					users.push(sportFiltered[i]);
				}
			}
			$scope.users = users;		
		}
			
			
		
}]);