import {Movers} from './movers'

export class Components {
  readonly len = 100_000

  ids = getInitialIds(this.len)

  movers = new Movers(this.len)

  getNextId = () => {
    return this.ids.shift()!
  }
}

function getInitialIds(num: number): number[] {
  const ids: number[] = []
  for (let i = 0; i < num; i++) {
    ids.push(i)
  }
  return ids
}
