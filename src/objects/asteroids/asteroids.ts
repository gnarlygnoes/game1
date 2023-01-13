import {GameObject} from '../../data-types/data-types'
import {Camera} from '../../camera'
import {Asteroid, Asteroid2} from './asteroid'
import {Rand} from '../../misc/random'
import {Store} from '../../store/store'

export class Asteroids implements GameObject {
  asteroids: Asteroid2[] = []

  constructor(public store: Store) {
    const d = 9000
    const n = 1_000

    const {components} = store

    for (let i = 0; i < n; i++) {
      // this.asteroids.push(
      //   new Asteroid(5 + Rand.next() * 40, [
      //     -(d / 2) + Rand.next() * d,
      //     -(d / 2) + Rand.next() * d,
      //   ])
      // )

      this.asteroids.push(
        new Asteroid2(store, components.getNextId(), 5 + Rand.next() * 40, [
          -(d / 2) + Rand.next() * d,
          -(d / 2) + Rand.next() * d,
        ])
      )
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    this.asteroids.forEach(a => a.draw(ctx, camera))
  }

  update(timeSince: number): void {
    this.asteroids.forEach(a => a.update(timeSince))
  }
}
