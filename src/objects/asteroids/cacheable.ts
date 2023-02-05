import {makeCanvas} from '../../misc/util'

export class Cacheable {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  cached = false

  constructor(size: number) {
    const {ctx, canvas} = makeCanvas(size * 1.2, size * 1.2)

    this.ctx = ctx
    this.canvas = canvas
  }
}
