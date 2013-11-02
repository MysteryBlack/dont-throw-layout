dont.controller "WantGroupCtrl", ($scope) ->
  $scope.drawGroup = ()->
    s = Snap("#svg")
    group = s.circle('50%', '50%', '50%')

    group_mask = s.rect(0, 0, '50%', '50%')
    group_mask.attr {fill: "#fff"}
    group.attr {mask: group_mask}

    s.add(group.clone().pattern('50%','50%'))

    setTimeout () ->
      group.animate({r: '25%'}, 1000, mina.elastic)
    , 1000