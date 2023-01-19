export function makeMoversArray(numElements: number): Float64Array {
  return new Float64Array(numElements * MoverField.size)
}

enum MoverField {
  // position
  px,
  py,

  // size
  sx,
  sy,

  // direction
  dx,
  dy,

  // velocity
  vx,
  vy,

  // thrust
  tx,
  ty,

  rotation,
  maxVelocity,
  visible,

  deleted,
  size,
}

export class MoverView {
  constructor(public data: Float64Array, public id: number) {}

  get px(): number {
    return this.data[this.id * MoverField.size + MoverField.px]
  }
  set px(value: number) {
    this.data[this.id * MoverField.size + MoverField.px] = value
  }

  get py(): number {
    return this.data[this.id * MoverField.size + MoverField.py]
  }
  set py(value: number) {
    this.data[this.id * MoverField.size + MoverField.py] = value
  }

  get sx(): number {
    return this.data[this.id * MoverField.size + MoverField.sx]
  }
  get sy(): number {
    return this.data[this.id * MoverField.size + MoverField.sy]
  }
  get dx(): number {
    return this.data[this.id * MoverField.size + MoverField.dx]
  }
  get dy(): number {
    return this.data[this.id * MoverField.size + MoverField.dy]
  }
  get vx(): number {
    return this.data[this.id * MoverField.size + MoverField.vx]
  }
  get vy(): number {
    return this.data[this.id * MoverField.size + MoverField.vy]
  }
  get tx(): number {
    return this.data[this.id * MoverField.size + MoverField.tx]
  }
  get ty(): number {
    return this.data[this.id * MoverField.size + MoverField.ty]
  }
  get rotation(): number {
    return this.data[this.id * MoverField.size + MoverField.rotation]
  }
  get maxVelocity(): number {
    return this.data[this.id * MoverField.size + MoverField.maxVelocity]
  }
  get visible(): number {
    return this.data[this.id * MoverField.size + MoverField.visible]
  }
}
