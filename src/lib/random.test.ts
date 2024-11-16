import {Random} from "./random";

describe('random', () => {
  test('nextInt', () => {
    const r = new Random(0);
    expect(r.next()).toEqual(0.9999775220639794)
    expect(r.next()).toEqual(0.9149675508169155)
    expect(r.next()).toEqual(0.39864739440255553)
  })
})