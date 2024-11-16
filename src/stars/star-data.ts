import {V2} from '../data-types/v2'
import {Random} from '../lib/random'

export interface Star {
  v: V2
  size: number
  colour: string
}

export function generateStars(n: number): Star[] {
  return generateStarTile(n)
}

export function transformStars(stars: Star[], centre: V2, pos: V2) {
  // return rotateStars(moveStars(stars, pos), centre, angle)
  return moveStars(stars, pos)
}

export function moveStars(stars: Star[], pos: V2): Star[] {
  return stars.map(({v, size, colour}) => {
    return {
      v: shift(v, pos),
      size,
      colour,
    }
  })
}

function rotateStars(stars: Star[], centre: V2, angle: number): Star[] {
  return stars.map(({v, size, colour}) => {
    v = [...v]
    v[0] = v[0] - centre[0]
    v[1] = v[1] - centre[1]

    v = V2.rotate(v, angle)

    v[0] = v[0] + centre[0]
    v[1] = v[1] + centre[1]

    return {
      v,
      size,
      colour,
    }
  })
}

function shift(v: V2, amount: V2): V2 {
  return [wrap(v[0] - amount[0]), wrap(v[1] + amount[1])]
}

function wrap(n: number): number {
  if (n < 0) {
    return (n % 1) + 1
  }
  return n % 1
}

function generateStarTile(numStars: number): Star[] {
  const stars: Star[] = []

  const r = new Random(0)

  const next = () => r.next()

  for (let i = 0; i < numStars; i++) {
    stars.push({
      v: [next(), next()],
      size: next(),
      colour: `hsl(${Math.round(next() * 255)}, ${Math.round(
        next() * 20,
      )}%, ${Math.round(next() * 100)}%)`,
    })
  }

  return stars
}
