angular.module('smartNews.profile', ['smartNews.services'])

.controller('ProfileCtrl', ['$scope', 'isAuth', 'getSavedSearches', 'unsaveArticle', function($scope, isAuth, getSavedSearches, unsaveArticle){

  $scope.profile = 'Hi this is the profile page.';

  $scope.user = isAuth();

  var getHistory = function(){
    getSavedSearches(function(resp){
      resp.sort(function(a, b){
        return new Date(b.savedDate) - new Date(a.savedDate);
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