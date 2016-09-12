angular.module('smartNews.home')

.controller('PrimaryArticleCtrl', function($scope, TopTrendsFactory, saveArticle, isAuth) {

  $scope.news = TopTrendsFactory.primaryArticle;

  $scope.isAuth = function(){
    $scope.user = isAuth();
    return !!isAuth();
  };

  $scope.clickSave = function(){
    var now = new Date();
    var article = {
      title: $scope.news[0].title,
      author: $scope.news[0].author.name,
      publishDate: $scope.news[0].publishedAt,
      savedDate: now,
      articleLink: $scope.news[0].links.permalink,
      articleSource: $scope.news[0].source.name,
      img: $scope.news[0].media[0].url,
      body: $scope.news[0].body
    };
    saveArticle(article);
  };

});