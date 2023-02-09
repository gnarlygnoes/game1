import {Camera} from '../../camera'
import {GoType} from '../../data-types/data-types'
import {V2} from '../../data-types/v2'
import {MoverBoxes} from '../../stats/boxes'
import {Mover} from '../../store/mover/mover'
import {Store} from '../../store/store'

export class EnemyShip {
  id: number
  m: Mover
  health = 30

  type = GoType.enemy as const

  shipImage = document.createElement('img')

  constructor(public store: Store, pos: V2) {
    const {movers} = store

    this.m = new Mover(pos, [40, 40])
    this.m.mass = 5
    this.id = this.m.id
    movers.add(this.m)

    if (!__JEST__) {
      this.shipImage.src = require('../../player/spaceShips_003.png')
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const {m} = this
    if (!m) return

    const {
      position: [xi, yi],
      size: [w, h],
    } = m

    const {
      shift: [xShift, yShift],
    } = camera

    const angle = V2.angle(m.direction)
    const w2 = w / 2
    const h2 = h / 2

    const x = xShift + xi
    const y = yShift + yi

    ctx.save()
    ctx.translate(x + w2, y + h2)
    ctx.rotate(angle)
    ctx.translate(-x - w2, -y - h2)

    ctx.filter = `invert(1) contrast(0.8) brightness(1.5)`
    ctx.drawImage(this.shipImage, x, y, w, h)

    // if (this.store.controls.thrust > 0) this.thruster.draw(ctx, camera)

    ctx.restore()

    MoverBoxes.draw(ctx, m, camera)
  }

  update(timeSince: number, camera: Camera) {}
}
