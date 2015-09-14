import PIXI from 'pixi.js';

export default class Platform extends PIXI.Sprite {
  constructor() {
    const texture = PIXI.Texture.fromImage('src/textures/platform@2x.png');
    super(texture);
  }
}
