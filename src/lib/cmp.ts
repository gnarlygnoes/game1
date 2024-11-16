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
