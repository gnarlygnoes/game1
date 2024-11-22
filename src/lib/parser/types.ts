import {Input} from './input'

export type Parser<T> = (i: Input) => T | null
