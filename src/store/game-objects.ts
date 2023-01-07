import {Drawable, GameObject, Updatable} from '../data-types/data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Asteroid} from '../objects/asteroids/asteroid'
import {Camera} from '../camera'

export class GameObjects implements Updatable, Drawable {
  objects: GameObject[] = []

  player = new Player(this.store)
  stats = new Stats(this.store)

  camera = new Camera(this.store)

  constructor(public store: Store) {
    this.objects.push(
      new Stars(store),
      this.player,
      this.stats
      // new Asteroid(20, [300, 300]),
      // new Asteroid(16, [280, 420])
    )
  }

  update(timeSince: number) {
    this.camera.update(timeSince)

    for (const o of this.objects) {
      o.update(timeSince)
    }
  }

  draw(
    context: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    for (const o of this.objects) {
      o.draw(context, pageWidth, pageHeight)
    }
  }
}
