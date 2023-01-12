import {GameObject} from '../../data-types/data-types'
import {Camera} from '../../camera'
import {Asteroid} from './asteroid'
import {Rand} from '../../misc/random'

export class Asteroids implements GameObject {
  asteroids: Asteroid[] = []

  constructor() {
    const d = 9000
    const n = 800

    for (let i = 0; i < n; i++) {
      this.asteroids.push(
        new Asteroid(5 + Rand.next() * 40, [
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
