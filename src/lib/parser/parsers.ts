import {Input} from './input'
import {Parser} from './types'
import {isString} from './util'

// Parses spaces, tabs and line endings.
export const ws: Parser<''> = optionalWhiteSpace()

/** @deprecated */
export const number: Parser<string> = regex(/-?(\d+(\.\d+)?)/)

export const uint: Parser<string> = takeCharWhile(c => isDigit(c))

export const int = map(and(or(char('-'), optionalWhiteSpace()), uint), res => {
  return res[0] + res[1]
})

export const untilLineEnd = takeCharWhile(c => !isLineEnd(c))

// Doesn't handle escaped quotes?
export const stringLiteral = map(
  and(
    char('"'),
    takeCharWhile(c => c !== '"'),
    char('"'),
  ),
  res => res[1],
)

function isLineEnd(val: string): boolean {
  return val === '\n' || val === '\r\n' || val == '\r'
}

function isWhiteSpace(val: string): boolean {
  return val.trim() === ''
  // return val === ' ' || val === '\n' || val === '\r' || val === '\t'
}

function isDigit(char: string): boolean {
  const code = char.charCodeAt(0)
  return code >= 48 && code <= 57 // ASCII codes for '0' to '9'
}

function isAlphaNumeric(str: string): boolean {
  const len = str.length
  for (let i = 0; i < len; i++) {
    const code = str.charCodeAt(i)
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false
    }
  }
  return true
}

export function char<T extends string>(c: T): Parser<T> {
  return input => {
    if (input.nextChar() === c) {
      input.advance()
      return c
    }
    return null
  }
}

export function anyChar(): Parser<string> {
  return input => {
    const c = input.nextChar()
    input.advance()
    return c
  }
}

export const anyWord = takeCharWhile(c => isAlphaNumeric(c))

export function nothing(): Parser<''> {
  return () => {
    return ''
  }
}

export function word(str: string): Parser<string> {
  return input => {
    const {position} = input

    for (const c of str) {
      if (input.nextChar() === c) {
        input.advance()
      } else {
        input.setPosition(position)
        return null
      }
    }
    return str
  }
}

export function optionalWhiteSpace(): Parser<''> {
  return input => {
    while (isWhiteSpace(input.nextChar())) {
      input.advance()
    }

    return '' as const
  }
}

/** @deprecated This is slow. */
export function regex(re: RegExp): Parser<string> {
  return input => {
    const code = input.rest()
    const match = re.exec(code)

    if (match !== null && match.index === 0) {
      const result = match[0]
      input.advanceBy(result.length)

      return result
    } else {
      return null
    }
  }
}

export function or<T>(...parsers: Parser<T>[]): Parser<T> {
  return input => {
    for (const p of parsers) {
      const result = p(input)

      if (result !== null) {
        return result
      }
    }
    return null
  }
}

// Need to test this.
export function and<T extends any[]>(
  ...parsers: {[K in keyof T]: Parser<T[K]>}
): Parser<T> {
  return input => {
    const startPos = input.position
    const results = []

    for (const parser of parsers) {
      const result = parser(input)
      if (result === null) {
        input.setPosition(startPos)
        return null
      }
      results.push(result)
    }

    return results as T
  }
}

// Doesn't advance position
// TODO: Make this not polymorphic?
export function not<T>(parserIn: string | Parser<T>): Parser<string> {
  const parser = (
    isString(parserIn) ? word(parserIn as string) : parserIn
  ) as Parser<T>

  return input => {
    const pos = input.position
    const result = parser(input)

    if (result !== null) {
      input.setPosition(pos)
      input.attemptedPosition = pos

      return null
    }
    return ''
  }
}

export function many<T>(parser: Parser<T>): Parser<T[]> {
  return input => {
    const results: T[] = []

    let result = parser(input)

    while (result !== null) {
      results.push(result)
      result = parser(input)
    }
    return results
  }
}

export function many1<T>(parser: Parser<T>): Parser<T[]> {
  return input => {
    const results: T[] = []

    let result = parser(input)
    while (result !== null) {
      results.push(result)
      result = parser(input)
    }

    if (results.length > 0) {
      return results
    }

    return null
  }
}

// Always succeeds
export function repSep<T>(parser: Parser<T>, separator: string): Parser<T[]> {
  return input => {
    const results: T[] = []
    const sepParser = and(ws, word(separator), ws)
    let result: T | null = parser(input)

    while (result !== null) {
      results.push(result)

      const sepRes = sepParser(input)
      if (sepRes !== null) {
        result = parser(input)
      } else {
        result = null
      }
    }
    return results
  }
}

export function repParserSep<T, U>(
  parser: Parser<T>,
  separator: Parser<U>,
): Parser<T[]> {
  return input => {
    const results: T[] = []

    let result: T | null = parser(input)

    while (result !== null) {
      results.push(result)

      const sepRes = separator(input)
      if (sepRes !== null) {
        result = parser(input)
      } else {
        result = null
      }
    }
    return results
  }
}

export function takeCharWhile(
  condition: (c: string) => boolean,
): Parser<string> {
  return input => {
    const {code, position, len} = input

    let i
    for (i = position; i < len; i++) {
      const c = code[i]
      if (!condition(c)) {
        if (i === position) return null
        break
      }
    }
    input.setPosition(i)
    return code.slice(position, i)
  }
}

// Input is consumed including str, but str is not included in the result.
export function untilS(str: string): Parser<string> {
  return (input: Input) => {
    const strLen = str.length
    const startPos = input.position

    const i = input.code.indexOf(str, input.position)
    if (i > 0) {
      input.setPosition(i + strLen)
      return input.code.slice(startPos, i)
    }
    return null
  }
}

export function map<T, U>(parser: Parser<T>, f: (result: T) => U): Parser<U> {
  return (i: Input) => {
    const result = parser(i)
    if (result !== null) {
      return f(result)
    }
    return null
  }
}

export interface ParseOptions {
  partial?: boolean
}

export function parse<T>(
  parser: Parser<T>,
  code: string,
  options?: ParseOptions,
): T | null {
  const partial = options && options.partial

  const input = new Input(code)
  const out = parser(input)

  if (!input.endOfInput() && partial !== true) displayFailure(input)

  return out
}

function displayFailure(input: Input): void {
  const message =
    `PARSE FAILURE AT POSITION ${input.attemptedPosition}:` +
    `\n\nSUCCESSFULLY PARSED:\n"${input.successfullyParsed()}"` +
    `\n\nFAILED AT:\n"${input.unParsed()}"`
  throw new Error(message)
}
