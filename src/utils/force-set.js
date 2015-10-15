import Force from './force';

export default class ForceSet {
  /**
   * Create a new set of forces.
   *
   * @type {object} forces
   */

  constructor(forces) {
    Object.assign(this, forces);
  }

  /**
   * Update forces.
   *
   * @param {number} dt
   */

  update(dt) {
    for (const key in this) {
      if (this[key] instanceof Force)
        this[key].update(dt);
    }
  }
}
