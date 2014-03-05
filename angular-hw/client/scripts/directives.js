'use strict';

var directives = angular.module('hw.directives', []);

directives.directive('loadbar', ['$rootScope', function($rootScope) {
  return {
  	link: function(scope, iElem, iAttrs) {
  	  iElem.addClass('hide');
  	  $rootScope.$on('$routeChangeStart', function() {
  	  	iElem.removeClass('hide');
  	  });
  	  $rootScope.$on('$routeChangeSuccess', function() {
  	  	iElem.addClass('hide');
  	  });
  	}
  };
}]);

directives.directive('focus', function() {
  return {
    link: function(scope, iElem, iAttrs) {
      iElem[0].focus();
    }
  };
});
