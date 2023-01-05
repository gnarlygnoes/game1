import {GameObject} from '../../data-types/data-types'
import {v2, V2} from '../../data-types/v2'
import {Random} from '../../misc/random'

const numParticles = 40

export class Thruster implements GameObject {
  particles: {colour: string; position: V2}[] = []

  constructor(
    public pos: V2,
    public width: number,
    public height: number,
    public angle: number
  ) {
    const r = new Random(0)

    for (let i = 0; i < numParticles; i++) {
      const y = r.nextFloat() * height

      const x = (r.nextFloat() - 0.5) * width

      this.particles.push({
        colour: `#ffff7755`,
        position: v2(x, y),
      })
    }
  }

  update(timeSince: number) {
    for (const p of this.particles) {
      p.position.y = (p.position.y + timeSince * 0.05) % this.height
    }
  }

  draw(ctx: CanvasRenderingContext2D, pageWidth: number, pageHeight: number) {
    for (const p of this.particles) {
      const {x, y} = p.position

      ctx.fillStyle = `rgba(256, 256, 150, ${1 / (0.5 * y)})`
      let xPos = y > 4 ? x / (y / 4) : x

      ctx.fillRect(this.pos.x + xPos, this.pos.y + y, 2, 2)
    }
  }
}
