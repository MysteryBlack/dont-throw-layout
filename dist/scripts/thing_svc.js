dont.service('ThingsSvc', [
  function() {
    var things, things_lite;
    things_lite = [];
    things = [];
    this.fetch = function() {
      return things;
    };
    this.update = function(completed) {
      return $.ajax({
        url: "http://api.dont-throw.com/tag/all",
        cache: false,
        type: 'GET',
        dataType: "json"
      }).done(function(res) {
        angular.forEach(res.data, function(item, key) {
          if (things_lite[item.id] != null) {
            return;
          }
          things.push({
            id: item.id,
            photo: 'https://s3-us-west-2.amazonaws.com/dont-throw/' + item.picid,
            x: item.x,
            y: item.y,
            name: item.tagname,
            position: 50,
            selected: false
          });
          return things_lite[item.id] = true;
        });
        return completed();
      });
    };
    return this.length = function() {
      return things.length;
    };
  }
]);

/*
//@ sourceMappingURL=thing_svc.js.map
*/