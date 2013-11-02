app.service('Configs', [
  function() {
    var step;
    step = [];
    this.set_step = function(index, todo) {
      return step[index] = todo;
    };
    return this.get_step = function(index) {
      return step[index];
    };
  }
]);

/*
//@ sourceMappingURL=configs.js.map
*/