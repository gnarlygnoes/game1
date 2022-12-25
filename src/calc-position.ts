import {Position} from './store/store'

export function calcPosition(
  from: Position,
  to: Position,
  progress: number
): Position {
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
  }
}

export function calcProgress(
  from: Position,
  to: Position,
  elapsed: number
): number {
  const distance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2)

  const distanceMoved = speed(elapsed) * elapsed

  return Math.min(distanceMoved / distance, 1)
}

function speed(currentTime: number) {
  // if (currentTime > endTime) return 0;

  // if (currentTime < 300) {
  //   return (currentTime / 300) * 0.5;
  // }
  // } else if (endTime - currentTime < 500) {
  //   return ((endTime - currentTime) / 500) * 0.5;
  // }

  return 0.5
}
