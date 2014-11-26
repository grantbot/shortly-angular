angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ui.router'

])
.config(function($stateProvider, $httpProvider) {
    $stateProvider
     .state('signin', {
        url : '/signin',
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController',
     })
     .state('signup', {
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController',
        url:'/signup'
     })
    .state('links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      url:'/links'
    })
    .state('shorten', {
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      url:'/shorten',
      authenticate: true
    })
    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //$$route.authenticate refers to the authentication requirement in above router
    if (toState && toState.authenticate && !Auth.isAuth()) {
      //Need to preventDefault to keep from going to unauthorized page before .go is called
      event.preventDefault();
      $state.go('signin');
    }
  });
});
