import {Drawable, GameObject, Updatable} from '../data-types/data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Camera} from '../camera'
import {Rand} from '../misc/random'
import {Asteroid} from '../objects/asteroids/asteroid'

export class GameObjects implements Updatable, Drawable {
  objects: Map<number, GameObject> = new Map()

  player = new Player(this.store)
  stats = new Stats(this.store)

  constructor(public store: Store) {
    const stars = new Stars(store)

    this.objects.set(stars.id, stars)
    this.objects.set(this.stats.id, this.stats)

    // new Asteroids(store)

    const d = 9000
    const n = 2_000

    // const d = 300
    // const n = 6

    for (let i = 0; i < n; i++) {
      const a = new Asteroid(store, 10 + Rand.next() * 40, [
        -(d / 2) + Rand.next() * d,
        -(d / 2) + Rand.next() * d,
      ])

      this.objects.set(a.id, a)
    }
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
