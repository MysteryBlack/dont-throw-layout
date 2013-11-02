dont.controller "GivePreviewCtrl", ($scope) ->
  $scope.tags = []
  $scope.addTag = (e) ->
    offsetX = e.offsetX / $(e.target).width() * 100
    offsetY = e.offsetY / $(e.target).height() * 100
    $scope.tags.push {x:offsetX, y:offsetY}