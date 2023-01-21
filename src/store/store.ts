import {GameObjects} from './game-objects'
import {Controls} from '../player/controls'
import {Movers} from './mover/movers'

export class Store {
  paused = false

  movers = new Movers()

  gameObjects = new GameObjects(this)

  controls = new Controls(this)
}
