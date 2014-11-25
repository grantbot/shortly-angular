angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  angular.extend($scope,Links);
  // $scope.data.links.unshift('empty1')
  // $scope.data.links.unshift('empty2');
  $scope.getLinks()
  .then(function (data){
    $scope.data.links = data;
  })
  .catch(function(er) {console.error(er);});

});
