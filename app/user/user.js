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

 .config(['DropboxProvider', function (DropboxProvider) {
    DropboxProvider.config('xs1oj3asat10fkt', 'http://localhost:8000/bower_components/ngDropbox/callback.html');
 }])

.controller('ProfileCtrl', ['$scope', 'Users', '$routeParams', 'Sports', 'Countries', '$modal', 'Dropbox', 'UserProfilePicture', 'Profile', 'UserPrivacy', 'UsersProfile',
	function($scope, Users, $routeParams, Sports, Countries, $modal, Dropbox, UserProfilePicture, Profile, UserPrivacy, UsersProfile) {
		$scope.model = {};
		var map;
		var i;
		var UsersGetter;
		$scope.countryTitle = "Država";
		$scope.townTitle = "Grad";
		$scope.towns;
		$scope.townDrop = false;

		if ($scope.loggedUser && $scope.loggedUser.userid == $routeParams.id)
			UsersGetter = UsersProfile;
		else
			UsersGetter = Users;

		UsersGetter.get({
			id: $routeParams.id
		}, function(user) {

			if (!user.userid) {
				$scope.privacy = true;
			}
			else {
				$scope.privacy = false;
				user.events.forEach(function(event) {
					event.eventdate = new Date(event.eventdate).toLocaleString('hr-HR').split(' ')[0];
				});
				$scope.user = user;

				if (user.userprivacy === true)
					$scope.radioModel = 'Private';
				else 
					$scope.radioModel = 'Public';

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
		}

		});

		$scope.openEditForm = function() {
			Sports.query(function(sports) {
				$scope.sports = sports;
				var listToDelete = _.pluck($scope.user.sports, 'sportid');
				$scope.sports = $scope.sports.filter(function(sport) {
					return listToDelete.indexOf(sport.sportid) === -1;
				});
				$scope.sportTitle = "Dodaj novi sport";
			});
			Countries.query(function(countries) {
				$scope.countries = countries;
			});
			$scope.edit = true;
		};

		$scope.$watch('loggedUser', function() {

			if ($scope.loggedUser === null) {
				$scope.edit = false;
			}
		});

		$scope.editProfile = function() {
			Profile.edit({id: $scope.user.userid}, $scope.user);
			$scope.edit = false;
		};

		$scope.saveImage = function(flow) {
			if (flow) {
				var reader = new FileReader();
				reader.onloadend = function() {
					$scope.img = reader.result;
					var imgData = _base64ToArrayBuffer($scope.img);
					Dropbox.setCredentials({access_token: 'MmJTF8LROsAAAAAAAAAAL6iWYjOemlM6v_-TaAnV96a6KqBSE2WEjcO_uca54B0I'});
					var imgUrl = '/img/' + $scope.user.userid + '/profilePicture.png';
					Dropbox.writeFile(imgUrl, imgData).then(function() {
						Dropbox.makeUrl(imgUrl, {short_url: false}).then(function(res) {
							var url = res.url.substring(0, res.url.length - 1) + '1';
							$scope.user.picturelocation = url;
							UserProfilePicture.change({id : $scope.user.userid}, {url: url});
						});
					});

				};
				var file = flow.files[0].file;
				reader.readAsDataURL(file);
			}
		};

		function _base64ToArrayBuffer(base64) {
    		base64 = base64.split('data:image/png;base64,').join('');
    		var binary_string =  window.atob(base64),
        		len = binary_string.length,
        		bytes = new Uint8Array( len ),
        		i;

    		for (i = 0; i < len; i++)        {
        		bytes[i] = binary_string.charCodeAt(i);
    		}
    		return bytes.buffer;
		};

		$scope.changeUserPrivacy = function() {
			if ($scope.radioModel === 'Public')
				UserPrivacy.change({id: $scope.user.userid}, {privacy:'false'});
			else if ($scope.radioModel === 'Private')
				UserPrivacy.change({id: $scope.user.userid}, {privacy:'true'});
		};

		$scope.addSport = function(sport) {
			$scope.user.sports.push(sport);
			$scope.sports = $scope.sports.filter(function(newSport) {
				return newSport.sportid !== sport.sportid;
			});
		};

		$scope.removeSport = function(sport) {
			$scope.user.sports = $scope.user.sports.filter(function(newSport) {
				return newSport.sportid !== sport.sportid;
			});
			$scope.sports.push(sport);
		};

		$scope.countryFilter = function(selectedCountry) {
			$scope.countryTitle = selectedCountry.countryname;
			$scope.towns = selectedCountry.towns;
			$scope.selectedCountry = selectedCountry;
			$scope.townDrop = true;
		};

		$scope.townFilter = function(selectedTown) {
			$scope.townTitle = selectedTown.townname;
			$scope.selectedTown = selectedTown;
		};

		$scope.changeUserTown = function() {
			$scope.user.usertown = $scope.selectedTown.townid;
			$scope.user.townname = $scope.selectedTown.townname;
			$scope.user.countryname = $scope.selectedCountry.countryname;
		};

	}
])

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
				for (j = allUsers[i].sports.length - 1; j > -1; j--) {
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



	}
]);