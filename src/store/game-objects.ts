import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Camera} from '../camera'
import {initAsteroids} from '../objects/asteroids/asteroids'
import {Asteroid} from '../objects/asteroids/asteroid'
import {Projectile} from '../objects/projectile'

export type GO = Player | Stats | Stars | Asteroid | Projectile

export class GameObjects {
  objects: Map<number, GO> = new Map()

  player = new Player(this.store)
  stats = new Stats(this.store)

  constructor(public store: Store) {
    const stars = new Stars(store)

    this.objects.set(stars.id, stars)

    initAsteroids(store, this.objects)

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

  delete(id: number): void {
    this.store.movers.delete(id)
    this.objects.delete(id)
  }
}
