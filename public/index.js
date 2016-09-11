// var cookies = require('angular-cookies');

angular.module('smartNews', [
  'ui.router',
  'smartNews.profile',
  'smartNews.home',
  'smartNews.results',
  'ngCookies',
  'smartNews.services',
  'ngSanitize',
  'ui.bootstrap'
])

.config(function($urlRouterProvider, $stateProvider, $httpProvider) {

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'features/main/main.html',
      authenticate: false
    })
    .state('main.home', {
      url: '/home',
      templateUrl: 'features/home/home.html',
      controller: 'HomeCtrl',
      authenticate: false
    })

    .state('main.results', {
      url: '/results/:input',
      templateUrl: 'features/results/results.html',
      controller: 'ResultsCtrl',
      authenticate: false
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'features/profile/profile.html',
      controller: 'ProfileCtrl',
      authenticate: false
    });

  $urlRouterProvider.otherwise('/main/home');
  $httpProvider.interceptors.push('requestCookie');
})
.factory('requestCookie', function ($document, $cookies) {
  // console.log('this factory');
  return {
    request: function (request) {
      // var parsedCookie = $cookies.get('authenticate');
      // console.log(parsedCookie, 'This is my document');
      // // config.headers['x-session-token'] = SessionService.token
      // // request.session.passport = parsedCookie;
      request.xsrfCookieName = 'authenticate';
      // console.log(request, 'My request object');
      return request;
    }
  }
})

.directive('navbar', function(){
  return {
    templateUrl: 'features/nav/nav.html',
    controller: 'NavCtrl'
  };
})

.controller('SearchCtrl', function($scope, $state, $http, renderGraph){
  $scope.searchinput = '';

  $scope.getDropdown = function(val){
    return $http({
      method: 'GET',
      url: '/input/' + val
    })
    .then(function(response){
      var dropdown = [];
      var pages = response.data.query.pages;
      for (var i in pages){
        dropdown.push({
          title: pages[i].title,
          image: pages[i].thumbnail ? pages[i].thumbnail.source : ""
        });
      }
      return dropdown;
    });
  };

  $scope.renderView = function() {
    var url = '/results/' + $scope.searchinput;
    if ($scope.searchinput) {
      $http({
        method: 'GET',
        url: url
      })
      .then(
        function(obj){
          // console.log('obj:', obj);
          $state.go('main.results', {input: $scope.searchinput, articleReceived: false})
          .then(function(){
            renderGraph(obj);
          });
        },
        function(error){
          console.log('there was an error!!', error);
        }
      );
    } else {
      $state.go('main.home');
    }
  };

});