angular.module('smartNews', [
  'ui.router',
  'smartNews.home'
])
.config(function($urlRouterProvider, $stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'features/home/home.html',
      controller: 'HomeCtrl',
      authenticate: false
    });

    // .state('history', {
    //   url: '/history',
    //   templateUrl: '/features/history/history.html',
    //   controller: 'HistoryCtrl',
    //   authenticate: true
    // })

  $urlRouterProvider.otherwise('/');

})

.controller('MainCtrl', function($scope){

});