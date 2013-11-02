app.controller("TemplateCtrl", function($scope, $timeout, SelectSvc, UserSvc, Configs) {
  var listener;
  $scope.tid = null;
  $scope.progress = null;
  $scope.status = 'output';
  $scope.page = {
    total: 1,
    now: 1
  };
  $scope.box = {
    wrap_width: 1000,
    wrap_height: 1000
  };
  $scope.wait = 0;
  $scope.temps = [
    {
      name: 'temp_a',
      icon: './templates/temp_a/icon.png'
    }, {
      name: 'temp_b',
      icon: './templates/temp_b/icon.png'
    }, {
      name: 'temp_c',
      icon: './templates/temp_c/icon.png'
    }, {
      name: 'temp_d',
      icon: './templates/temp_d/icon.png'
    }, {
      name: 'temp_e',
      icon: './templates/temp_e/icon.png'
    }, {
      name: 'temp_f',
      icon: './templates/temp_f/icon.png'
    }
  ];
  $scope.temp = 'temp_a';
  $scope.user = UserSvc.info();
  $scope.$watch(UserSvc.status, function() {
    return $scope.user = UserSvc.info();
  });
  $scope.init = function() {
    return $('body').attr('class', 'view-template');
  };
  $scope["break"] = function() {
    return location.hash = '#/' + (Configs.get_step(1) || 'photo');
  };
  $scope.select = function(item) {
    return $scope.temp = item.name;
  };
  $scope.output = function() {
    var images;
    if ($scope.status !== 'output') {
      if ($scope.status === 'download') {
        return window.open('./api.php?action=download&tid=' + $scope.tid);
      } else {
        return alert('Wait for progress...');
      }
    } else {
      images = [];
      $(SelectSvc.fetch()).each(function() {
        return images.push('http://127.0.0.1' + this.output);
      });
      $scope.status = 'wait';
      return $.ajax({
        type: "POST",
        url: "./api.php?action=output&template=" + $scope.temp,
        cache: false,
        data: {
          images: images
        },
        dataType: 'json'
      }).done(function(res) {
        $scope.tid = res.tid;
        return $scope.wait = images.length + 3;
      });
    }
  };
  $scope.pageLoad = function(e) {
    var doc, images, preview, temp;
    images = SelectSvc.fetch().slice(0);
    preview = $(e.target).contents();
    temp = $('.document', preview).detach();
    while (images.length > 0) {
      doc = temp.clone();
      $('.image', doc).each(function() {
        var image;
        image = images.shift();
        if (image != null) {
          $(this).css('background-image', "url('" + image.src + "')");
          return $(this).data('image', image);
        } else {
          return $(this).css('background-image', null);
        }
      });
      $('body', preview).append(doc, $('<div />').css({
        'page-break-inside': 'avoid',
        'background': '#C1C1C1',
        'height': '50px',
        'border': '1px solid #C1C1C1'
      }));
    }
    return $('body', preview).on('mousedown', '.image', function(e) {
      var oDom, oImg;
      oDom = e.target;
      oImg = $(e.target).data('image');
      if (!oImg) {
        return;
      }
      $('body', preview).on('mouseenter', '.image', function(e) {
        var tImg;
        tImg = $(e.target).data('image');
        if (!tImg) {
          return;
        }
        $(e.target).css('background-image', "url('" + oImg.src + "')");
        return $(oDom).css('background-image', "url('" + tImg.src + "')");
      });
      $('body', preview).on('mouseleave', '.image', function(e) {
        var tImg;
        tImg = $(e.target).data('image');
        if (!tImg) {
          return;
        }
        $(e.target).css('background-image', "url('" + tImg.src + "')");
        return $(oDom).css('background-image', "url('" + oImg.src + "')");
      });
      $('body', preview).on('mouseleave mouseup', function(e) {
        var tImg;
        $('body', preview).off('mouseenter mouseleave mouseup');
        tImg = $(e.target).data('image');
        if (!tImg) {
          return;
        }
        if (e.type === 'mouseup') {
          $(e.target).data('image', oImg);
          $(oDom).data('image', tImg);
          return SelectSvc.exchange(oImg, tImg);
        }
      });
      return false;
    });
  };
  (listener = function() {
    var height, listen, reDisplay;
    reDisplay = false;
    height = $(window).height();
    if (height !== $scope.box.wrap_height) {
      $scope.box.wrap_height = height;
      $('.iframe').css('transform', 'scale(' + ((height - 41 - 43) / 1123) + ')');
      reDisplay = true;
    }
    if ($scope.status === 'wait') {
      if ($scope.wait > 0) {
        $scope.wait--;
        reDisplay = true;
      } else {
        $scope.status = 'progress';
        (listen = function() {
          $scope.wait = null;
          return $.ajax({
            type: "GET",
            url: "./api.php?action=progress&tid=" + $scope.tid,
            cache: false,
            dataType: 'json'
          }).always(function(res, status) {
            if (status === 'success' && parseInt(res.progress, 10) >= 100) {
              $scope.status = 'download';
              if (reDisplay && !$scope.$$phase) {
                return $scope.$apply();
              }
            } else {
              return setTimeout(listen, 1000);
            }
          });
        })();
      }
    }
    if (reDisplay && !$scope.$$phase) {
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
//@ sourceMappingURL=template.js.map
*/