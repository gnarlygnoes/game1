import {makeMoversArray, MoverView} from './mover-array'

describe(makeMoversArray.name, () => {
  test('setting px and py', () => {
    const array = makeMoversArray(10)

    const view = new MoverView(array, 0)
    view.px = 10
    view.py = 10

    const {px, py} = view

    expect(px).toEqual(10)
    expect(py).toEqual(10)
  })
})
