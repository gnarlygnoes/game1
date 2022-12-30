import {rotateV2, v2, V2} from '../data-types/v2'
import {Random} from '../misc/random'

export interface Star {
  v: V2
  size: number
  colour: string
}

export function generateStars(): Star[] {
  return generateStarTile(100)
}

export function transformStars(
  stars: Star[],
  centre: V2,
  pos: V2,
  angle: number
) {
  return rotateStars(
    stars.map(({v, size, colour}) => {
      return {
        v: shift(v, pos),
        size,
        colour,
      }
    }),
    centre,
    pos,
    angle
  )
}

export function rotateStars(
  stars: Star[],
  centre: V2,
  location: V2,
  angle: number
): Star[] {
  return stars.map(({v, size, colour}) => {
    v = v2(v.x, v.y)
    v.x = v.x - centre.x
    v.y = v.y - centre.y
    v = rotateV2(v, angle)
    v.x = v.x + centre.x
    v.y = v.y + centre.y

    return {
      v,
      size,
      colour,
    }
  })
}

function shift(v: V2, amount: V2) {
  return {
    x: wrap(v.x + amount.x),
    y: wrap(v.y + amount.y),
  }
}

function wrap(n: number): number {
  if (n < 0) {
    return (n % 1) + 1
  }
  return n % 1
}

function generateStarTile(numStars: number = 100): Star[] {
  const stars: Star[] = []

  const r = new Random(0)

  // const next = () => Math.random()
  const next = () => r.nextFloat()

  for (let i = 0; i < numStars; i++) {
    stars.push({
      v: {x: next(), y: next()},
      size: next(),
      colour: `hsl(${Math.round(next() * 255)}, ${Math.round(
        next() * 20
      )}%, ${Math.round(next() * 100)}%)`,
    })
  }

  return stars
}
