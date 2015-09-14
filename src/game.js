import PIXI from 'pixi.js';
import monki from './monki';
import tileMap from './tile-map';
import renderer from './renderer';
import stage from './stage';

/**
 * Start the game.
 */

export function start() {
  monki.position.x = 20;

  stage.addChild(monki);
  stage.addChild(tileMap);


  function update () {
    requestAnimationFrame(update);

    // Compute delta time
    const dt = lastCalledTime ? (new Date().getTime() - lastCalledTime) / 1000 : 0;

    // Update monki
    monki.update(dt);

    const monkiBottom = new PIXI.Point(monki.position.x, monki.position.y + monki.height);
    monki.setGround(tileMap.getCollidingTileRect(monkiBottom));

    // Render container
    renderer.render(stage);

    lastCalledTime = new Date().getTime();
  }

  let lastCalledTime;
  requestAnimationFrame(update);
}
