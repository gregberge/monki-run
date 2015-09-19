import PIXI from 'pixi.js';
import monki from './monki';
import renderer from './renderer';
import stage from './stage';
import TileMatcher from './utils/tile-matcher';

/**
 * Start the game.
 */

export function start({world}) {
  const tileMatcher = new TileMatcher(world);

  monki.position.x = 20;

  stage.addChild(world.tiledMap);
  stage.addChild(monki);

  function update () {
    requestAnimationFrame(update);

    // Compute delta time
    const dt = lastCalledTime ? (Date.now() - lastCalledTime) / 1000 : 0;

    // Update monki
    monki.update(dt);

    const monkiBottomRight = new PIXI.Point(monki.position.x + monki.width, monki.position.y + monki.height);
    const monkiBottomLeft = new PIXI.Point(monki.position.x, monki.position.y + monki.height);
    monki.setGround(
      tileMatcher.getTileAtPosition(monkiBottomRight, {layer: 'Platforms'}) ||
        tileMatcher.getTileAtPosition(monkiBottomLeft, {layer: 'Platforms'})
    );

    // Render container
    renderer.render(stage);

    lastCalledTime = Date.now();
  }

  let lastCalledTime;
  requestAnimationFrame(update);
}
