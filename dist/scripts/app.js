$(function() {
  var bigCircle, s;
  s = Snap("#svg");
  bigCircle = s.circle(150, 150, 100);
  return setTimeout(function() {
    return bigCircle.animate({
      r: 50
    }, 1000, mina.elastic);
  }, 1000);
});

/*
//@ sourceMappingURL=app.js.map
*/