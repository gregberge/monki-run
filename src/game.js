var monki = require('./monki'),
  tileMap = require('./tile-map');

var PIXI = require('pixi');

exports.start = function (stage) {
  monki.position.x = 20;
  stage.addChild(monki);
  stage.addChild(tileMap);


  var lastCalledTime = new Date().getTime();

  function update () {
    requestAnimFrame(update);

    var dt = (new Date().getTime() - lastCalledTime)/1000;

    monki.update(dt);
  }

  requestAnimFrame(update);
};