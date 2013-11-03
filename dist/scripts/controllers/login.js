dont.controller("LoginCtrl", function($scope, $location) {
  $scope.items = [];
  $scope.limit = 0;
  return $scope.href = function() {
    console.log('23');
    return $location.path("/choose");
  };
});

/*
//@ sourceMappingURL=login.js.map
*/