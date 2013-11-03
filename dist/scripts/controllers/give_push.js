dont.controller("GivePushCtrl", function($scope, $fileUploader, $http, $location) {
  var uploader;
  $scope.tags = [];
  $scope.picPool = [];
  if ($scope.picPool.length === 0) {
    $scope.mainPic = "";
  }
  $scope.addTag = function(e) {
    var offsetX, offsetY, tagname, timestamp;
    console.log(e.target);
    if (!$(e.target).hasClass('photo')) {
      return;
    }
    offsetX = e.offsetX / $(e.target).width() * 100;
    offsetY = e.offsetY / $(e.target).height() * 100;
    console.log('GivePushCtrl[offsetX]: ' + offsetX);
    console.log('GivePushCtrl[offsetY]: ' + offsetY);
    tagname = prompt("請輸入物件名稱", "衣櫃");
    if (tagname) {
      timestamp = (new Date()).valueOf();
      return $scope.tags.push({
        name: tagname,
        x: offsetX,
        y: offsetY,
        id: timestamp
      });
    }
  };
  $scope.removeTag = function(e, tag) {
    var index;
    index = $scope.tags.indexOf(tag);
    return $scope.tags.splice(index, 1);
  };
  $scope.finishtag = function() {
    return $http.post("http://api.dont-throw.com/post/update", {
      data: $scope.tags,
      picid: $scope.picPool[0].u
    }).success(function(d) {
      console.log(d);
      return $location.path('/#/give_preview/' + d.postid);
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
    $scope.mainPic = 'https://s3-us-west-2.amazonaws.com/dont-throw/' + $scope.picPool[0].u;
    $scope.openthis = true;
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