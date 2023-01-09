import {Mover} from '../store/mover'
import {GameObject} from '../data-types/data-types'
import {Store} from '../store/store'
import {addV2, emptyV2, scaleV2} from '../data-types/v2'
import {Thruster} from '../ships/parts/thruster'
import {Camera, MoverPixels} from '../camera'

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
    pageHeight: number,
    camera: Camera
  ): void {
    const {
      m,
      // m: {
      //   size: [w, h],
      //   position: [x, y],
      // },
    } = this

    const wx = pageWidth / 2
    const wy = pageHeight / 2

    const {
      position: [x, y],
      size: [w, h],
    } = camera.cameraTransform(m)

    const angle = Math.PI + m.getAngle()

    // slowDrawImage(ctx, this.shipImage, wx - w / 2, wy - h / 2, w, h, angle)

    ctx.save()
    ctx.translate(wx + w / 2, wy + h / 2)
    ctx.rotate(angle)
    ctx.translate(-wx - w / 2, -wy - h / 2)

    ctx.drawImage(this.shipImage, wx, wy, w, h)

    if (this.store.controls.forward)
      this.thrust.draw(ctx, pageWidth, pageHeight)

    ctx.restore()
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
