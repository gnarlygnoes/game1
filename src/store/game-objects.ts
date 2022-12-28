import {Drawable, Updatable} from './data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'

export class GameObjects implements Updatable, Drawable {
  drawable: Drawable[] = [new Stars(this.store)]
  updatable: Updatable[] = []

  constructor(public store: Store) {
    const stars = new Stars(store)
    const player = new Player()

    this.updatable.push(stars, player)
    this.drawable.push(stars, player)
  }

  update(now: number, last: number) {
    for (const u of this.updatable) {
      u.update(now, last)
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
