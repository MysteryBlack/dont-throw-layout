app.service('SelectSvc', [
  function() {
    var data;
    data = [];
    this.add = function(photo) {
      photo.selected = true;
      data.push(photo);
      return angular.forEach(photo.album, function(value, key) {
        return value.selected++;
      });
    };
    this.del = function(photo) {
      var index;
      index = data.indexOf(photo);
      photo.selected = false;
      data.splice(index, 1);
      return angular.forEach(photo.album, function(value, key) {
        return value.selected--;
      });
    };
    this.clear = function() {
      return angular.forEach(data.splice(0), function(photo, key) {
        photo.selected = false;
        return angular.forEach(photo.album, function(value, key) {
          return value.selected--;
        });
      });
    };
    this.fetch = function() {
      return data;
    };
    this.length = function() {
      return data.length;
    };
    return this.exchange = function(photo_a, photo_b) {
      var index_a, index_b;
      index_a = data.indexOf(photo_a);
      index_b = data.indexOf(photo_b);
      data.splice(index_a, 1, photo_b);
      return data.splice(index_b, 1, photo_a);
    };
  }
]);

/*
//@ sourceMappingURL=select_svc.js.map
*/