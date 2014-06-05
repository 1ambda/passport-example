var module = angular.module('PassportApp.controllers', []);

module.controller('homeCtrl', ['$scope',
			       '$window',
			       'UserService',
			       'AuthService',
			       homeCtrl]);

module.controller('welcomeCtrl', ['$scope',
			       '$window',
			       'UserService',
			       'AuthService',
			       welcomeCtrl]);


function homeCtrl ($scope,
		   $window,
		   UserService,
		   AuthService) {
  'use strict';

  $scope.user = {};
  $scope.user.id = '';
  $scope.user.email = '';
  $scope.user.password = '';
  
  $scope.login = function() {
    AuthService.login($scope.user).then(function() {
      $window.location.href ='/'; 
    });
  };

  $scope.register = function() {
    UserService.create($scope.user).$promise.then(function(res) {
      alert('Registerd');
      
    }, function(res) {
     alert(res.data); 
    });
  };

}


function welcomeCtrl ($scope,
		   $window,
		   UserService,
		   AuthService) {

  'use strict';

  $scope.user = {};
  $scope.user.me = '';

  UserService.getMe(function(result) {
    $scope.user.id = result.id;
  });
  
  $scope.logout = function() {
    AuthService.logout().then(function() {
      $window.location.href ='/';
    });
  };
}
