import {Input} from './input'
import {Parser} from './types'
import {isString} from './util'

// Parses spaces, tabs and line endings.
export const ___: Parser<''> = optionalWhiteSpace()
// export const ___: Parser<''> = regex(/[\s]*/).map(() => '' as '')

// 0 or more spaces and tabs.
export const __: Parser<''> = regex(/[ \t]*/).map(() => '' as const)

export const number: Parser<string> = regex(/-?(\d+(\.\d+)?)/)

export const int: Parser<string> = regex(/^[-+]?\d+/)

export const anyWord: Parser<string> = regex(/\w+/)

export const stringLiteral: Parser<string> = regex(/"([^"\\]|\\.)*"/)

export const ident: Parser<string> = regex(
  /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*/,
)

export const lineEnd: Parser<string> = regex(/(\r\n|[\r\n])/).map(() => '')

export const untilLineEnd: Parser<string> = and(
  regex(/.*/),
  regex(/(\r\n|[\n\r])?/),
).map(res => res[0])

function isWhiteSpace(val: string): boolean {
  return val.trim() === ''
  // return val === ' ' || val === '\n' || val === '\r' || val === '\t'
}

export function char2<T extends string>(c: T): Parser<T> {
  return input => {
    const r = input.nextChar()
    let result: T | null = null

    if (r === c) {
      input.advance()
      result = c
    }
    return result
  }
}

export function char<T extends string>(c: T): Parser<T> {
  return input => {
    const r = input.nextChar()
    let result: T | null = null

    if (r === c) {
      input.advance()
      result = c
    }
    return result
  }
}

export function anyChar(): Parser<string> {
  return input => {
    const c = input.nextChar()
    input.advance()
    return c
  }
}

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

// export function or<A>(a: P2<A>): Parser<A>
// export function or<A, B>(a: P2<A>, b: P2<B>): Parser<A | B>
// export function or<A, B, C>(a: P2<A>, b: P2<B>, c: P2<C>): Parser<A | B | C>
// export function or<A, B, C, D>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
// ): Parser<A | B | C | D>
// export function or<A, B, C, D, E>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
// ): Parser<A | B | C | D | E>
// export function or<A, B, C, D, E, F>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
// ): Parser<A | B | C | D | E | F>
// export function or<A, B, C, D, E, F, G>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
// ): Parser<A | B | C | D | E | F | G>
// export function or<A, B, C, D, E, F, G, H>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
// ): Parser<A | B | C | D | E | F | G | H>
// export function or<A, B, C, D, E, F, G, H, I>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
// ): Parser<A | B | C | D | E | F | G | H | I>
export function or<T extends any[]>(...parsers: T): Parser<T> {
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
    const startPos = input.getPosition()
    let failed = false

    // TODO: Why the map?
    const results = parsers.map(p => {
      if (!failed) {
        const result = p(input)

        if (result === null) {
          input.setPosition(startPos)
          failed = true
        } else return result
      }
      return undefined
    })

    if (failed) return null

    return results as T
  }
}

// export function and<A>(a: P2<A>): Parser<[A]>
// export function and<A, B>(a: P2<A>, b: P2<B>): Parser<[A, B]>
// export function and<A, B, C>(a: P2<A>, b: P2<B>, c: P2<C>): Parser<[A, B, C]>
// export function and<A, B, C, D>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
// ): Parser<[A, B, C, D]>
// export function and<A, B, C, D, E>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
// ): Parser<[A, B, C, D, E]>
// export function and<A, B, C, D, E, F>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
// ): Parser<[A, B, C, D, E, F]>
// export function and<A, B, C, D, E, F, G>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
// ): Parser<[A, B, C, D, E, F, G]>
// export function and<A, B, C, D, E, F, G, H>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
// ): Parser<[A, B, C, D, E, F, G, H]>
// export function and<A, B, C, D, E, F, G, H, I>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
// ): Parser<[A, B, C, D, E, F, G, H, I]>
// export function and<A, B, C, D, E, F, G, H, I, J>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
//   j: P2<J>,
// ): Parser<[A, B, C, D, E, F, G, H, I, J]>
// export function and<A, B, C, D, E, F, G, H, I, J, K>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
//   j: P2<J>,
//   k: P2<K>,
// ): Parser<[A, B, C, D, E, F, G, H, I, J, K]>
// export function and<A, B, C, D, E, F, G, H, I, J, K, L>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
//   j: P2<J>,
//   k: P2<K>,
//   l: P2<L>,
// ): Parser<[A, B, C, D, E, F, G, H, I, J, K, L]>
// export function and<A, B, C, D, E, F, G, H, I, J, K, L, M>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
//   j: P2<J>,
//   k: P2<K>,
//   l: P2<L>,
//   m: P2<M>,
// ): Parser<[A, B, C, D, E, F, G, H, I, J, K, L, M]>
// export function and<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
//   j: P2<J>,
//   k: P2<K>,
//   l: P2<L>,
//   m: P2<M>,
//   n: P2<N>,
// ): Parser<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>
// export function and<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
//   j: P2<J>,
//   k: P2<K>,
//   l: P2<L>,
//   m: P2<M>,
//   n: P2<N>,
//   o: P2<O>,
// ): Parser<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>
// export function and<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
//   a: P2<A>,
//   b: P2<B>,
//   c: P2<C>,
//   d: P2<D>,
//   e: P2<E>,
//   f: P2<F>,
//   g: P2<G>,
//   h: P2<H>,
//   i: P2<I>,
//   j: P2<J>,
//   k: P2<K>,
//   l: P2<L>,
//   m: P2<M>,
//   n: P2<N>,
//   o: P2<O>,
//   p: P2<P>,
// ): Parser<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P]>
// export function and<T extends any[]>(...parsers: T) {
//   return mkParser(input => {
//     const startPos = input.getPosition()
//     let failed = false
//
//     const results = parsers.map(p => {
//       if (!failed) {
//         const result = applyParser(p, input)
//
//         if (result === null) {
//           input.setPosition(startPos)
//           failed = true
//         } else return result
//       }
//       return undefined
//     })
//
//     if (failed) return null
//
//     return results
//   })
// }

// Doesn't advance position
// TODO: Make this not polymorphic?
export function not<T>(parserIn: string | Parser<T>): Parser<string> {
  const parser = (
    isString(parserIn) ? word(parserIn as string) : parserIn
  ) as Parser<T>

  return input => {
    const pos = input.getPosition()
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
    const sepParser = and(___, word(separator), ___)
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

export function takeWhile(condition: (c: string) => boolean): Parser<string> {
  return input => {
    let nc = input.nextChar()
    const chars: string[] = []

    while (nc !== undefined && condition(nc)) {
      chars.push(nc)
      input.advance()
      nc = input.nextChar()
    }

    if (chars.length === 0) return null

    return chars.join('')
  }
}

// // Parses any string until untilStr. Discards untilStr from result.
// export function until(untilStr: string): Parser<string> {
//   return and(regex(RegExp(`[\\s\\S]*?(?=${untilStr})`)), word(untilStr)).map(
//     res => {
//       return res[0]
//     },
//   )
// }

export function untilS(str: string): Parser<string> {
  return (i: Input) => {
    const strLen = str.length
    const end = i.len - strLen

    // for i.p
  }
}

// Parses any string until untilStr. Discards untilStr from result.
// TODO: This is until char, not string?
export function until2(untilStr: string): Parser<string> {
  return map(
    and(
      takeWhile(c => c !== untilStr),
      word(untilStr),
    ),
    res => res[0],
  )
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
