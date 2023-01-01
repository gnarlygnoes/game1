import {AccelerationType, Mover} from '../store/mover'
import {GameObject} from '../data-types/data-types'
import {Store} from '../store/store'
import {addV2, scaleV2, v2} from '../data-types/v2'
import {Thrust} from '../ships/parts/thrust'

const ship = require('./spaceShips_003.png')

export class Player implements GameObject {
  m = new Mover(v2(0, 0), v2(40, 40))

  shipImage = document.createElement('img')

  thrust = new Thrust(addV2(this.m.position, {x: -1.5, y: 19}), 8, 13, 0)

  constructor(public store: Store) {
    this.shipImage.src = ship
  }

  draw(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    const {
      m: {size},
    } = this

    const x = innerWidth / 2
    const y = innerHeight * 0.5

    ctx.translate(x, y)
    ctx.rotate(Math.PI)

    ctx.drawImage(this.shipImage, -size.x / 2, -size.y / 2, size.x, size.y)

    ctx.rotate(-Math.PI)

    if (this.store.controls.forward)
      this.thrust.draw(ctx, pageWidth, pageHeight)

    ctx.translate(-x, -y)
  }

  update(timeSince: number): void {
    const {
      controls: {forward, back, left, right},
    } = this.store

    const diff = timeSince / 1000

    if (left) {
      this.m.rotate(diff * this.m.turnSpeed)
    }
    if (right) {
      this.m.rotate(diff * -this.m.turnSpeed)
    }
    if (forward) {
      this.thrust.update(timeSince)

      this.m.addAcceleration(
        AccelerationType.thrust,
        scaleV2(this.m.direction, 5)
      )
    }
    if (back) {
      this.m.acceleration.delete(AccelerationType.thrust)
    }

    this.m.update(timeSince)
  }
}
