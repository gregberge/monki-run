import PIXI from 'pixi.js';
import keys from './keys';
import Animator from './utils/animator';
import Force from './utils/force';

class Monki extends PIXI.extras.TilingSprite {
  constructor() {
    const texture = PIXI.Texture.fromImage('src/textures/mario-sprite.png');
    super(texture, 16, 32);

    this.gravity = new Force(this, 0, 20, {limit: new PIXI.Point(0, 20)});
    this.jump = new Force(this, 0, -50, {limit: new PIXI.Point(0, -6)});
    this.velocity = new Force(this, 100, 0, {limit: new PIXI.Point(4)});

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
    this.animator.update(dt);
    this.gravity.update(dt);
    this.jump.update(dt);
    this.velocity.update(dt);

    this.animator.animations.run.fps = Math.abs(this.velocity.value.x * 4);

    // Jump
    if (keys.space && (this.jump.exerting || this.ground))
      this.jump.exerting = true;
    else
      this.jump.exerting = false;

    // Move
    this.applyMove();
  }

  applyMove() {
    if (keys.right) {
      if (this.velocity.value.x < 0)
        this.velocity.value.x = 0;

      this.velocity.power.x = Math.abs(this.velocity.power.x);
      this.velocity.limit.x = Math.abs(this.velocity.limit.x);
      this.velocity.exerting = true;
      this.tileScale.x = -1;
      this.animator.setCurrentAnimation('run');
    } else if (keys.left) {
      if (this.velocity.value.x > 0)
        this.velocity.value.x = 0;

      this.velocity.power.x = -Math.abs(this.velocity.power.x);
      this.velocity.limit.x = -Math.abs(this.velocity.limit.x);
      this.velocity.exerting = true;
      this.tileScale.x = 1;
      this.animator.setCurrentAnimation('run');
    } else {
      this.velocity.exerting = false;
      this.velocity.reset();
      this.animator.setCurrentAnimation(null);
      this.tilePosition.x = this.tileScale.x * this.width - this.width;
    }
  }

  /**
   * Set ground of monki.
   *
   * @param {PIXI.Rectangle} rect
   */

  setGround(rect) {
    this.ground = rect;

    if (this.ground) {
      this.gravity.reset();
      this.jump.reset();

      this.position.y = this.ground.y - this.height;
    }
  }
}

export default new Monki();
