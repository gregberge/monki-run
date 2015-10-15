import PIXI from 'pixi.js';
import ForceSet from '../utils/force-set';
import gravity from '../forces/gravity';

export default class Tortle extends PIXI.Sprite {
  constructor({groundMatcher}) {
    const texture = PIXI.Texture.fromImage('src/textures/monki@2x.png');
    super(texture);

    this.groundMatcher = groundMatcher;

    this.forces = new ForceSet({
      gravity: gravity()
    });
  }

  update(dt) {
    this.forces.update(dt, this);
    this.groundMatcher.update(this);
  }
}
