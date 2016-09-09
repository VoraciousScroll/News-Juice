angular.module('smartNews.home')

.controller('TopTrendsCtrl', function($scope, $http, TopTrendsFactory) {
  $scope.topTrends = TopTrendsFactory.topTrends;
});