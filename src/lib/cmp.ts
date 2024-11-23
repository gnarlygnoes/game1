const cmpSize = 20000

export type Id = number

let nextId = 0
const deleted: Id[] = []

export function nextEntityId(): number {
  const reused = deleted.pop()
  if (reused !== undefined) return reused

  const id = nextId
  nextId++
  return id
}

export function claimId(id: Id): void {
  deleted.push(id)
}

export interface CmpI<T> {
  set(id: Id, value: T): void
  get(id: Id): T | null
  delete(id: Id): void
  [Symbol.iterator](): Iterator<T>
}

export class Cmp<T> implements CmpI<T> {
  data: (T | null)[] = Array.from({length: cmpSize}, () => null)

  set(id: Id, value: T) {
    this.data[id] = value
  }

  get(id: Id): T | null {
    return this.data[id]
  }

  delete(id: Id) {
    claimId(id)
    this.data[id] = null
  }

  [Symbol.iterator](): Iterator<T> {
    let id = 0
    const data = this.data

    return {
      next(): IteratorResult<T> {
        while (id < cmpSize) {
          const value = data[id]
          id++
          if (value !== null) {
            return {value, done: false}
          }
        }
        return {value: null, done: true}
      },
    }
  }
}

export class CmpMap<T> implements CmpI<T> {
  data = new Map<Id, T>()

  set(id: Id, value: T) {
    this.data.set(id, value)
  }

  get(id: Id): T | null {
    return this.data.get(id) ?? null
  }

  delete(id: Id) {
    claimId(id)
    this.data.delete(id)
  }

  [Symbol.iterator](): Iterator<T> {
    return this.data.values()
  }
}

export class Cmp2<T extends {deleted?: true}> {
  data: T[]

  constructor(defaultVal: T) {
    defaultVal.deleted = true
    this.data = Array.from({length: cmpSize}, () => ({...defaultVal}))
  }

  set(id: Id, value: T) {
    // TODO: Need to set deleted here?
    this.data[id] = value
  }

  get(id: Id): T | null {
    const val = this.data[id]
    if (val.deleted) return null
    return val
  }

  delete(id: Id) {
    this.data[id].deleted = true
  }

  [Symbol.iterator](): Iterator<T> {
    const {data} = this
    let id = 0

    const result: any = {
      value: null,
      done: true,
    }

    return {
      next(): IteratorResult<T> {
        while (id < cmpSize) {
          const value = data[id]
          id++
          if (!value.deleted) {
            result.value = value as T
            result.done = false
            return result
          }
        }
        result.value = null
        result.done = true
        return result
      },
    }
  }
}
