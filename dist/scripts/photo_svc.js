app.service('PhotoSvc', [
  function() {
    var album_array, album_lite, fetch_album, fetch_photo, get_album_from_dblite, get_photo_from_dblite, photo_array, photo_lite, ps, timer;
    ps = {
      path: "/photo",
      sid: null,
      page_limit: 100
    };
    photo_lite = {};
    album_lite = {};
    photo_array = {
      data: [],
      count: 0,
      selected: 0,
      page: 0,
      looading: false
    };
    album_array = {
      data: [],
      count: 0,
      page: 0
    };
    timer = {
      photo: null,
      albumPhoto: null
    };
    get_photo_from_dblite = function(photo, album) {
      var id, obj;
      id = $('id', photo).text();
      if (!photo_lite[id]) {
        photo_lite[id] = {};
      }
      obj = photo_lite[id];
      obj.id = id;
      obj.type = 'photo';
      obj.src = '/photo/api/thumb.php?' + $.param({
        s: 1,
        f: id
      });
      obj.output = '/photo/api/photo.php?' + $.param({
        a: 'display',
        f: id,
        sid: ps.sid
      });
      obj.width = $('iWidth', photo).text();
      obj.height = $('iHeight', photo).text();
      if (!obj.album) {
        obj.album = [];
      }
      if (album) {
        obj.album.push(album);
      }
      return obj;
    };
    get_album_from_dblite = function(album) {
      var id, obj;
      id = $('iPhotoAlbumId', album).text();
      if (!album_lite[id]) {
        album_lite[id] = {};
      }
      obj = album_lite[id];
      obj.id = id;
      obj.type = 'album';
      obj.src = '/photo/api/thumb.php?f=' + $('iAlbumCover', album).text();
      obj.count = $('PhotoCount', album).text();
      obj.title = $('cAlbumTitle', album).text();
      obj.created = $('DateCreated', album).text();
      obj.modified = $('DateModified', album).text();
      obj.selected = 0;
      if (!obj.data) {
        obj.data = [];
      }
      if (!obj.page) {
        obj.page = 0;
      }
      return obj;
    };
    fetch_photo = function(id, completed) {
      var sid, svc, target;
      sid = ps.sid;
      if (id) {
        target = album_lite[id];
        svc = ps.path + "/api/list.php?t=albumPhotos&" + $.param({
          a: id,
          p: ++target.page,
          c: ps.page_limit
        });
      } else {
        target = photo_array;
        svc = ps.path + "/api/list.php?t=photos&" + $.param({
          p: ++target.page,
          c: ps.page_limit
        });
      }
      return $.ajax({
        type: "GET",
        url: svc,
        cache: false,
        dataType: 'xml'
      }).always(function(res, status) {
        var count;
        if (sid !== ps.sid) {
          return;
        }
        if (status === 'success') {
          count = $('photoCount', res).text();
          if (count > 0) {
            target.count = count;
          }
          $('FileItem', res).each(function() {
            var item;
            if ($('MediaType', this).text() === 'photo') {
              item = get_photo_from_dblite(this, id ? target : null);
              target.data.push(item);
              if (item.selected) {
                return target.selected++;
              }
            }
          });
        }
        if (angular.isFunction(completed)) {
          return completed();
        }
      });
    };
    fetch_album = function(wait) {
      var sid;
      if (wait == null) {
        wait = 1000;
      }
      sid = ps.sid;
      return $.ajax({
        type: "GET",
        url: ps.path + "/api/list.php?t=albums",
        cache: false,
        dataType: 'xml'
      }).always(function(res, status) {
        if (sid !== ps.sid) {
          return;
        }
        if (status === 'success') {
          return $('FileItem', res).each(function() {
            album_array.data.push(get_album_from_dblite(this));
            return album_array.count = album_array.data.length;
          });
        } else {
          return setTimeout((function() {
            return fetch_album(wait + 500);
          }), wait);
        }
      });
    };
    this.photo = function(id) {
      var target;
      if (id) {
        target = this.get_album(id);
      } else {
        target = photo_array;
      }
      return target.data;
    };
    this.album = function() {
      return album_array.data;
    };
    this.get_album = function(id) {
      var obj;
      if (!album_lite[id]) {
        album_lite[id] = {};
      }
      obj = album_lite[id];
      if (!obj.id) {
        obj.id = id;
      }
      if (!obj.data) {
        obj.data = [];
      }
      if (!obj.page) {
        obj.page = 0;
      }
      return obj;
    };
    this.reset_sid = function(sid) {
      var auto_fetch_album_photo, auto_fetch_photo;
      if (sid !== ps.sid) {
        ps.sid = sid;
        photo_array.count = 0;
        while (photo_array.data.length) {
          photo_array.data.shift();
        }
        album_array.count = 0;
        while (album_array.data.length) {
          album_array.data.shift();
        }
        photo_lite = {};
        album_lite = {};
        if (timer.albumPhoto) {
          clearTimeout(timer.albumPhoto);
        }
        (auto_fetch_album_photo = function(limitPage) {
          var album, _i, _len, _ref;
          _ref = album_array.data;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            album = _ref[_i];
            if (album.page < limitPage && album.data.length < album.count) {
              fetch_photo(album.id, function() {
                return timer.albumPhoto = setTimeout((function() {
                  return auto_fetch_album_photo(limitPage);
                }), 500);
              });
              return;
            }
          }
          if (album_array.data.length > 0) {
            return timer.albumPhoto = setTimeout((function() {
              return auto_fetch_album_photo(limitPage + 1);
            }), 500);
          } else {
            return timer.albumPhoto = setTimeout((function() {
              return auto_fetch_album_photo(limitPage);
            }), 500);
          }
        })(1);
        if (timer.photo) {
          clearTimeout(timer.photo);
        }
        (auto_fetch_photo = function() {
          return fetch_photo(null, function() {
            if (photo_array.data.length < photo_array.count) {
              return setTimeout(auto_fetch_photo, 1000);
            }
          });
        })();
        return fetch_album();
      }
    };
    return this.photo_count = function() {
      return photo.count;
    };
  }
]);

/*
//@ sourceMappingURL=photo_svc.js.map
*/