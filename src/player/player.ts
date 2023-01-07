import {Mover} from '../store/mover'
import {GameObject} from '../data-types/data-types'
import {Store} from '../store/store'
import {addV2, emptyV2, scaleV2} from '../data-types/v2'
import {Thruster} from '../ships/parts/thruster'

export class Player implements GameObject {
  m = new Mover(emptyV2, [40, 40])

  shipImage = document.createElement('img')

  thrust = new Thruster(addV2(this.m.position, [-1.5, 19]), 8, 10, 0)

  constructor(public store: Store) {
    this.shipImage.src = require('./spaceShips_003.png')
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

    ctx.drawImage(this.shipImage, -size[0] / 2, -size[1] / 2, size[0], size[1])

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

      this.m.thrust = scaleV2(this.m.direction, 0.9)
    } else {
      this.m.thrust = emptyV2
    }

    if (back) {
      this.m.velocity = emptyV2
    }

    this.m.update(timeSince)
  }
}
