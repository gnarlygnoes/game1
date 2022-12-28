import {Mover} from '../store/mover'
import {GameObject, v2} from '../store/data-types'

export class Player implements GameObject {
  m = new Mover(1, v2(innerWidth / 2, innerHeight * 0.9))

  draw(
    context: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    //
  }

  update(now: number, last: number): void {
    this.m.update(now, last)
  }
}
