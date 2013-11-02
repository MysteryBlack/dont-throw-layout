dont.controller("GivePushCtrl", function($scope, $fileUploader) {
  var uploader;
  $scope.tags = [];
  $scope.updatelists = '';
  $scope.addTag = function(e) {
    var offsetX, offsetY;
    offsetX = e.offsetX / $(e.target).width() * 100;
    offsetY = e.offsetY / $(e.target).height() * 100;
    console.log('GivePushCtrl[offsetX]: ' + offsetX);
    console.log('GivePushCtrl[offsetY]: ' + offsetY);
    return $scope.tags.push({
      x: offsetX,
      y: offsetY
    });
  };
  uploader = $fileUploader.create({
    scope: $scope,
    url: "http://api.dont-throw.com/updatefile/img",
    filters: [
      function(item) {
        console.log("filter1");
        return true;
      }
    ]
  });
  uploader.filters.push(function(item) {
    console.log("filter2");
    return true;
  });
  uploader.bind("complete", function(event, xhr, item) {
    var _x, _ym;
    console.log("Complete: " + xhr.response);
    _x = angular.fromJson(xhr.response);
    $scope.picPool.push({
      u: _x.n,
      m: 0
    });
    $scope.oi = false;
    console.log($scope.picPool[0]);
    _ym = 0;
    angular.forEach($scope.picPool, function(v, i) {
      if (v.m === 1) {
        return _ym = 1;
      }
    });
    if (_ym === 0) {
      return $scope.picPool[0].m = 1;
    }
  });
  uploader.bind("completeall", function(event, items) {
    return $scope.oi = false;
  });
  return $scope.uploader = uploader;
});

/*
//@ sourceMappingURL=give_push.js.map
*/