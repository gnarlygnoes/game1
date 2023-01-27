import {Store} from '../store/store'
import {MoverBoxes} from '../stats/boxes'
import {TouchControls} from './touch-controls'

type UsedKeys =
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'w'
  | 'a'
  | 's'
  | 'd'
  | 'p'
  | unknown

export class Controls {
  // 0 - 1
  thrust = 0
  back = false
  rotation = 0

  constructor(private store: Store) {
    new TouchControls(this)

    addEventListener('keydown', e => {
      switch (e.key as UsedKeys) {
        case 'p':
          this.store.paused = !this.store.paused
          break
        case 'b':
          MoverBoxes.enable(!MoverBoxes.enabled)
          break
        case 'w':
        case 'ArrowUp':
          this.thrust = 0.9
          break
        case 's':
        case 'ArrowDown':
          this.back = true
          break
        case 'a':
        case 'ArrowLeft':
          this.rotation = -4
          break
        case 'd':
        case 'ArrowRight':
          this.rotation = 4
          break
      }
    })

    addEventListener('keyup', e => {
      switch (e.key as UsedKeys) {
        case 'r':
          this.store.gameObjects.player.resetPosition()
          break
        case 'p':
          break
        case 'w':
        case 'ArrowUp':
          this.thrust = 0
          break
        case 's':
        case 'ArrowDown':
          this.back = false
          break
        case 'a':
        case 'ArrowLeft':
          this.rotation = 0
          break
        case 'd':
        case 'ArrowRight':
          this.rotation = 0
          break
      }
    })
  }
}
