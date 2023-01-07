import {Drawable, GameObject, Updatable} from '../data-types/data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Asteroid} from '../objects/asteroids/asteroid'
import {v2} from '../data-types/v2'

export class GameObjects implements Updatable, Drawable {
  player = new Player(this.store)

  objects: GameObject[] = []

  stats = new Stats(this.store)

  constructor(public store: Store) {
    const stars = new Stars(store)

    const a = new Asteroid(20, v2(300, 300))
    const a2 = new Asteroid(16, v2(280, 420))

    this.objects.push(stars, this.player, this.stats, a, a2)
  }

  update(timeSince: number) {
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
