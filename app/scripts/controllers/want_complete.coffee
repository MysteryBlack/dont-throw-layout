dont.controller "WantCompleteCtrl", ($scope, ThingsSvc) ->
  $scope.tags = ThingsSvc.fetch()