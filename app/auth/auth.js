'use strict';
angular.module('myApp.auth', [])


.service('Session', function () {
  this.create = function (newUser) {
    this.user = newUser;
  };
  this.destroy = function () {
    this.user = null;
  };
  return this;
})

.controller('LoginCtrl', ['$scope', 'Login', 'Session', '$modal', '$rootScope',
					function($scope, Login, Session, $modal, $rootScope) {
		$scope.loginData = {
			email: '',
			password: ''
		};
		$rootScope.showForm=true;
		$rootScope.loggedUser = Session.user;
		$scope.openLoginForm = function() {
			$scope.modal = $modal.open({
				templateUrl: 'auth/loginForm.html',
				scope: $scope
			})
		};

		$scope.alerts = [];
		$scope.login = function(loginData) {
			Login.login(loginData, function(response) {
				if ($scope.alerts.length > 0)
					$scope.closeAlert();
				if (response.userid != null){
					response.userfullname = response.username + " " + response.usersurname;
					Session.create(response);
					$scope.alerts.push({type: 'success', msg: response.userfullname + ", dobrodošao u appdrenalin!"});
					$rootScope.loggedUser = Session.user;
					$rootScope.showForm=false;
				}
				else {
					$scope.alerts.push({type: 'danger', msg: "Pogrešno koriničko ime i/ili lozinka!"});
				}			
			});
		}
		$scope.logout = function() {
			Session.destroy();
			$rootScope.loggedUser = Session.user;
		}	
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
			if (!$rootScope.showForm)
				$scope.modal.dismiss();
		};
}]);