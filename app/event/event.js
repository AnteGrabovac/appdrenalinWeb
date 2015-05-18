'use strict';

angular.module('myApp.event', ['ui.map'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Event/:id', {
    templateUrl: 'event/eventPage.html',
    controller: 'EventPageCtrl'
  });
}])

.controller('EventPageCtrl', ['$scope', 'Events', '$routeParams', 'RSVP', 'UserEvent', function($scope, Events, $routeParams, RSVP, UserEvent) {

			$scope.model = {};
            $scope.past = false;
			var map;

			Events.get({id : $routeParams.id}, function(event) {

                if (Date.now() > event.eventdate)
                    $scope.past = true;

				event.eventdate = new Date(event.eventdate).toLocaleString('hr-HR');

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

.controller('EventCtrl', ['$scope', 'Events', 'Sports', function($scope, Events, Sports) {
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

		}
}]);