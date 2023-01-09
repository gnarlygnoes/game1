import {Mover} from '../store/mover'
import {GameObject} from '../data-types/data-types'
import {Store} from '../store/store'
import {addV2, emptyV2, scaleV2} from '../data-types/v2'
import {Thruster} from '../ships/parts/thruster'
import {Camera} from '../camera'

export class Player implements GameObject {
  m = new Mover(emptyV2, [40, 40])

  shipImage = document.createElement('img')

  thruster = new Thruster(addV2(this.m.position, [19, 38]), 8, 10, this.m)

  constructor(public store: Store) {
    this.shipImage.src = require('./spaceShips_003.png')
  }

  update(timeSince: number): void {
    const {
      controls: {forward, back, left, right},
    } = this.store

    const diff = timeSince / 1000

    if (left) {
      this.m.rotate(diff * -this.m.turnSpeed)
    }
    if (right) {
      this.m.rotate(diff * this.m.turnSpeed)
    }

    if (forward) {
      this.thruster.update(timeSince)
      this.m.thrust = scaleV2(this.m.direction, 0.9)
    } else {
      this.m.thrust = emptyV2
    }

    if (back) {
      this.m.velocity = emptyV2
    }

    this.m.update(timeSince)
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const {m} = this

    const {
      position: [xi, yi],
      size: [w, h],
    } = m

    const {
      shift: [xShift, yShift],
    } = camera

    const x = Math.round(xShift + xi)
    const y = Math.round(yShift + yi)

    const angle = m.getAngle()

    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(angle)
    ctx.translate(-x - w / 2, -y - h / 2)

    ctx.drawImage(this.shipImage, x, y, w, h)

    if (this.store.controls.forward) this.thruster.draw(ctx, camera)

    ctx.restore()
  }
}

// TODO: Try get this working without the save and restore.
// (Apparently save and restore is slow)
function slowDrawImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  angle = 0
) {
  ctx.save()
  ctx.translate(x + w / 2, y + h / 2)
  ctx.rotate(angle)
  ctx.translate(-x - w / 2, -y - h / 2)
  ctx.drawImage(img, x, y, w, h)
  ctx.restore()
}
