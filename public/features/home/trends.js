angular.module('smartNews.home')

.controller('TopTrendsCtrl', function($scope, TopTrendsFactory) {
  $scope.topTrends = TopTrendsFactory;
  $scope.test = '<b>Seahawks</b> planning pregame demonstration before regular-season opener'
  // var renderTopTrends = function () {
  //   TopTrendsFactory()
  //     .then(function(response) {
  //       console.log(Array.isArray(response));
  //       response.forEach(function(topic) {
  //         $topTrends.push(topic);
  //       });
  //     });
  // };

  // renderTopTrends();




});