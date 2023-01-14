import {Drawable, GameObject, Updatable} from '../data-types/data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Camera} from '../camera'
import {Asteroids} from '../objects/asteroids/asteroids'

export class GameObjects implements Updatable, Drawable {
  objects: GameObject[] = []

  player = new Player(this.store)
  stats = new Stats(this.store)

  constructor(public store: Store) {
    this.objects.push(new Stars(store), new Asteroids(store), this.stats)
  }

  update(timeSince: number, camera: Camera) {
    this.store.components.update(timeSince, camera)

    for (const o of this.objects) {
      o.update(timeSince, camera)
    }
  }

  draw(context: CanvasRenderingContext2D, camera: Camera): void {
    for (const o of this.objects) {
      o.draw(context, camera)
    }
  }
}
