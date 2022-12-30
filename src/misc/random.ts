export class Random {
  constructor(private seed: number) {
    if ((this.seed = (seed | 0) % 2147483647) <= 0) {
      this.seed += 2147483646
    }
  }

  nextInt(): number {
    return (this.seed = (this.seed * 48271) % 2147483647)
  }

  nextFloat(): number {
    return (this.nextInt() - 1) / 2147483646
  }
}
