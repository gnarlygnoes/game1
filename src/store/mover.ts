import {v2, V2} from './data-types'
import {makeObservable} from '../../fiend-ui/src'

export class Mover {
  acceleration: V2[] = []

  $direction: V2 = v2(0, 1)
  velocity: V2 = v2(0, 0)

  constructor(public turnSpeed: number, public position: V2) {
    makeObservable(this)
  }

  addAcceleration(x: number, y: number) {
    this.acceleration.push(v2(x, y))
  }

  /*
  𝑥2=cos𝛽𝑥1−sin𝛽𝑦1
  𝑦2=sin𝛽𝑥1+cos𝛽𝑦1
   */
  rotate(degrees: number) {
    const {x, y} = this.$direction

    this.$direction = v2(
      Math.cos(degrees) * x - Math.sin(degrees) * y,
      Math.sin(degrees) * x + Math.cos(degrees) * y
    )

    console.log(this.$direction, this.getAngle())
  }

  getAngle(): number {
    const {x, y} = this.$direction

    console.log(Math.atan2(y, x))

    return Math.atan2(y, x) * (180 / Math.PI) + 90
  }

  update(now: number, last: number) {
    // calculate velocity and position?
    // If the current velocity direction and acceleration are different,
    // adding them will be more complicated.
  }
}
