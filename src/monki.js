import PIXI from 'pixi.js';
import keys from './keys';
import Animation from './utils/animation';

const move = new PIXI.Point(300, 0);

class Monki extends PIXI.extras.TilingSprite {
  constructor() {
    const texture = PIXI.Texture.fromImage('src/textures/mario-sprite.png');
    super(texture, 16, 32);

    this.gravityForce = new PIXI.Point(0, 0);
    this.jumpForce = new PIXI.Point(0, 0);
    this.velocity = new PIXI.Point(0, 0);
    this.jumped = false;
    this.ground = [];
    this.walkAnimation = new Animation(this, [1, 2, 0], move.x / 6);
  }

  /**
   * Update loop.
   *
   * @param {number} dt Delta time
   */

  update(dt) {
    // Jump
    this.applyJump(dt);

    // Gravity
    this.applyGravity(dt);

    // Move
    this.applyMove(dt);
  }

  applyMove(dt) {
    if (keys.right) {
      this.position.x += move.x * dt;
      this.tileScale.x = -1;
      this.walkAnimation.update(dt);
    } else if (keys.left) {
      this.position.x -= move.x * dt;
      this.tileScale.x = 1;
      this.walkAnimation.update(dt);
    } else {
      this.tilePosition.x = this.tileScale.x * this.width - this.width;
      this.walkAnimation.reset();
    }
  }

  applyJump(dt) {
    if (keys.space && !this.jumped) {
      const jump = new PIXI.Point(0, -50);
      const jumpStep = new PIXI.Point(jump.x * dt, jump.y * dt);

      this.jumpForce.x += jumpStep.x;
      this.jumpForce.y += jumpStep.y;
    } else {
      this.jumped = true;
    }

    if (this.jumpForce.y < -6) {
      this.jumpForce.y = -6;
      this.jumped = true;
    }

    this.position.x += this.jumpForce.x;
    this.position.y += this.jumpForce.y;
  }

  /**
   * Apply gravity.
   *
   * @param {number} dt
   */

  applyGravity(dt) {
    const gravity = new PIXI.Point(0, 20);
    const gravityStep = new PIXI.Point(gravity.x * dt, gravity.y * dt);

    this.gravityForce.x += gravityStep.x;
    this.gravityForce.y += gravityStep.y;

    if (this.gravityForce.y > 20) {
      this.gravityForce.y = 20;
    }

    this.position.x += this.gravityForce.x;
    this.position.y += this.gravityForce.y;
  }

  /**
   * Set ground of monki.
   *
   * @param {PIXI.Rectangle} rect
   */

  setGround(rect) {
    this.ground = rect;

    if (this.ground) {
      this.jumped = false;

      this.gravityForce.x = 0;
      this.gravityForce.y = 0;

      this.jumpForce.x = 0;
      this.jumpForce.y = 0;

      this.position.y = this.ground.y - this.height;
    }
  }
}

export default new Monki();
