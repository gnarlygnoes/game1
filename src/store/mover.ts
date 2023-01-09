import {Updatable} from '../data-types/data-types'
import {V2} from '../data-types/v2'

/*

 Collisions should be applied to velocity instead of acceleration or thrust.

 */
export class Mover implements Updatable {
  constructor(
    // x and y ints
    public position = V2.empty,

    // Pixels
    public size = V2.empty,

    // Vector, ideally unit.
    public direction: V2 = [0, -1],

    public velocity = V2.empty,

    public thrust = V2.empty,

    public turnSpeed = 4,

    public maxVelocity = 10
  ) {}

  rotate(angle: number) {
    this.direction = V2.normalise(V2.rotate(this.direction, angle))
  }

  getAngle(): number {
    return V2.angle(this.direction)
  }

  update(timeSince: number) {
    this.velocity = V2.limitMagnitude(
      V2.add(this.velocity, V2.scale(this.thrust, timeSince / 100)),
      this.maxVelocity
    )
    this.position = V2.add(this.position, this.velocity)
  }
}
