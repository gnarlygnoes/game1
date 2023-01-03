import {Updatable} from '../data-types/data-types'
import {addV2, normaliseV2, rotateV2, scaleV2, V2, v2} from '../data-types/v2'

/*

 Collisions should be applied to velocity instead of acceleration or thrust.

 */
export class Mover implements Updatable {
  constructor(
    // x and y ints
    public position = v2(0, 0),

    // Pixels
    public size = v2(0, 0),

    // Vector, ideally unit.
    public direction = v2(0, 1),

    public velocity = v2(0, 0),

    public thrust = v2(0, 0),

    public turnSpeed = 2
  ) {}

  rotate(angle: number) {
    this.direction = normaliseV2(rotateV2(this.direction, angle))
  }

  getAngle(): number {
    const {x, y} = this.direction

    return Math.atan2(y, x) + (90 * Math.PI) / 180
  }

  update(timeSince: number) {
    this.velocity = addV2(this.velocity, scaleV2(this.thrust, timeSince / 100))
    this.position = addV2(this.position, this.velocity)
  }
}
