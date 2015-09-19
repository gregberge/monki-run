export default class Animation {
  constructor(sprite, frames, fps) {
    this.sprite = sprite;
    this.frames = frames;
    this.frameTime = 1 / fps;
    this.reset();
  }

  update(dt) {
    this.duration += dt;

    if (this.duration >= this.frameTime) {
      if (this.frames.length > this.currentFrame + 1)
        this.currentFrame++;
      else
        this.currentFrame = 0;

      this.duration = 0;

      this.sprite.tilePosition.x = this.frames[this.currentFrame] * this.sprite.width;
    }
  }

  reset() {
    this.currentFrame = 0;
    this.duration = 0;
  }
}
