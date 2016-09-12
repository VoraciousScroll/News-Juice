angular.module('smartNews.profile', ['smartNews.services'])

.controller('ProfileCtrl', ['$scope', 'isAuth', 'getSavedSearches', 'unsaveArticle', function($scope, isAuth, getSavedSearches, unsaveArticle){

  $scope.profile = 'Hi this is the profile page.';

  $scope.user = isAuth();

  var getHistory = function(){
    getSavedSearches(function(resp){
      console.log(resp);
      resp.sort(function(a, b){
        return a.savedDate - b.savedDate;
      });
      $scope.searchHistory = resp;
    });
  };

  getHistory();

  $scope.unsave = function(article){
    unsaveArticle(article, function(){
      getHistory();
    });
  };

}]);