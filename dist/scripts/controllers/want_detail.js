dont.controller("WantDetailCtrl", function($scope, ThingsSvc) {
  return $scope.tags = ThingsSvc.fetch();
});

/*
//@ sourceMappingURL=want_detail.js.map
*/