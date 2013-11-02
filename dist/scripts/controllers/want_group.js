dont.controller("WantGroupCtrl", function($scope) {
  return $scope.drawGroup = function() {
    var group, group_mask, s;
    s = Snap("#svg");
    group = s.circle('50%', '50%', '50%');
    group_mask = s.rect(0, 0, '50%', '50%');
    group_mask.attr({
      fill: "#fff"
    });
    group.attr({
      mask: group_mask
    });
    s.add(group.clone().x('50%', '50%'));
    return setTimeout(function() {
      return group.animate({
        r: '25%'
      }, 1000, mina.elastic);
    }, 1000);
  };
});

/*
//@ sourceMappingURL=want_group.js.map
*/