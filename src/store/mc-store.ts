import {Mover} from './mover'
import {v2} from './data-types'

export class McStore {
  pos = new Mover(1, v2(innerWidth / 2, innerHeight * 0.9))
}
