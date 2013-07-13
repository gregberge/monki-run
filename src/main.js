var stage = new PIXI.Stage(0xffffff, true);
var renderer = PIXI.autoDetectRenderer(400, 300);
document.body.appendChild(renderer.view);

function animate() {
  requestAnimFrame(animate);

  // render the stage
  renderer.render(stage);
}

requestAnimFrame(animate);