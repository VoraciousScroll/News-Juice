// var cookies = require('angular-cookies');

angular.module('smartNews', [
  'ui.router',
  'smartNews.main',
  'smartNews.profile',
  'ngCookies',
  'smartNews.services',
  'ngSanitize'
])

.config(function($urlRouterProvider, $stateProvider){

  $stateProvider
    .state('main', {
      url: '/',
      views: {
        "content": {
          templateUrl: 'features/main/main.html',
          controller: 'MainCtrl',
          authenticate: false
        }
      }
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'features/profile/profile.html',
      controller: 'ProfileCtrl',
      authenticate: false
    });

  $urlRouterProvider.otherwise('/');

})

.directive('navbar', function(){
  return {
    templateUrl: 'features/nav/nav.html',
    controller: 'NavCtrl'
  };
});
