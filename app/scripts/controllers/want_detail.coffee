dont.controller "WantDetailCtrl", ($scope, ThingsSvc) ->
  $scope.tags = ThingsSvc.fetch()