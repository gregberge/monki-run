var stage = require('./stage'),
  renderer = require('./renderer'),
  game = require('./game');

document.body.appendChild(renderer.view);
renderer.start(stage);
game.start(stage);