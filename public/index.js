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

  $urlRouterProvider.otherwise('/');

})

.controller('SearchCtrl', function($scope, $state){
  $scope.searchinput = '';

  $scope.renderView = function() {
    if ($scope.searchinput) {
      $state.go('results');
    } else {
      $state.go('home');
    }
  };

});