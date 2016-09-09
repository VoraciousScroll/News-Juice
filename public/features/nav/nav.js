angular.module('smartNews')

.controller('NavCtrl', function($scope, $http, $cookies, $location) {

  $scope.isAuth = function(){
    var auth = $cookies.get('authenticate');
    if (auth && auth !== 'undefined') {
      var parsedAuth = JSON.parse(auth.slice(2)).user;
      $scope.user = {
        firstname: parsedAuth.firstname,
        lastname: parsedAuth.lastname,
        picture: parsedAuth.picture
      };
      return true;
    }
    $scope.user = {};
    return false;
  };

  $scope.goToProfile = function(){

  }

  $scope.logout = function() {
    $cookies.remove('authenticate');
    $location.url('/');
  };

  // in case we decide to use a button and ng-click to log in
  // $scope.clickLogin = function() {
  //   $http({
  //     method: 'GET',
  //     url: '/auth/facebook'
  //   })
  //   .then(
  //     function(data){
  //       console.log('routing to /auth/facebook', data);
  //     },
  //     function(err){
  //       console.log('error routing to /auth/facebook', err);
  //     }
  //   );
  // };

  // isAuth should be a function that returns a boolean based on whether user is authenticated or not
  // $scope.isAuth = false;

});