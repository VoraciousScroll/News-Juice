angular.module('smartNews')

.controller('NavCtrl', function($scope, $http, $cookies) {
  $scope.nav = 'This is the nav bar';
  $scope.hi = 'working?';
  $scope.logout = function() {
    console.log('BEFORE!!::', $cookies.get('authenticate'));
    $cookies.remove('authenticate');
    console.log('AFTER::', $cookies.get('authenticate'));
    // $http({
    //   url: '/',
    //   method: 'GET',
    // })
    // .then(
    //   function(data){
    //     // console.log('routing to /auth/facebook', data);
    //   },
    //   function(err){
    //     // console.log('error routing to /auth/facebook', err);
    //   }
    // );
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