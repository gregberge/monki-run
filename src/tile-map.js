import PIXI from 'pixi.js';
import Platform from './platform';

/**
 * Tile map of the game.
 * y: 0 -> x
 * y: 1 -> 10 * y + x
 * @type {number[]}
 */

const map = [
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

class TileMap extends PIXI.Container {
  constructor(map) {
    super();

    this.map = map;

    this.tileSize = {
      width: 50,
      height: 50
    };

    this.tileLength = {
      width: 10,
      height: 10
    };

    this.map.forEach(this.addTile.bind(this));
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
    this.addChild(platform);
  }

  /**
   * Return tile coords for a specific position.
   *
   * @param {PIXI.Point} position
   * @returns {PIXI.Point}
   */

  getTileCoordForPosition(position) {
    const x = Math.floor(position.x / this.tileSize.width);
    const y = Math.floor(position.y / this.tileSize.height);
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
    const origin = new PIXI.Point(tileCoords.x * this.tileSize.width, tileCoords.y * this.tileSize.height);
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
