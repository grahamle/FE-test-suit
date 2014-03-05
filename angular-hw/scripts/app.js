'use strict';

var app = angular.module('hw', ['hw.directives','hw.services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      resolve: {
      	homeworks: function(MultiHwLoader) {
          return MultiHwLoader();
      	}
      },
      controller: 'ListCtrl',
      templateUrl: '/views/list.html'
    }).when('/edit/:hwId', {
      resolve: {
      	homework: function(HwLoader) {
      	  return HwLoader();
      	}
      },
      controller: 'EditCtrl',
      templateUrl: '/views/hwForm.html'
    }).when('/view/:hwId', {
      resolve: {
      	homework: function(HwLoader) {
      	  return HwLoader();
      	}
      },
      controller: 'ViewCtrl',
      templateUrl: '/views/viewHw.html'
    }).when('/new', {
      controller: 'NewCtrl',
      templateUrl: '/views/hwForm.html'
    }).otherwise({
      redirectTo: '/'
    });
}]);
