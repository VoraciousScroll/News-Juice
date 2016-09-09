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


/*
[{"topic":"Joe Manganiello","articleTitle":"<b>Joe Manganiello</b> to play Deathstroke in upcoming Batman film","traffic":"100,000+","img":"http://t3.gstatic.com/images?q=tbn:ANd9GcQHbI-qNraFUlRhClUqgJBkXak4TJGhB6nyYuvsHwyAtPZ4urIxgmSgWFJBTdupTDYdW_uBAQBG","articleLink":"http://money.cnn.com/2016/09/08/media/joe-manganiello-deathstroke/","articleSource":"CNNMoney"}]


*/

// Joe Manganiello
  var getPrimaryArticle = function(topic) {


    // var input = $stateParams.input;

    // var publishStart = '2016-03-19T22:53:43.757Z';
    var publishStart = 'NOW-2DAYS';
    // var publishEnd = '2016-03-26T22:53:43.757Z';
    var publishEnd = 'NOW';

    // var url = '/seearticle?input=' + input + '&start=' + publishStart + '&end=' + publishEnd;




    var url = '/seearticle?input=' + topic + '&start=' + publishStart + '&end=' + publishEnd;
    return $http({
      method: 'GET',
      url: url
    })
    .then(function(article) {
      console.log(article, 'PRIMARY ARTICLE');
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
          
          primaryArticle.push(formattedTopic(topic));
          console.log(primaryArticle[0].articleTitle, 'INPUT')
          getPrimaryArticle(primaryArticle[0].articleTitle)
            .then(function (article) {
              console.log(article, 'JULIE');
            });
          // var title = $sanitize(primaryArticle[0].articleTitle);
          // var source = $sanitize(primaryArticle[0].articleSource);
          // var article1 = getArticle(title, source);
          // console.log(primaryArticle[0].topic, 'JULIE');
        }
        topTrends.push(formattedTopic(topic));
      });
    });
  };

  var setPrimaryArticle = function (article) {
    primaryArticle[0] = article;
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
