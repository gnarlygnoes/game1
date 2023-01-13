import {GameObjects} from './game-objects'
import {Controls} from '../player/controls'
import {Components} from './components'

export class Store {
  paused = false

  components = new Components()

  gameObjects = new GameObjects(this)

  controls = new Controls(this)
}
