dont.controller "WantListCtrl", ($scope, ThingsSvc) ->
  $scope.tags = ThingsSvc.fetch()
  $scope.select = (item) ->
    item.selected = !item.selected