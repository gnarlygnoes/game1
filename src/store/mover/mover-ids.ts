import {V2} from '../../data-types/v2'

const scale = 100_000_000

// Takes positive integer ids
// This will be inaccurate if given ids greater than about 88_000_000
// Todo: Look into a BigInt implementation (if needed)
export function store2Ids(a: number, b: number): number {
  return a * scale + b
}

export function unPackIds(id: number): V2 {
  const a = Math.floor(id / scale)
  const b = id % scale

  return [a, b]
}
