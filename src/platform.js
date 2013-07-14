var PIXI = require('pixi');

var Platform = function () {
  var texture = PIXI.Texture.fromImage('src/textures/platform.png');
  PIXI.Sprite.call(this, texture);
};

Platform.constructor = PIXI.Sprite;
Platform.prototype = Object.create(PIXI.Sprite.prototype);

exports.Platform = Platform;