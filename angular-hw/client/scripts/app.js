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
      controller: ['$scope', 'homeworks', function($scope, homeworks) {
  		$scope.homeworks = homeworks;
	  }],
      templateUrl: '/views/list.html'
    }).when('/edit/:hwId', {
      resolve: {
      	homework: function(HwLoader) {
      	  return HwLoader();
      	}
      },
      controller: ['$scope', '$location', 'homework', function($scope, $location, homework) {
      	$scope.homework = homework;
      	$scope.save = function() {
      	  $scope.homework.$save(function(homework) {
      	  	$location.path('/view/' + homework.id);
      	  });
      	};
      	$scope.remove = function() {
      	  delete $scope.homework;
      	  $location.path('/');
      	};
      }],
      templateUrl: '/views/hwForm.html'
    }).when('/view/:hwId', {
      resolve: {
      	homework: function(HwLoader) {
      	  return HwLoader();
      	}
      },
      controller: ['$scope', '$location', 'homework', function($scope, $location, homework) {
  		$scope.homework = homework;
  		$scope.edit = function() {
  		  $location.path('/edit/' + homework.id);
    	};
  	  }],
      templateUrl: '/views/viewHw.html'
    }).when('/new', {
      controller: ['$scope', '$location', 'Hw', function($scope, $location, Hw) {
      	$scope.homework = new Hw({
      	  items: [] // TODO
      	});
      	$scope.save = function() {
      	  $scope.homework.$save(function(homework) {
      	  	$location.path('/view/' + homework.id);
      	  });
      	};
      }],
      templateUrl: '/views/hwForm.html'
    }).otherwise({
      redirectTo: '/'
    });
}]);
