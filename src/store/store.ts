import {McStore} from './mc-store'
import {GameObjects} from './game-objects'

export interface Position {
  x: number
  y: number
}

export class Store {
  paused = false

  // $starsYPosition = 0
  // starsXPosition = 0

  gameObjects = new GameObjects(this)

  // $angle = 0

  mc = new McStore()
}
