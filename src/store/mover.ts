import {Updatable} from '../data-types/data-types'
import {addV2, normaliseV2, V2, v2} from '../data-types/v2'

export enum AccelerationType {
  thrust,
}

export class Mover implements Updatable {
  constructor(
    // x and y ints
    public position = v2(0, 0),

    // Pixels
    public size = v2(0, 0),

    // Vector, ideally unit.
    public direction = v2(0, 1),
    public velocity = v2(0, 0),
    public acceleration = new Map<AccelerationType, V2>(),
    public turnSpeed = 1
  ) {}

  addAcceleration(type: AccelerationType, v: V2) {
    this.acceleration.set(type, v)
  }

  rotate(degrees: number) {
    const {x, y} = this.direction

    this.direction = normaliseV2(
      v2(
        Math.cos(degrees) * x - Math.sin(degrees) * y,
        Math.sin(degrees) * x + Math.cos(degrees) * y
      )
    )
  }

  getAngle(): number {
    const {x, y} = this.direction

    return Math.atan2(y, x) + (90 * Math.PI) / 180
  }

  update(timeSince: number) {
    const thrust = this.acceleration.get(AccelerationType.thrust)

    if (thrust) {
      this.position = addV2(this.position, thrust)
    }
  }
}
