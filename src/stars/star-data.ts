import { Position } from "../store";

interface Star {
  x: number;
  y: number;
  size: number;
  colour: string;
}

export function generateStars() {
  const stars: Star[] = [];

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random(),
      colour: `hsl(${Math.round(Math.random() * 255)}, ${Math.round(
        Math.random() * 20
      )}%, ${Math.round(Math.random() * 100)}%)`,
    });
  }

  return stars;
}
