angular.module('smartNews.results', [])

.controller('ResultsCtrl', function($scope, $stateParams, $http) {

  $scope.articleReceived = $stateParams.articleReceived;
  $scope.test = 'This is the Results View';

  $scope.getArticle = function(){

    var input = $stateParams.input;

    // var publishStart = '2016-03-19T22:53:43.757Z';
    var publishStart = 'NOW-2DAYS';
    // var publishEnd = '2016-03-26T22:53:43.757Z';
    var publishEnd = 'NOW';

    var url = '/seearticle?input=' + input + '&start=' + publishStart + '&end=' + publishEnd;

    $http({
      method: 'GET',
      url: url
    }).then(
      function(data){
        // console.log(data);
        $scope.articleReceived = true;
        $scope.article = data;
      },
      function(err){
        console.log('THERE WAS AN ERROR RECEIVING DATA FROM SEEARTICLE', err);
      }
    );
  };
});


