angular.module('smartNews.home', [])

// Sub-Views
.directive('homechart', function(){
  return {
    templateUrl: 'features/home/chart.html',
    controller: 'HomeChartCtrl'
  };
})
.directive('homenews', function(){
  return {
    templateUrl: 'features/home/news.html',
    controller: 'HomeNewsCtrl'
  };
})
.directive('hometrends', function(){
  return {
    templateUrl: 'features/home/trends.html',
    controller: 'HomeTrendsCtrl'
  };
})

// Home Controller
.controller('HomeCtrl', function($scope) {
  $scope.test = 'Home View';

})
