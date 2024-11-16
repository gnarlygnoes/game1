export class Input {
  private readonly code: string
  private position: number

  attemptedPosition: number

  constructor(code: string) {
    this.code = code
    this.position = 0
    this.attemptedPosition = 0
  }

  advance(): void {
    this.setPosition(this.position + 1)
  }

  advanceBy(num: number): void {
    this.setPosition(this.position + num)
  }

  getPosition(): number {
    return this.position
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
