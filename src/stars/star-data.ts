export interface Star {
  x: number
  y: number
  size: number
  colour: string
}

export function generateStars(): Star[] {
  return [
    ...generateStarTile(1000, 0),
    // ...generateStarTile(200, 1),
    // ...generateStarTile(300, 2),
  ]
}

function generateStarTile(numStars: number = 100, yShift: number = 0): Star[] {
  const stars: Star[] = []

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random() + yShift,
      size: Math.random(),
      colour: `hsl(${Math.round(Math.random() * 255)}, ${Math.round(
        Math.random() * 20
      )}%, ${Math.round(Math.random() * 100)}%)`,
    })
  }

  return stars
}
