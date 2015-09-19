import renderer from './renderer';
import {load} from './loader';
import {start} from './game';

document.getElementById('game').appendChild(renderer.view);

load((loader, resources) => {
  start(resources);
});
