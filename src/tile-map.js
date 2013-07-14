var PIXI = require('pixi'),
  Platform = require('./platform').Platform;

var map = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

var TileMap = function (map) {
  PIXI.DisplayObjectContainer.call(this);

  this.map = map;

  this.tileSize = {
    width: 100,
    height: 100
  };

  this.tileLength =  {
    width: 10,
    height: 10
  };

  this.map.forEach(this.addTile.bind(this));
};

TileMap.constructor = PIXI.DisplayObjectContainer;
TileMap.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

TileMap.prototype.addTile = function (val, index) {
  if (val === 0) return ;

  var platform = new Platform();
  platform.position.x = this.tileSize.width * (index % this.tileLength.width);
  platform.position.y = this.tileSize.height * Math.floor(index / this.tileLength.width);
  this.addChild(platform);
};

TileMap.prototype.getTileCoordForPosition = function (position) {
  var x = Math.floor(position.x / this.tileSize.width);
  var y = Math.floor(position.y / this.tileSize.height);
  return new PIXI.Point(x, y);
};

TileMap.prototype.getTileRectFromTileCoords = function (tileCoords) {
  var origin = new PIXI.Point(tileCoords.x * this.tileSize.width, tileCoords.y * this.tileSize.height);
  return new PIXI.Rectangle(origin.x, origin.y, this.tileSize.width, this.tileSize.height);
};


module.exports = new TileMap(map);