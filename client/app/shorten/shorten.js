angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = { url : ''};
  angular.extend($scope, Links);

  $scope.addLink = function() {
    $scope.sendLink($scope.link.url);
    $scope.link.url = '';
  };
});
