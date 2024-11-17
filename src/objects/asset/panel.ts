import {V2} from '../../data-types/v2'

export class Panel {
  constructor(
    readonly points: V2[],
    readonly centre: V2,
    readonly fill: string,
  ) {}
}
