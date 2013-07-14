var KeyboardJS = require('KeyboardJS');

exports.isDown = function (key) {
  return KeyboardJS.activeKeys().indexOf(key) !== -1;
};

exports.isUp = function (key) {
  return KeyboardJS.activeKeys().indexOf(key) === -1;
};