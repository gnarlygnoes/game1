import {emptyV2} from './data-types/v2'
import {Store} from './store/store'
import {Updatable} from './data-types/data-types'

export class Camera implements Updatable {
  position = emptyV2
  zoom = 1
  angle = 0

  constructor(private store: Store) {}

  update(timeSince: number): void {
    this.position = {...this.store.gameObjects.player.m.position}
  }

  cameraTransform = () => {
    //
  }
}

export function transformObjects() {}
