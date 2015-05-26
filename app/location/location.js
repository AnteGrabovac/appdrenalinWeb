'use strict';
angular.module('myApp.location', ['ui.map'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Location', {
    templateUrl: 'location/location.html',
    controller: 'LocationCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Location/:id', {
    templateUrl: 'location/geolocation.html',
    controller: 'GeolocationCtrl'
  });
}])
 
.controller('GeolocationCtrl', ['$scope', 'Geolocations', '$routeParams', 'GeolocationComments', 'UserLocation', 
					function($scope, Geolocations, $routeParams, GeolocationComments, UserLocation) {
			$scope.model = {};
			var map;

			Geolocations.get({id : $routeParams.id}, function(geolocation) {

				geolocation.events.forEach(function(event){
					event.eventdate = new Date(event.eventdate).toLocaleString('hr-HR');
				});
				var i;
				geolocation.galleryRight = [];
				geolocation.galleryLeft = [];
				geolocation.gallery.forEach(function(picture) {
					if (i % 2) {
						geolocation.galleryRight.push(picture);
					} else {
						geolocation.galleryLeft.push(picture);
					}
					i++;
				});
				$scope.geolocation = geolocation;
							
					    $scope.mapOptions = {
							center: new google.maps.LatLng(geolocation.geolocationlat, 
							geolocation.geolocationlng),
							zoom: 11,
						mapTypeId: google.maps.MapTypeId.ROADMAP
						};
									var marker = new google.maps.Marker({
								position: new google.maps.LatLng(geolocation.geolocationlat, 
							geolocation.geolocationlng),
								title: geolocation.geolocationname
							});
						$scope.loaded = true;	
						marker.setMap($scope.model.myMap);
					});

			$scope.addComment = function(commentText){
				var commentData = {
					commentText : commentText,
					userid : $scope.loggedUser.userid,
					};
				GeolocationComments.add({id : $scope.geolocation.geolocationid}, commentData);
				Geolocations.get({id : $routeParams.id}, function(geolocation) {
					$scope.geolocation.comments = geolocation.comments;
				});
			};

			$scope.addLocationToUser = function() {
				UserLocation.add({id : $scope.loggedUser.userid}, {locationid: $scope.geolocation.geolocationid});
			};
						
}])

.controller('LocationCtrl', ['$scope', 'Locations', 'Countries',
					function($scope, Locations, Countries) {
	var allLocations;
	Locations.query(function(locations) {
		var i;
		allLocations = locations;
		$scope.locations = locations;
		$scope.countryTitle = "Država";
		$scope.locations[0].isOpen = true;
		});
	Countries.query(function(countries) {
		$scope.countries = countries;
	});
		
			$scope.countryFilter = function(selectedCountry) {
			if (selectedCountry == null) {
				$scope.countryTitle = "Država";
				$scope.locations = allLocations;
				$scope.locations[0].isOpen = true;
				return;
			}
			var locations = [];
			var i, j;
			for (i = 0; i < allLocations.length; ++i) {
				if (allLocations[i].countryname === selectedCountry.countryname) {
					locations.push(allLocations[i]);
				}
			}

			$scope.locations = locations;
			if ($scope.locations[0] != null){
				$scope.locations[0].isOpen = true;}
			$scope.countryTitle = selectedCountry.countryname;
		}
		
}]);