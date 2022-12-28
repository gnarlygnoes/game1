import {Updatable, v2, V2} from './data-types'

export class Mover implements Updatable {
  acceleration: V2[] = []

  direction = v2(0, 1)
  velocity = v2(0, 0)

  constructor(public turnSpeed: number, public position: V2, public size: V2) {}

  addAcceleration(x: number, y: number) {
    this.acceleration.push(v2(x, y))
  }

  rotate(degrees: number) {
    const {x, y} = this.direction

    this.direction = v2(
      Math.cos(degrees) * x - Math.sin(degrees) * y,
      Math.sin(degrees) * x + Math.cos(degrees) * y
    )
  }

  getAngle(): number {
    const {x, y} = this.direction

    return Math.atan2(y, x) + (90 * Math.PI) / 180
  }

  update(now: number, last: number) {
    // calculate velocity and position?
    // If the current velocity direction and acceleration are different,
    // adding them will be more complicated.
  }
}
