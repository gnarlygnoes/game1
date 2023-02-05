import {Mover} from '../store/mover/mover'
import {Store} from '../store/store'
import {V2} from '../data-types/v2'
import {Thruster} from '../ships/parts/thruster'
import {Camera} from '../camera'
import {MoverBoxes} from '../stats/boxes'
import {assert} from '../misc/util'
import {Projectile} from '../objects/projectile'
import {GoType} from '../data-types/data-types'

export class Player {
  id: number

  type = GoType.player as const

  shipImage = document.createElement('img')

  thruster: Thruster

  private shooting = false

  constructor(public store: Store) {
    if (!__JEST__) {
      this.shipImage.src = require('./spaceShips_003.png')
    }

    const {movers} = store
    const m = new Mover(V2.empty, [40, 40], [0, -1])
    m.mass = 5
    this.id = m.id

    movers.add(m)

    this.thruster = new Thruster(V2.add(m.position, [19, 38]), 8, 10, m)
  }

  update(timeSince: number): void {
    const {
      controls: {thrust, rotation, back},
    } = this.store

    this.lastShot += timeSince
    if (this.shooting && this.lastShot > this.timeBetweenShots) {
      this.shoot()
    }

    const {movers} = this.store

    const m = movers.get(this.id)

    if (!m) return

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

    ctx.drawImage(this.shipImage, x, y, w, h)

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

  get m(): Mover {
    const {movers} = this.store

    const m = movers.get(this.id)

    assert(m)

    return m
  }

  startShooting() {
    this.shooting = true
  }
  stopShooting() {
    this.shooting = false
  }

  lastShot = 0
  readonly timeBetweenShots = 100

  shoot() {
    const p = new Projectile(this.store)

    this.store.gameObjects.objects.set(p.id, p)

    this.lastShot = 0
  }
}
