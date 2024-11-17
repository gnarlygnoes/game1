const cmpSize = 2000

export type Id = number

export class Cmp<T> {
  data: (T | null)[] = Array.from({length: cmpSize}, () => null)

  set(id: Id, value: T) {
    this.data[id] = value
  }

  get(id: Id): T | null {
    return this.data[id]
  }

  delete(id: Id) {
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
