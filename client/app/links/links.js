angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  angular.extend($scope,Links);
  $scope.data.unshift('empty1')
  $scope.data.unshift('empty2');
  $scope.getLinks()
  .then(function (data){
    $scope.data = $scope.data.concat(data);
  })
  .catch(function(er) {console.error(er);});

});
