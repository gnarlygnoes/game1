import {Drawable, GameObject, Updatable} from '../data-types/data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Camera} from '../camera'
import {Asteroids} from '../objects/asteroids/asteroids'

export class GameObjects implements Updatable, Drawable {
  objects: Map<number, GameObject> = new Map()

  player = new Player(this.store)
  stats = new Stats(this.store)

  constructor(public store: Store) {
    const stars = new Stars(store)
    const asteroids = new Asteroids(store)

    this.objects.set(stars.id, stars)
    this.objects.set(asteroids.id, asteroids)
    this.objects.set(this.stats.id, this.stats)
  }

  update(timeSince: number, camera: Camera) {
    this.store.movers.update(timeSince, camera)

    for (const o of this.objects.values()) {
      o.update(timeSince, camera)
    }
  }

  draw(context: CanvasRenderingContext2D, camera: Camera): void {
    for (const o of this.objects.values()) {
      o.draw(context, camera)
    }
  }

  delete(id: number) {
    //
  }
}
