var PIXI = require('pixi');

function hidpi(renderer) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var width = renderer.view.width;
  var height = renderer.view.height;
  renderer.view.style.width = width + 'px';
  renderer.view.style.height = height + 'px';
  renderer.resize(width * devicePixelRatio, height * devicePixelRatio);
  return renderer;
}

var renderer = PIXI.autoDetectRenderer(500, 500);

renderer = hidpi(renderer);

module.exports = exports = renderer;

exports.start = function (stage) {
  function animate() {
    requestAnimFrame(animate);
    renderer.render(stage);
  }

  requestAnimFrame(animate);
};