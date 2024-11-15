export class Input {
  constructor(
    public readonly code: string,
    public position = 0,
    public attemptedPosition = 0,
    public readonly len = code.length,
  ) {}

  advance(): void {
    this.setPosition(this.position + 1)
  }

  advanceBy(num: number): void {
    this.setPosition(this.position + num)
  }

  setPosition(pos: number): void {
    if (pos > this.attemptedPosition) this.attemptedPosition = pos

    this.position = pos
  }

  nextChar(): string {
    return this.code[this.position]
  }

  endOfInput(): boolean {
    return (
      this.position === this.code.length ||
      this.attemptedPosition === this.code.length
    )
  }

  rest(): string {
    return this.code.slice(this.position)
  }

  unParsed(): string {
    return this.code.slice(this.attemptedPosition)
  }

  successfullyParsed(): string {
    return this.code.slice(0, this.attemptedPosition)
  }
}
