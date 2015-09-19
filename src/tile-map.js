import PIXI from 'pixi.js';
import Platform from './platform';

/**
 * Tile map of the game.
 * y: 0 -> x
 * y: 1 -> 10 * y + x
 * @type {number[]}
 */

const map = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

class TileMap extends PIXI.Container {
  constructor(map) {
    super();

    this.map = map;
    this.position.y = 200;

    this.tileSize = {
      width: 50,
      height: 15
    };

    this.tileLength = {
      width: 30,
      height: 20
    };

    this.map.forEach(this.addTile.bind(this));
  }

  /**
   * Update loop.
   *
   * @param {number} dt Delta time
   */

  update(dt) {
    this.position.x -= dt * 200;

    if (this.position.x < -1000)
      this.position.x = 0;
  }

  /**
   * Add tile.
   *
   * @param {number} val
   * @param {number} index
   */

  addTile(val, index) {
    if (val === 0)
      return;

    const platform = new Platform();
    platform.position.x = this.tileSize.width * (index % this.tileLength.width);
    platform.position.y = this.tileSize.height * Math.floor(index / this.tileLength.width);
    platform.width = this.tileSize.width;
    platform.height = this.tileSize.height;
    this.addChild(platform);
  }

  /**
   * Return tile coords for a specific position.
   *
   * @param {PIXI.Point} position
   * @returns {PIXI.Point}
   */

  getTileCoordForPosition(position) {
    const x = Math.floor((position.x - this.position.x) / this.tileSize.width);
    const y = Math.floor((position.y - this.position.y) / this.tileSize.height);
    return new PIXI.Point(x, y);
  }

  /**
   * Test if there is a tile at a specific coordinates.
   *
   * @param {PIXI.Point} tileCoords
   * @returns {boolean}
   */

  isTileAtCoords(tileCoords) {
    return !!this.map[this.tileLength.width * tileCoords.y + tileCoords.x];
  }

  /**
   * Return tile rect from tile coordinates.
   *
   * @param {PIXI.Point} position
   * @returns {PIXI.Rectanble}
   */

  getTileRectFromTileCoords(tileCoords) {
    const origin = new PIXI.Point(tileCoords.x * this.tileSize.width + this.position.x, tileCoords.y * this.tileSize.height + this.position.y);
    return new PIXI.Rectangle(origin.x, origin.y, this.tileSize.width, this.tileSize.height);
  }

  /**
   * Return the colliding tile rect from a position.
   *
   * @param {PIXI.Point} position
   * @returns {PIXI.Rectangle|null}
   */

  getCollidingTileRect(position) {
    const tileCoords = this.getTileCoordForPosition(position);

    if (!this.isTileAtCoords(tileCoords))
      return null;

    return this.getTileRectFromTileCoords(tileCoords);
  }
}

export default new TileMap(map);
