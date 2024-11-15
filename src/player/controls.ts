import {Store} from '../store/store'
import {MoverBoxes} from '../stats/boxes'

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
  // thrust = 0
  back = false
  // rotation = 0

  up = false
  left = false
  right = false

  // TODO: Put left, right and top here to track accurately.

  // mouseControls = new MouseControls(this.store, this)

  get rotation(): number {
    let rotation = 0
    if (this.left) rotation -= 4
    if (this.right) rotation += 4
    return rotation
  }

  get thrust(): number {
    if (this.up) return 0.9
    return 0
  }

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
          // this.thrust = 0.9
          this.up = true
          this.store.targetPos = null
          break
        case 's':
        case 'ArrowDown':
          this.back = true
          this.store.targetPos = null
          break
        case 'a':
        case 'ArrowLeft':
          this.left = true
          // this.rotation = -4
          this.store.targetPos = null
          break
        case 'd':
        case 'ArrowRight':
          this.right = true
          // this.rotation = 4
          this.store.targetPos = null
          break
        case ' ':
          this.store.gameObjects.player.weapon.startShooting()
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
          // this.thrust = 0
          this.up = false
          break
        case 's':
        case 'ArrowDown':
          this.back = false
          break
        case 'a':
        case 'ArrowLeft':
          this.left = false
          // this.rotation = 0
          break
        case 'd':
        case 'ArrowRight':
          this.right = false
          // this.rotation = 0
          break
        case ' ':
          this.store.gameObjects.player.weapon.stopShooting()
          break
      }
    })
  }
}
