dont.controller("WantGroupCtrl", function($scope) {
  $scope.groupActive = 'group-a';
  return $scope.selectGroup = function(group) {
    return $scope.groupActive = group;
  };
});

/*
//@ sourceMappingURL=want_group.js.map
*/