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

  constructor(public store: Store) {
    const {
      movers,
      gameObjects: {
        player: {m: playerMover},
      },
    } = store

    const m = new Mover(
      V2.add(playerMover.position, V2.scale(playerMover.size, 0.5)),
      [size, size],
      playerMover.direction,
      V2.add(playerMover.velocity, V2.scale(playerMover.direction, 10)),
      V2.empty,
      0,
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

    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(x + xShift, y + yShift, size, 0, 2 * Math.PI)
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
