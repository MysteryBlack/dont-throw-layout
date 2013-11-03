dont.controller("LoginCtrl", function($scope, $location) {
  $scope.items = [];
  $scope.limit = 0;
  return $scope.href = function() {
    return location.href = '#/choose';
  };
});

/*
//@ sourceMappingURL=login.js.map
*/