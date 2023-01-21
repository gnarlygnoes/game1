import {GameObjects} from './game-objects'
import {Controls} from '../player/controls'
import {Movers} from './mover/movers'
import {Camera} from '../camera'

export class Store {
  paused = false

  movers = new Movers()

  gameObjects = new GameObjects(this)

  controls = new Controls(this)

  camera: Camera

  constructor(width: number, height: number) {
    this.camera = new Camera(this, width, height)
  }
}
