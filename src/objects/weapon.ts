import {Mover} from '../store/mover/mover'
import {Store} from '../store/store'
import {Projectile} from './projectile'

export class Weapon {
  private shooting = false
  private lastShot = 0
  readonly timeBetweenShots = 10

  constructor(
    public store: Store,
    public origin: Mover,
    public originId: number,
    public damage: number
  ) {}

  update(timeSince: number) {
    this.lastShot += timeSince
    if (this.shooting && this.lastShot > this.timeBetweenShots) {
      this.shoot()
    }
  }

  startShooting() {
    this.shooting = true
  }
  stopShooting() {
    this.shooting = false
  }

  shoot() {
    new Projectile(this.store, this.origin, this.originId, 'left', this.damage)
    new Projectile(this.store, this.origin, this.originId, 'right', this.damage)

    this.lastShot = 0
  }
}
