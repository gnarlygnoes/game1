export enum MIds {
  posX,
  posY,
  sizeX,
  sizeY,
  dirX,
  dirY,
  velX,
  velY,
  thrustX,
  thrustY,
  turnSpeed,
  maxVelocity,
}

export class Movers {
  readonly len = 12

  data = new Float64Array(this.componentsLen * this.len)

  shift: number

  constructor(public componentsLen: number) {
    this.shift = componentsLen * this.len
  }
}
