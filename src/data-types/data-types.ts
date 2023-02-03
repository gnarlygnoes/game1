import {Camera} from '../camera'

export interface Updatable {
  update(timeSince: number, camera: Camera): void
}

export interface Drawable {
  draw(ctx: CanvasRenderingContext2D, camera: Camera): void
}

export interface Entity {
  id: number
}

// export interface GameObject extends Updatable, Drawable {
//   type: GoType
// }

export enum GoType {
  weapon,
  player,
  object,
  visual,
}
