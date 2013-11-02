dont.controller("GivePushCtrl", function($scope) {
  $scope.tags = [];
  return $scope.addTag = function(e) {
    var offsetX, offsetY;
    offsetX = e.offsetX / $(e.target).width() * 100;
    offsetY = e.offsetY / $(e.target).height() * 100;
    console.log(offsetX);
    console.log(offsetY);
    $scope.tags.push({
      x: offsetX,
      y: offsetY
    });
    return console.log($scope.tags);
  };
});

/*
//@ sourceMappingURL=give_push.js.map
*/