var module = angular.module('PassportApp.controllers', []);

module.controller('mainCtrl', ['$scope',
			       '$location',
			       '$window',
			       'UserService',
			       'LoginService',
			       'LogoutService',
			       mainCtrl]);

function mainCtrl ($scope,
		   $location,
		   $window,
		   UserService,
		   LoginService,
		   LogoutService) {
  'use strict';

  $scope.user = {};
  $scope.user.id = '';
  $scope.user.email = '';
  $scope.user.password = '';

  $scope.login = function() {
    LoginService.login($scope.user).$promise.then(function() {
      $window.location.href ='/'; 
    }, function(response, header) {
      console.log(response);
    });
  };

  $scope.register = function() {
    UserService.create($scope.user).$promise.then(function(res) {
      alert('Registerd');
      
    }, function(res) {
     alert(res.data); 
    });
  };

  $scope.logout = function() {
    LogoutService.logout().$promise.then(function() {
      $window.location.href ='/';
    });
  };
}
