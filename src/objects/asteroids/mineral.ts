import {Camera} from '../../camera'
import {chase} from '../chase'
import {GoType} from '../../data-types/data-types'
import {AsteroidBase} from './asteroid-base'
import {GO} from '../../store/game-objects'

export class Mineral extends AsteroidBase {
  type = GoType.pickup as const

  health = Infinity

  update(timeSince: number, camera: Camera) {
    chase(this.m, this.store.gameObjects.player.m.center, 2)
  }

  hit(other: GO) {
    if (other.type === GoType.player) {
      this.terminate()
    }
  }
}
