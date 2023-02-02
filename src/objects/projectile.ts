import {Store} from '../store/store'
import {V2} from '../data-types/v2'
import {Mover} from '../store/mover/mover'
import {Camera} from '../camera'

export class Projectile {
  id: number

  constructor(public store: Store) {
    const {
      movers,
      gameObjects: {
        player: {m: playerMover},
      },
    } = store

    const m = new Mover(
      V2.add(playerMover.position, V2.scale(playerMover.size, 0.5)),
      [5, 5],
      playerMover.direction,
      V2.add(playerMover.velocity, V2.scale(playerMover.direction, 5))
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
    ctx.arc(x + xShift, y + yShift, 5, 0, 2 * Math.PI)
    ctx.fill()
  }

  update() {
    const m = this.store.movers.get(this.id)
    if (!m) return

    if (!m.visible) {
      this.store.gameObjects.objects.delete(m.id)
      this.store.movers.delete(m.id)
    }
  }
}
