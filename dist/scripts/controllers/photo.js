app.controller("PhotoCtrl", function($scope, $routeParams, $timeout, PhotoSvc, SelectSvc, UserSvc, Tab, Configs) {
  var listener, run_zoom;
  $scope.items = [];
  $scope.limit = 0;
  $scope.tab = Tab;
  $scope.selected = SelectSvc.fetch();
  $scope.box = {
    wrap_width: 1000,
    wrap_height: 1000,
    width: 1,
    height: 1
  };
  $scope.toolbar = false;
  $scope.user = UserSvc.info();
  $scope.$watch(UserSvc.status, function() {
    $scope.user = UserSvc.info();
    if (UserSvc.status() === 'login') {
      PhotoSvc.reset_sid($scope.user.sid);
      switch (Tab) {
        case 'album':
          return $scope.items = PhotoSvc.album();
        case 'selected':
          return $scope.items = SelectSvc.fetch();
        case 'albumPhoto':
          $scope.items = PhotoSvc.photo($routeParams.id);
          return $scope.album = PhotoSvc.get_album($routeParams.id);
        default:
          return $scope.items = PhotoSvc.photo();
      }
    }
  });
  run_zoom = false;
  $scope.zoom = 50;
  $scope.zoom_start = function(e) {
    return run_zoom = true;
  };
  $scope.zoom_listener = function(e, focus) {
    var positionX, range;
    if (run_zoom !== true && focus !== true) {
      return;
    }
    positionX = e.pageX - $('.zoom .zoom-meso').offset().left;
    range = $('.zoom .zoom-meso').width();
    if (positionX < 0) {
      positionX = 0;
    }
    if (positionX > range) {
      positionX = range;
    }
    $scope.zoom = positionX / range * 100;
    $scope.box.width = $scope.zoom / 100 + 0.5;
    $scope.box.height = $scope.zoom / 100 + 0.5;
    return false;
  };
  $scope.zoom_end = function(e) {
    return run_zoom = false;
  };
  $scope.init = function() {
    Configs.set_step(1, Tab);
    if ($scope.selected.length > 0) {
      $scope.toolbar = true;
    }
    $('body').attr('class', 'view-photo');
    switch (Tab) {
      case 'album':
        return $scope.box.type = 'album';
      default:
        return $scope.box.type = 'photo';
    }
  };
  $scope.toolbar_toggle = function() {
    return $scope.toolbar = !$scope.toolbar;
  };
  $scope.select = function(item) {
    item.hover = false;
    switch (item.type) {
      case 'photo':
        if (item.selected) {
          return SelectSvc.del(item);
        } else {
          SelectSvc.add(item);
          return $scope.toolbar = true;
        }
        break;
      case 'album':
        if (item.selected > 0) {
          return angular.forEach(item.data, function(photo, key) {
            if (photo.selected) {
              return SelectSvc.del(photo);
            }
          });
        } else {
          angular.forEach(item.data, function(photo, key) {
            if (!photo.selected) {
              return SelectSvc.add(photo);
            }
          });
          return $scope.toolbar = true;
        }
    }
  };
  $scope.enter = function(item, e) {
    if ($(e.target).hasClass('checkbox')) {
      return;
    }
    item.hover = false;
    switch (item.type) {
      case 'photo':
        if (item.selected) {
          return SelectSvc.del(item);
        } else {
          SelectSvc.add(item);
          return $scope.toolbar = true;
        }
        break;
      case 'album':
        return location.hash = '#/albumPhoto/' + item.id;
    }
  };
  $scope.clear = function() {
    return SelectSvc.clear();
  };
  (listener = function() {
    var height, reDisplay, width;
    reDisplay = false;
    width = $('#main').width();
    if (width !== $scope.box.wrap_width) {
      $scope.box.wrap_width = width;
      reDisplay = true;
    }
    height = $('#main').height();
    if (height !== $scope.box.wrap_height) {
      $scope.box.wrap_height = height;
      reDisplay = true;
    }
    if ($scope.items.length > $scope.limit) {
      if ($(document).height() - $(window).height() < $(document).scrollTop() + 500) {
        $scope.limit += 100;
        if ($scope.limit > $scope.items.length) {
          $scope.limit = $scope.items.length;
        }
        reDisplay = true;
      }
    }
    if (!(reDisplay ? $scope.$$phase : void 0)) {
      $scope.$apply();
    }
    return $scope.listen = $timeout(listener, 1000);
  })();
  return $scope.$on('$locationChangeStart', function() {
    if ($scope.listen) {
      return $timeout.cancel($scope.listen);
    }
  });
});

/*
//@ sourceMappingURL=photo.js.map
*/