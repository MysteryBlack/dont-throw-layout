dont.controller("WantCompleteCtrl", function($scope, ThingsSvc) {
  return $scope.tags = ThingsSvc.fetch();
});

/*
//@ sourceMappingURL=want_complete.js.map
*/