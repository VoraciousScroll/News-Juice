angular.module('smartNews.profile', ['smartNews.services'])

.controller('ProfileCtrl', ['$scope', 'isAuth', function($scope, isAuth){

  $scope.profile = 'Hi this is the profile page.';

  $scope.user = isAuth();

}]);