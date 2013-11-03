dont.controller("GivePreviewCtrl", function($scope, $stateParams) {
  $scope.tags = [];
  return $scope.addTag = function(e) {
    var offsetX, offsetY;
    offsetX = e.offsetX / $(e.target).width() * 100;
    offsetY = e.offsetY / $(e.target).height() * 100;
    return $scope.tags.push({
      x: offsetX,
      y: offsetY
    });
  };
});

/*
//@ sourceMappingURL=give_preview.js.map
*/