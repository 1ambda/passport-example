var service = angular.module('PassportApp.services', ['ngResource']);

service.factory('UserService', function($resource) {
  'use strict';

  return $resource('/user', {}, {
    get: { method: 'GET' },
    getMe: { method: 'GET', url: '/user/profile/me', isArray: false },
    getAll : { method: 'GET', isArray: true },
    create: { method: 'POST' },
    delete: { method: 'DELETE' },
    update: { method: 'PUT' }
  });
});

service.factory('AuthService', function($resource) {
  'use strict';

  return {
    login: function(user) {
      return $resource('/login', {}).save(user).$promise;
    },

    logout: function() {
      return $resource('/logout', {}).get().$promise;
    }
  };

});
