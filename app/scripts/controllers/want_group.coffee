dont.controller "WantGroupCtrl", ($scope) ->
  $scope.groupActive = 'group-a'
  $scope.selectGroup = (group) ->
    $scope.groupActive = group