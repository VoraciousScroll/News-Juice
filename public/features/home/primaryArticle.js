angular.module('smartNews.home')

.controller('PrimaryArticleCtrl', function($scope, TopTrendsFactory) {
  $scope.news = TopTrendsFactory.primaryArticle;
});