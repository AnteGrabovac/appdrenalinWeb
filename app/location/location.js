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
 
.controller('GeolocationCtrl', ['$scope', 'Geolocations', '$timeout', '$routeParams',
					function($scope, Geolocations, $timeout, $routeParams) {
			$scope.model = {};
			var map;
			Geolocations.get({id : $routeParams.id}, function(geolocation) {
				$scope.geolocation = geolocation;
							
					    $scope.mapOptions = {
							center: new google.maps.LatLng(geolocation.geolocationlat, 
							geolocation.geolocationlng),
							zoom: 13,
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
				
			
}])

.controller('LocationCtrl', ['$scope', 'Locations', 
					function($scope, Locations) {
  
	Locations.query(function(locations) {
		$scope.groups = [];
		var subgroups = [];
		var i;
		for(i=0;i<locations.length;++i) {
			$scope.groups.push(
			{
			title: locations[i].locationname,
			image: locations[i].picturelocation,
			content: locations[i].geolocations,
			sports: locations[i].sports
			});
		}});
}]);