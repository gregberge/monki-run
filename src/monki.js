var PIXI = require('pixi');

var Monki = function () {
  var texture = PIXI.Texture.fromImage('src/textures/monki.png');
  PIXI.Sprite.call(this, texture);

  this.velocity = new PIXI.Point(0, 0);
};

Monki.constructor = PIXI.Sprite;
Monki.prototype = Object.create(PIXI.Sprite.prototype);

Monki.prototype.update = function (dt) {
  var gravity = new PIXI.Point(0, 3);

  var gravityStep = new PIXI.Point(gravity.x * dt, gravity.y * dt);

  this.velocity.x += gravityStep.x;
  this.velocity.y += gravityStep.y;

  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

module.exports = new Monki();