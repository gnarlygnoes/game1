import {Store} from '../store/store'
import {V2} from '../data-types/v2'

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
  forward = false
  back = false
  left = false
  right = false

  constructor(private store: Store) {
    addEventListener('keydown', e => {
      switch (e.key as UsedKeys) {
        case 'p':
          this.store.paused = !this.store.paused
          break
        case 'w':
        case 'ArrowUp':
          this.forward = true
          break
        case 's':
        case 'ArrowDown':
          this.back = true
          break
        case 'a':
        case 'ArrowLeft':
          this.left = true
          break
        case 'd':
        case 'ArrowRight':
          this.right = true
          break
      }
    })

    addEventListener('keyup', e => {
      switch (e.key as UsedKeys) {
        case 'r':
          this.store.gameObjects.player.m.position = V2.empty
          this.store.gameObjects.player.m.velocity = V2.empty
          break
        case 'p':
          break
        case 'w':
        case 'ArrowUp':
          this.forward = false
          break
        case 's':
        case 'ArrowDown':
          this.back = false
          break
        case 'a':
        case 'ArrowLeft':
          this.left = false
          break
        case 'd':
        case 'ArrowRight':
          this.right = false
          break
      }
    })
  }
}
