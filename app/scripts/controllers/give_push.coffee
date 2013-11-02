dont.controller "GivePushCtrl", ($scope) ->
  $scope.thingSize = 100
  $scope.drawThing = (e) ->
    console.log e
    $scope.thingSize = $('#give_push .thine').width()
