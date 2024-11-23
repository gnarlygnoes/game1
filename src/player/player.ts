import {Mover} from '../store/mover/mover'
import {Store} from '../store/store'
import {V2} from '../data-types/v2'
import {Thruster} from '../objects/ships/thruster'
import {Camera} from '../camera'
import {MoverBoxes} from '../stats/boxes'
import {GoType} from '../data-types/data-types'
import {Weapon} from '../objects/weapon'
import spaceShip from './spaceShips_003.png'

export class Player {
  id: number
  type = GoType.player as const

  health = 1000
  shipImage = __VITEST__ ? {src: ''} as HTMLImageElement : document.createElement('img')

  m: Mover
  thruster: Thruster
  weapon: Weapon

  constructor(public store: Store) {
    if (!__VITEST__) {
      this.shipImage.src = spaceShip
    }

    const {movers} = store
    this.m = new Mover(V2.empty, [40, 40], [0, -1])
    this.m.mass = 5
    this.id = this.m.id

    movers.add(this.m)

    this.weapon = new Weapon(store, this.m, this.id, 12)

    this.thruster = new Thruster(
      V2.add(this.m.position, [19, 38]),
      8,
      10,
      this.m,
    )
  }

  update(timeSince: number): void {
    const {
      controls: {thrust, rotation, back},
    } = this.store

    // mouseControls.update()
    this.weapon.update(timeSince)

    const {m} = this

    m.rotation = rotation

    if (thrust > 0) {
      this.thruster.update(timeSince, thrust)
      m.thrust = V2.scale(m.direction, thrust / 1.5)
    } else {
      m.thrust = V2.empty
    }
    if (back) {
      m.velocity = V2.empty
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const {
      m,
      m: {
        position: [xi, yi],
        size: [w, h],
      },
    } = this

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

    if (!__VITEST__) {
      ctx.drawImage(this.shipImage, x, y, w, h)
    }

    if (this.store.controls.thrust > 0) this.thruster.draw(ctx, camera)

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

  terminate() {
    this.store.gameObjects.delete(this.id)
  }
}
