var service = angular.module('PassportApp.services', ['ngResource']);

service.factory('UserService', function($resource) {
  'use strict';

  return $resource('/user', {}, {
    get: { method: 'GET' },
    getAll : { method: 'GET', isArray: true },
    create: { method: 'POST' },
    delete: { method: 'DELETE' },
    update: { method: 'PUT' }
  });
});

service.factory('LoginService', function($resource) {
  'use strict';

  return $resource('/login', {}, {
    login: { method: 'POST' }
  });
});

service.factory('LogoutService', function($resource) {
  'use strict';
  
  return $resource('/logout', {}, {
    logout: {
      method : 'GET'
    }
  });
});
