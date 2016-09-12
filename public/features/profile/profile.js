angular.module('smartNews.profile', ['smartNews.services'])

.controller('ProfileCtrl', ['$scope', 'isAuth', 'getSavedSearches', function($scope, isAuth, getSavedSearches){

  $scope.profile = 'Hi this is the profile page.';

  $scope.user = isAuth();

  getSavedSearches(function(resp){
    console.log(resp);
    resp.sort(function(a, b){
      return a.savedDate - b.savedDate;
    });
    $scope.searchHistory = resp;
  });

  $scope.unsave = function(article){
    console.log(article)
  };

}]);