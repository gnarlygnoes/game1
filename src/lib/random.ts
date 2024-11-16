export class Random {
  constructor(private seed: number) {
    if ((this.seed = (seed | 0) % 2147483647) <= 0) {
      this.seed += 2147483646
    }
  }

  private nextInt(): number {
    return (this.seed = (this.seed * 48271) % 2147483647)
  }

  next(): number {
    return (this.nextInt() - 1) / 2147483646
  }
}

export const Rand = new Random(0)
