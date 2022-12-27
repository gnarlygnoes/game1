import {V2} from './data-types'

export class Mover {
  acceleration: V2[] = []
  velocity: V2 = {x: 0, y: 0}

  constructor(public turnSpeed: number, public x = 0, public y = 0) {}

  addAcceleration(x: number, y: number) {
    this.acceleration.push({
      x,
      y,
    })
  }

  update(now: number, last: number) {
    // calculate velocity and position?
    // If the current velocity direction and acceleration are different,
    // adding them will be more complicated.
  }
}
