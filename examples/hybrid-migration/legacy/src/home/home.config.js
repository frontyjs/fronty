'use strict';

/* @ngInject */
function homeConfig($urlRouterProvider, $locationProvider, $stateProvider) {
  $urlRouterProvider.rule(function($i, $location) {
    var path = $location.path();
    var normalized = path.toLowerCase();
    if (path != normalized) return normalized;
  });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(false);

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeCtrl as home',
    template: require('./home.html').default
  });

  console.log('homeConfig loaded');
}

module.exports = homeConfig;
