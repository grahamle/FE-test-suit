'use strict';

var services = angular.module('hw.services', ['ngResource']);

services.factory('Hw', ['$resource', function($resource) {
  return $resource('/hws/:id', {id: '@id'});
}]);

services.factory('MultiHwLoader', ['Hw', '$q', function(Hw, $q) {
  return function() {
  	var delay = $q.defer();
  	Hw.query(
  	  function(hws) {
  	  	delay.resolve(hws);
  	  },
  	  function() {
  	  	delay.reject('取不到数据');
  	  }
  	);
  	return delay.promise;
  };
}]);

services.factory('HwLoader', ['Hw', '$route', '$q', function(Hw, $route, $q) {
  return function() {
  	var delay = $q.defer();
  	Hw.get({id: $route.current.params.hwId},
  	  function(hw) {
  	  	delay.resolve(hw);
  	  },
  	  function() {
  	  	delay.reject('取不到啦');
  	  }
  	);
  	return delay.promise;
  };
}]);
