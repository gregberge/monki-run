import PIXI from 'pixi.js';
import keys from '../utils/keys';
import Animator from '../utils/animator';
import gravity from '../forces/gravity';
import Force from '../utils/force';
import ForceSet from '../utils/force-set';

export default class Hero extends PIXI.extras.TilingSprite {

  /**
   * Create a new Hero.
   */

  constructor({groundMatcher}) {
    const texture = PIXI.Texture.fromImage('src/textures/mario-sprite.png');
    super(texture, 16, 32);

    this.groundMatcher = groundMatcher;

    this.forces = new ForceSet({
      gravity: gravity(),
      jump: new Force(0, -50, {limit: new PIXI.Point(0, -6)}),
      velocity: new Force(100, 0, {limit: new PIXI.Point(4)})
    });

    this.animator = new Animator(this);
    this.animator.addAnimation('run', [1, 2, 0], 0);

    this.ground = [];
  }

  /**
   * Update loop.
   *
   * @param {number} dt Delta time
   */

  update(dt) {
    this.forces.update(dt, this);

    this.groundMatcher.update(this);

    this.animator.animations.run.fps = Math.abs(this.forces.velocity.value.x * 4);
    this.animator.update(dt);

    this.updateJump();
    this.updateMove();

    this.groundMatcher.update(this);
  }

  /**
   * Check keys and decide to apply jump or not.
   */

  updateJump() {
    this.forces.jump.exerting = keys.up &&
      (this.forces.jump.exerting || this.ground);
  }

  /**
   * Check keys and apply move.
   */

  updateMove() {
    if (keys.right || keys.left) {
      const direction = keys.right ? 1 : -1;

      if (this.forces.velocity.value.x * direction < 0)
        this.forces.velocity.value.x = 0;

      this.forces.velocity.power.x = Math.abs(this.forces.velocity.power.x) * direction;
      this.forces.velocity.limit.x = Math.abs(this.forces.velocity.limit.x) * direction;
      this.forces.velocity.exerting = true;
      this.tileScale.x = -direction;
      this.animator.setCurrentAnimation('run');
    } else {
      this.forces.velocity.exerting = false;
      this.forces.velocity.reset();
      this.animator.setCurrentAnimation(null);
      this.tilePosition.x = this.tileScale.x * this.width - this.width;
    }
  }
}
