angular.module('smartNews.home', [])

.factory('TopTrendsFactory', function($http) {

  var topTrends = [];

  var topTrendsGoogleTrends = function () {
    return $http({
      method: 'GET',
      url: '/api/news/topTrendsDetail'
    })
    .then(function(response) {
      response.data.forEach(function(topic) {
        topTrends.push(topic);
      });
    });
  };

  topTrendsGoogleTrends();
  return topTrends;
})

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
.directive('toptrends', function(){
  return {
    templateUrl: 'features/home/trends.html',
    controller: 'TopTrendsCtrl'
  };
})

// Home Controller
.controller('HomeCtrl', function($scope) {
  $scope.test = 'Home View';

})
