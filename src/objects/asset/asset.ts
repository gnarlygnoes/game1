import {Id} from '../../lib/cmp'

export class Asset {
  constructor(
    readonly id: Id,
    readonly width: number,
    readonly height: number,
    readonly panels: unknown[],
  ) {}
}
