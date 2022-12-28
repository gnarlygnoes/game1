import {Updatable} from '../data-types/data-types'
import {normaliseV2, V2, v2} from '../data-types/v2'

export class Mover implements Updatable {
  constructor(
    // x and y ints
    public position = v2(0, 0),

    // Pixels
    public size = v2(0, 0),

    // Vector, ideally unit.
    public direction = v2(0, 1),
    public velocity = v2(0, 0),
    public acceleration: V2[] = [],
    public turnSpeed = 1
  ) {}

  addAcceleration(x: number, y: number) {
    this.acceleration.push(v2(x, y))
  }

  rotate(degrees: number) {
    const {x, y} = this.direction

    this.direction = normaliseV2(
      v2(
        Math.cos(degrees) * x - Math.sin(degrees) * y,
        Math.sin(degrees) * x + Math.cos(degrees) * y
      )
    )

    const {x: x2, y: y2} = this.direction

    console.log('direction added: ', Math.sqrt(x2 ** 2 + y ** 2))
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
