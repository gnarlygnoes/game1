import {Id} from '../../lib/cmp'
import {Panel} from './panel'

export class Asset {
  constructor(
    readonly id: Id,
    readonly width: number,
    readonly height: number,
    readonly panels: Panel[],
  ) {}
}
