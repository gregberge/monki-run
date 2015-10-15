import Stage from './sprites/stage';
import Hero from './sprites/hero';
import TileMatcher from './utils/tile-matcher';

export default class Game {

  /**
   * Create a new game.
   *
   * @param {object} resources
   */

  constructor({resources: {world}, renderer}) {
    this.loop = this.loop.bind(this);

    this.renderer = renderer;
    this.tileMatcher = new TileMatcher(world);

    this.stage = new Stage();
    this.hero = new Hero({tileMatcher: this.tileMatcher});
    this.stage.addChild(world.tiledMap);
    this.stage.addChild(this.hero);
  }

  /**
   * Start game.
   */

  start() {
    requestAnimationFrame(this.loop);
  }

  /**
   * Loop of the game.
   */

  loop() {
    const dt = this.lastLoopTime ?
      (Date.now() - this.lastLoopTime) / 1000 : 0;
    this.update(dt);
    this.lastLoopTime = Date.now();
    requestAnimationFrame(this.loop);
  }

  /**
   * Called at each requestAnimationFrame.
   *
   * @param {number} dt
   */

  update(dt) {
    this.hero.update(dt);
    this.renderer.render(this.stage);
  }
}
