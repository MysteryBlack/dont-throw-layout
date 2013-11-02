$ ->
  s = Snap("#svg")
  bigCircle = s.circle(150, 150, 100)
  setTimeout () ->
    bigCircle.animate({r: 50}, 1000, mina.elastic)
  , 1000