import {Input} from './input'

// export interface Parser<T> {
//   apply: (input: Input) => T
//   map: <U>(success: (result: T) => U) => Parser<U>
// }

export type Parser<T> = (i: Input) => T | null

// export type WrappedParser<T> = () => Parser<T>
//
// export type P2<T> = Parser<T> | WrappedParser<T>

// // TODO: Support multiple maps?
// /** @deprecated */
// export function mkParser<T>(applyFunc: (input: Input) => T | null): Parser<T> {
//   let mapResultFunc: ((result: T) => any) | null = null
//
//   const success = (result: T): T => {
//     if (mapResultFunc) return mapResultFunc(result)
//
//     return result
//   }
//
//   const parser: Parser<T> = {
//     apply: (input: Input): T => {
//       const result = applyFunc(input)
//
//       if (result !== null) return success(result)
//       else return null!
//     },
//     map: <U>(f: (result: T) => U): Parser<U> => {
//       if (mapResultFunc !== null)
//         throw new Error('Not allowed to set the map function on parser twice.')
//
//       mapResultFunc = f
//
//       return parser as any as Parser<U>
//     },
//     // parserId: getNextParserId()
//   }
//
//   return parser
// }
