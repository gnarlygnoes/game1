import {Drawable, Updatable} from '../data-types/data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'

export class GameObjects implements Updatable, Drawable {
  player = new Player(this.store)

  drawable: Drawable[] = [new Stars(this.store)]
  updatable: Updatable[] = []

  constructor(public store: Store) {
    const stars = new Stars(store)
    const stats = new Stats(store)

    this.updatable.push(stars, this.player, stats)
    this.drawable.push(stars, this.player, stats)
  }

  update(timeSince: number) {
    for (const u of this.updatable) {
      u.update(timeSince)
    }
  }

  draw(
    context: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    for (const d of this.drawable) {
      d.draw(context, pageWidth, pageHeight)
    }
  }
}
