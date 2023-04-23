import {Asteroid} from './asteroid'
import {Camera} from '../../camera'
import {chase} from '../chase'

export class Mineral extends Asteroid {
  update(timeSince: number, camera: Camera) {
    chase(this.m, this.store.gameObjects.player.m.position)
  }
}
