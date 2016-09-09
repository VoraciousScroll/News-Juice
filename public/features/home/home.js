angular.module('smartNews.home', [])

.factory('TopTrendsFactory', function($http, $sanitize) {
  var topTrends = [];
  var primaryArticle = [];

  var formattedTopic = function (topic) {
    return {
      topic: topic.title[0],
      articleTitle: topic['ht:news_item'][0]['ht:news_item_title'][0],
      traffic: topic['ht:approx_traffic'][0],
      img: 'http://' + topic['ht:picture'][0].slice(2),
      articleLink: topic['ht:news_item'][0]['ht:news_item_url'][0], 
      articleSource: topic['ht:news_item'][0]['ht:news_item_source'][0]
    };
  };

  var getPrimaryArticle = function(topic) {
    var publishStart = 'NOW-2DAYS';
    var publishEnd = 'NOW';

    var url = '/seearticle?input=' + topic + '&start=' + publishStart + '&end=' + publishEnd + '&limit=1';
    return $http({
      method: 'GET',
      url: url
    })
    .then(function(article) {
      return article;
    });
  };

  var topTrendsGoogleTrends = function () {
    return $http({
      method: 'GET',
      url: '/api/news/topTrendsDetail'
    })
    .then(function(response) {
      response.data.forEach(function(topic, index) {
        if (index === 0) {      
          var title = sanitizeTitle(formattedTopic(topic).articleTitle);
          getPrimaryArticle(title)
            .then(function (article) {
              var article = article.data.stories[0];
              primaryArticle.push(article);
            });
        }
        topTrends.push(formattedTopic(topic));
      });
    });
  };

  var setPrimaryArticle = function (article) {
    primaryArticle[0] = article;
  };

  var sanitizeTitle = function(title) {
    return title.replace('<b>', '')
      .replace('</b>', '')
      .replace('&#39;', '');
  };

  topTrendsGoogleTrends();

  return {
    topTrends: topTrends,
    primaryArticle: primaryArticle,
    setPrimaryArticle: setPrimaryArticle
  };
})

// Sub-Views
.directive('homechart', function(){
  return {
    templateUrl: 'features/home/chart.html',
    controller: 'HomeChartCtrl'
  };
})
.directive('primaryarticle', function(){
  return {
    templateUrl: 'features/home/primaryArticle.html',
    controller: 'PrimaryArticleCtrl'
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

});
