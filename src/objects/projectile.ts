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

  damage = 7
  health = 1

  constructor(
    public store: Store,
    public origin: Mover,
    public originId: number,
    side: 'left' | 'right'
  ) {
    const {movers, gameObjects} = store

    let p = origin.center

    if (side === 'left') {
      const angle = V2.angle(origin.direction)
      p = V2.add(p, V2.rotate([-10, -6], angle))
    } else {
      const angle = V2.angle(origin.direction)
      p = V2.add(p, V2.rotate([10, -6], angle))
    }

    const m = new Mover(
      p,
      [size, size],
      origin.direction,
      V2.add(origin.velocity, V2.scale(origin.direction, 10)),
      V2.empty,
      0,
      1,
      100
    )

    this.id = m.id
    movers.add(m)
    gameObjects.add(this)
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
    if (other.type !== GoType.visual && other.id !== this.originId) {
      other.health -= this.damage

      this.store.gameObjects.delete(this.id)

      if (other.health <= 0) {
        this.store.gameObjects.delete(other.id)
      }
    }
  }
}
