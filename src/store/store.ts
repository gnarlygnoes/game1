import {GameObjects} from './game-objects'
import {Controls} from '../player/controls'

export class Store {
  paused = false

  gameObjects = new GameObjects(this)

  controls = new Controls(this)
}
