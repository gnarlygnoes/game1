import {Camera} from '../../camera'
import {GoType} from '../../data-types/data-types'
import {V2} from '../../data-types/v2'
import {MoverBoxes} from '../../stats/boxes'
import {getPositionInFuture, Mover} from '../../store/mover/mover'
import {Store} from '../../store/store'
import {chaseShip, matchVelocity, similarVelocity} from '../chase'
import {Projectile} from '../projectile'
import {Weapon} from '../weapon'
import shipUrl from '../../player/spaceShips_003.png'

export class EnemyShip {
  id: number
  m: Mover
  health = 100

  weapon: Weapon

  type = GoType.enemy as const

  shipImage = document.createElement('img')

  constructor(public store: Store, pos: V2) {
    const {movers} = store

    this.m = new Mover(pos, [40, 40], [1, 0])
    this.m.mass = 5
    this.id = this.m.id
    movers.add(this.m)

    this.weapon = new Weapon(store, this.m, this.id, 7)

    if (!__VITEST__) {
      this.shipImage.src = shipUrl
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

    ctx.restore()

    MoverBoxes.draw(ctx, m, camera)
  }

  update(timeSince: number, camera: Camera) {
    const {m: pm, health} = this.store.gameObjects.player
    const {m} = this
    this.weapon.update(timeSince)

    const distance = V2.distance(pm.position, m.position)

    if (health <= 0) {
      this.weapon.stopShooting()
      return
    }

    if (distance < 200) {
      if (similarVelocity(m, pm)) {
        const time = distance / Projectile.velocity
        const targetPosition = getPositionInFuture(pm, time)

        m.direction = V2.limitMagnitude(
          V2.subtract(targetPosition, m.position),
          1
        )
        this.weapon.startShooting()
      } else {
        matchVelocity(m, pm)
        this.weapon.stopShooting()
      }
    } else if (distance < 400) {
      const time = distance / Projectile.velocity
      const targetPosition = getPositionInFuture(pm, time)

      m.direction = V2.limitMagnitude(
        V2.subtract(targetPosition, m.position),
        1
      )
      this.weapon.startShooting()
    } else if (distance < 8000) {
      this.weapon.stopShooting()
      chaseShip(m, pm)
    } else {
      this.weapon.stopShooting()
    }
  }

  terminate() {
    this.store.gameObjects.delete(this.id)
  }
}
