import {Updatable} from '../data-types/data-types'
import {
  addV2,
  angleV2,
  emptyV2,
  limitMagnitudeV2,
  normaliseV2,
  rotateV2,
  scaleV2,
  V2,
} from '../data-types/v2'

/*

 Collisions should be applied to velocity instead of acceleration or thrust.

 */
export class Mover implements Updatable {
  constructor(
    // x and y ints
    public position = emptyV2,

    // Pixels
    public size = emptyV2,

    // Vector, ideally unit.
    public direction: V2 = [0, -1],

    public velocity = emptyV2,

    public thrust = emptyV2,

    public turnSpeed = 4,

    public maxVelocity = 10
  ) {}

  rotate(angle: number) {
    this.direction = normaliseV2(rotateV2(this.direction, angle))
  }

  getAngle(): number {
    return angleV2(this.direction)
  }

  update(timeSince: number) {
    this.velocity = limitMagnitudeV2(
      addV2(this.velocity, scaleV2(this.thrust, timeSince / 100)),
      this.maxVelocity
    )
    this.position = addV2(this.position, this.velocity)
  }
}
