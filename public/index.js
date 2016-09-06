angular.module('smartNews', [
  'ui.router',
  'smartNews.home',
  'smartNews.results'
])
.config(function($urlRouterProvider, $stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'features/home/home.html',
      controller: 'HomeCtrl',
      authenticate: false
    })

    .state('results', {
      url: '/results',
      templateUrl: 'features/results/results.html',
      controller: 'ResultsCtrl',
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

.controller('SearchCtrl', function($scope){
  $scope.searchinput = '';

});