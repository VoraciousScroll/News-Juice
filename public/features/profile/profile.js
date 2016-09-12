angular.module('smartNews.profile', ['smartNews.services'])

.controller('ProfileCtrl', ['$scope', 'isAuth', 'getSavedSearches', function($scope, isAuth, getSavedSearches){

  $scope.profile = 'Hi this is the profile page.';

  $scope.user = isAuth();

  getSavedSearches(function(resp){
    $scope.searchHistory = resp;
  });

}]);