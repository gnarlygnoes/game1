import {GameObjects} from './game-objects'
import {Controls} from '../player/controls'
import {Movers} from './mover/movers'
import {Camera} from '../camera'
import {V2RO} from '../data-types/v2'

export class Store {
  targetPos: V2RO | null = null

  paused = false

  movers = new Movers()
  // movers2 = new Movers2()

  gameObjects = new GameObjects(this)

  controls = new Controls(this)

  camera: Camera

  constructor(width: number, height: number) {
    this.camera = new Camera(this, width, height)
  }
}
