dont.controller("WantListCtrl", function($scope, ThingsSvc) {
  $scope.tags = ThingsSvc.fetch();
  return $scope.select = function(item) {
    return item.selected = !item.selected;
  };
});

/*
//@ sourceMappingURL=want_list.js.map
*/