import {Point} from 'pixi.js';

export default class GroundMatcher {
  /**
   * Create a new platform matcher.
   */

  constructor(tileMatcher) {
    this.tileMatcher = tileMatcher;
  }

  /**
   * Return the ground of sprite.
   *
   * @param {PIXI.DisplayObject} sprite
   */

  update(sprite) {
    const bottomRight = new Point(sprite.position.x + sprite.width, sprite.position.y + sprite.height);
    const bottomLeft = new Point(sprite.position.x, sprite.position.y + sprite.height);
    const ground = this.getPlatformAtPosition(bottomRight) ||
      this.getPlatformAtPosition(bottomLeft);

    sprite.ground = ground;

    if (ground) {
      if (sprite.forces.gravity)
        sprite.forces.gravity.reset();

      if (sprite.forces.jump)
        sprite.forces.jump.reset();

      sprite.position.y = sprite.ground.y - sprite.height;
    }
  }

  /**
   * Get platform at position.
   *
   * @param {PIXI.Point} position
   * @returns {PIXI.Rectangle} rect
   */

  getPlatformAtPosition(position) {
    return this.tileMatcher.getTileAtPosition(position, {layer: 'Platforms'});
  }
}
