dont.controller "GivePushCtrl", ($scope) ->
  $scope.tags = []
  $scope.addTag = (e) ->
    offsetX = e.offsetX / $(e.target).width() * 100
    offsetY = e.offsetY / $(e.target).height() * 100
    console.log 'GivePushCtrl[offsetX]: '+offsetX
    console.log 'GivePushCtrl[offsetY]: '+offsetY
    $scope.tags.push {x:offsetX, y:offsetY}