import {Mover} from '../store/mover/mover'
import {Entity, GameObject} from '../data-types/data-types'
import {Store} from '../store/store'
import {V2} from '../data-types/v2'
import {Thruster} from '../ships/parts/thruster'
import {Camera} from '../camera'
import {MoverBoxes} from '../stats/boxes'

export class Player implements GameObject, Entity {
  id: number

  shipImage = document.createElement('img')

  thruster: Thruster

  constructor(public store: Store) {
    this.shipImage.src = require('./spaceShips_003.png')

    const {movers} = store
    const m = new Mover(V2.empty, [40, 40], [0, -1])
    this.id = m.id

    movers.add(m)

    this.thruster = new Thruster(V2.add(m.position, [19, 38]), 8, 10, m)
  }

  update(timeSince: number): void {
    const {
      controls: {forward, back, left, right},
    } = this.store

    const {movers} = this.store

    const m = movers.get(this.id)

    if (!m) return

    if (left) {
      m.rotation = -4
    } else if (right) {
      m.rotation = 4
    } else {
      m.rotation = 0
    }
    if (forward) {
      this.thruster.update(timeSince)
      m.thrust = V2.scale(m.direction, 0.9)
    } else {
      m.thrust = V2.empty
    }
    if (back) {
      m.velocity = V2.empty
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const {movers} = this.store
    const m = movers.get(this.id)
    if (!m) return

    const {
      position: [xi, yi],
      size: [w, h],
    } = m

    const {
      shift: [xShift, yShift],
    } = camera

    const x = xShift + xi
    const y = yShift + yi

    const angle = V2.angle(m.direction)

    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(angle)
    ctx.translate(-x - w / 2, -y - h / 2)

    ctx.drawImage(this.shipImage, x, y, w, h)

    if (this.store.controls.forward) this.thruster.draw(ctx, camera)

    ctx.restore()

    MoverBoxes.draw(ctx, m, camera)
  }

  resetPosition(): void {
    const {movers} = this.store

    const m = movers.get(this.id)

    if (!m) return

    m.position = V2.empty
    m.velocity = V2.empty
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
