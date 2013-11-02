dont.controller("GivePushCtrl", function($scope) {
  $scope.thingSize = 100;
  return $scope.drawThing = function(e) {
    console.log(e);
    return $scope.thingSize = $('#give_push .thine').width();
  };
});

/*
//@ sourceMappingURL=give_push.js.map
*/