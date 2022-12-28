import {GameObjects} from './game-objects'

export class Store {
  paused = false

  gameObjects = new GameObjects(this)
}
