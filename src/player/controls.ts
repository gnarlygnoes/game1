import {Store} from '../store/store'
import {MoverBoxes} from '../stats/boxes'
import {TouchControls2} from './touch-controls2'
import {MouseControls} from './mouse-controls'

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

  mouseControls = new MouseControls(this.store, this)

  constructor(private store: Store) {
    // new TouchControls2(store, this)

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
          this.store.targetPos = null
          break
        case 's':
        case 'ArrowDown':
          this.back = true
          this.store.targetPos = null
          break
        case 'a':
        case 'ArrowLeft':
          this.rotation = -4
          this.store.targetPos = null
          break
        case 'd':
        case 'ArrowRight':
          this.rotation = 4
          this.store.targetPos = null
          break
        case ' ':
          this.store.gameObjects.player.startShooting()
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
        case ' ':
          this.store.gameObjects.player.stopShooting()
          break
      }
    })
  }
}
