'use strict';

angular.module('myApp.event', ['ui.map'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Event/:id', {
    templateUrl: 'event/eventPage.html',
    controller: 'EventPageCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/NewEvent', {
    templateUrl: 'event/eventForm.html',
    controller: 'EventAddCtrl'
  });
}])

.controller('EventPageCtrl', ['$scope', 'Events', '$routeParams', 'RSVP', 'UserEvent', function($scope, Events, $routeParams, RSVP, UserEvent) {

			$scope.model = {};
            $scope.past = false;
			var map;

			Events.get({id : $routeParams.id}, function(event) {

                if (Date.now() > event.eventdate)
                    $scope.past = true;

				event.eventdate = (new Date(event.eventdate).toLocaleString('hr-HR')).split(' ')[0];

				$scope.event = event;
					

					    $scope.mapOptions = {
							center: new google.maps.LatLng(event.location.geolocationlat, 
							event.location.geolocationlng),
							zoom: 11,
						mapTypeId: google.maps.MapTypeId.ROADMAP
						};
									var marker = new google.maps.Marker({
								position: new google.maps.LatLng(event.location.geolocationlat, 
							event.location.geolocationlng),
								title: event.location.geolocationname
							});
						$scope.loaded = true;	
						marker.setMap($scope.model.myMap);
					});

			RSVP.query(function(rsvp) {
				$scope.rsvp = rsvp;
				$scope.selectedRSVP = 'Najavi dolazak';
			});

			$scope.userAttend = function(rsvp) {
				$scope.selectedRSVP = rsvp.rsvpname;
				UserEvent.attend({userid : $scope.loggedUser.userid, eventid : $scope.event.eventid}, {rsvpid: rsvp.rsvpid});
			};

			$scope.addComment = function(commentText){
				var commentData = {
					commentText : commentText,
					userid : $scope.loggedUser.userid,
					};
				EventComments.add({id : $scope.event.geolocationid}, commentData);
				Events.get({id : $routeParams.id}, function(event) {
					$scope.event.comments = event.comments;
				});
			};

}])

.controller('EventCtrl', ['$scope', 'Events', 'Sports', '$location', function($scope, Events, Sports, $location) {
	var allEvents;
	Events.query(function(events) {

		events.forEach(function(event) {
			event.eventdate = (new Date(event.eventdate).toLocaleString('hr-HR')).split(' ')[0];
		});
		$scope.events = events;
		allEvents = events;
	});

	Sports.query(function(sports) {
		$scope.sports = sports;
	});

	$scope.openEventForm = function() {
		$location.path('/NewEvent');
	};

	$scope.sportTitle = "Sport";

	$scope.sportFilter = function(selectedSport) {
			if (selectedSport == null) {
				$scope.sportTitle = "Sport";
				$scope.events = allEvents;
				return;
			}
			var events = [];
			var i;
			for (i = 0; i < allEvents.length; ++i) {
					if (allEvents[i].sportid === selectedSport.sportid) {
						events.push(allEvents[i]);
					}
			}
			$scope.events = events;
			$scope.sportTitle = selectedSport.sportname;

		};
}])

.controller('EventAddCtrl', ['$scope', 'Sports', '$location', 'Locations', 'AddEvent', function($scope, Sports, $location, Locations, AddEvent) {

		Sports.query(function(sports) {
		$scope.sports = sports;
		$scope.selectedSport = sports[0];
		$scope.sportTitle =sports[0].sportname;
			});

		Locations.query(function(locations) {
			$scope.locations = locations;
			$scope.locationTitle = locations[0].locationname;
			$scope.geolocationTitle = locations[0].geolocations[0].geolocationname;
			$scope.selectedGeolocation = locations[0].geolocations[0];
			$scope.geolocations = locations[0].geolocations;
		});

		$scope.now = Date.now();

		$scope.locationFilter = function(location) {
			$scope.locationTitle = location.locationname;
			$scope.geolocationTitle = location.geolocations[0].geolocationname;
			$scope.selectedGeolocation = location.geolocations[0];
			$scope.geolocations = location.geolocations;
		};

		$scope.geolocationFilter = function(geolocation) {
			$scope.geolocationTitle = geolocation.geolocationname;
			$scope.selectedGeolocation = geolocation;
		};

		$scope.addEvent = function(eventData) {
			eventData.locationid = $scope.selectedGeolocation.geolocationid;
			eventData.sportid = $scope.selectedSport.sportid;
			if (!eventData.eventdate)
				eventData.eventdate = Date.now();
			else
				eventData.eventdate = eventData.eventdate.getTime();
			AddEvent.add(eventData);
		};;

		$scope.sportFilter = function(selectedSport) {
			$scope.sportTitle = selectedSport.sportname;
			$scope.selectedSport = selectedSport;
		};
}]);