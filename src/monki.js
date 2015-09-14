import PIXI from 'pixi.js';
import keys from './keys';

class Monki extends PIXI.Sprite {
  constructor() {
    const texture = PIXI.Texture.fromImage('src/textures/monki@2x.png');
    super(texture);

    this.gravityForce = new PIXI.Point(0, 0);
    this.jumpForce = new PIXI.Point(0, 0);
    this.velocity = new PIXI.Point(0, 0);
    this.jumped = false;
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
    const move = new PIXI.Point(300, 0);

    if (keys.right)
      this.position.x += move.x * dt;

    if (keys.left)
      this.position.x -= move.x * dt;
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
    const gravity = new PIXI.Point(0, 15);
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
