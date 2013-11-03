dont.controller "LoginCtrl", ($scope,$location) ->
  $scope.items = []
  $scope.limit = 0
  $scope.href = () ->
    location.href = '#/choose'
