import {GameObject} from '../../data-types/data-types'
import {Camera} from '../../camera'
import {Asteroid} from './asteroid'
import {Rand} from '../../misc/random'
import {Store} from '../../store/store'
import {nextEntityId} from '../../store/mover/movers'

export class Asteroids {
  // id = nextEntityId()

  // asteroids: Asteroid[] = []

  constructor(public store: Store) {
    const d = 9000
    const n = 1_000

    // const d = 300
    // const n = 6

    const {gameObjects} = store

    for (let i = 0; i < n; i++) {
      const a = new Asteroid(store, 10 + Rand.next() * 40, [
        -(d / 2) + Rand.next() * d,
        -(d / 2) + Rand.next() * d,
      ])

      gameObjects.objects.set(a.id, a)
    }
  }

  // draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
  //   this.asteroids.forEach(a => a.draw(ctx, camera))
  // }

  // update(timeSince: number, camera: Camera): void {
  //   // this.asteroids.forEach(a => a.update(timeSince, camera))
  // }
}
