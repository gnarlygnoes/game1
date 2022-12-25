type Acceleration = {
  value: number
  direction: number
}

type Velocity = {
  value: number
  direction: number
}

export class Mover {
  acceleration: Acceleration[] = []
  velocity: Velocity = {value: 0, direction: 0}

  constructor(public turnSpeed: number, public x = 0, public y = 0) {}

  update(now: number, last: number) {
    //
  }
}
