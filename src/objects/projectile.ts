import {Store} from '../store/store'
import {V2} from '../data-types/v2'
import {Mover} from '../store/mover/mover'
import {Camera} from '../camera'
import {GoType} from '../data-types/data-types'
import {GO} from '../store/game-objects'

const size = 4

export class Projectile {
  id: number

  type = GoType.weapon as const

  constructor(public store: Store, side: 'left' | 'right') {
    const {
      movers,
      gameObjects: {
        player: {m: pm},
      },
    } = store

    let p = pm.center

    if (side === 'left') {
      const angle = V2.angle(pm.direction)
      p = V2.add(p, V2.rotate([-10, -6], angle))
    } else {
      const angle = V2.angle(pm.direction)
      p = V2.add(p, V2.rotate([10, -6], angle))
    }

    const m = new Mover(
      p,
      [size, size],
      pm.direction,
      V2.add(pm.velocity, V2.scale(pm.direction, 10)),
      V2.empty,
      0,
      1,
      100
    )

    this.id = m.id
    movers.add(m)
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const m = this.store.movers.get(this.id)
    if (!m) return

    const {
      position: [x, y],
    } = m

    const {
      shift: [xShift, yShift],
    } = camera

    ctx.fillStyle = '#ffc916'
    ctx.beginPath()
    ctx.arc(x + xShift, y + yShift, size / 1.3, 0, 2 * Math.PI)
    ctx.fill()
  }

  update(timeSince: number, camera: Camera): void {
    const m = this.store.movers.get(this.id)
    if (!m) return

    if (!m.visible) {
      this.store.gameObjects.delete(this.id)
    }
  }

  hit(other: GO) {
    if (other.type === GoType.object) {
      this.store.gameObjects.delete(other.id)
      this.store.gameObjects.delete(this.id)
    }
  }
}
