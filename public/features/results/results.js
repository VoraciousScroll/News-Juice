angular.module('smartNews.results', [])

.controller('ResultsCtrl', function($scope, $stateParams) {
  $scope.test = 'This is the Results View';

  $scope.searchinput = $stateParams.input;

});