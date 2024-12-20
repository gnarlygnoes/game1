import {V2} from '../../data-types/v2'
import {Random} from '../../lib/random'
import {Camera} from '../../camera'
import {Mover} from '../../store/mover/mover'

const numParticles = 40

export class Thruster {
  particles: {position: V2}[] = []

  thrust = 1

  constructor(
    public pos: V2,
    public width: number,
    public height: number,
    public parent: Mover,
  ) {
    const r = new Random(0)

    for (let i = 0; i < numParticles; i++) {
      const y = r.next() * height

      const x = (r.next() - 0.5) * width

      this.particles.push({
        position: [x, y],
      })
    }
  }

  update(timeSince: number, thrust: number) {
    this.thrust = thrust

    for (const p of this.particles) {
      p.position[1] = (p.position[1] + timeSince * 0.05) % this.height
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    const {
      parent: {
        position: [px, py],
      },
      pos: [lx, ly],
      thrust,
    } = this

    const {
      shift: [xShift, yShift],
    } = camera

    for (const p of this.particles) {
      let [x, y] = p.position

      // x *= thrust
      y *= thrust

      ctx.fillStyle = `rgba(256, 256, 150, ${1 / (0.5 * y)})`

      let xPos = y > 4 ? x / (y / 4) : x

      ctx.fillRect(
        px + xShift + lx + xPos,
        py + yShift + ly + y,
        2 * (0.1 + thrust),
        2 * (0.1 + thrust),
      )
    }
  }
}
