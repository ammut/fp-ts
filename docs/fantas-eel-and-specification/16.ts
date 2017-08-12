//
// Code for http://www.tomharding.me/2017/06/12/fantas-eel-and-specification-16/
//

export const URI = 'RoseTree'

export type URI = typeof URI

export class RoseTree<A> {
  public readonly _A: A
  public readonly _URI: URI
  constructor(public readonly root: A, public readonly forest: Array<RoseTree<A>>) {}
  map<B>(f: (a: A) => B): RoseTree<B> {
    return new RoseTree(f(this.root), this.forest.map(rt => rt.map(f)))
  }
  extend<B>(f: (rt: RoseTree<A>) => B): RoseTree<B> {
    return new RoseTree(f(this), this.forest.map(rt => rt.extend(f)))
  }
}

const myTree = new RoseTree(1, [new RoseTree(2, []), new RoseTree(3, [new RoseTree(4, [])])])

console.log(
  JSON.stringify(
    myTree.extend(rt => {
      return rt.forest.length < 1
        ? { value: rt.root, color: 'RED' }
        : rt.forest.length < 5 ? { value: rt.root, color: 'ORANGE' } : { value: rt.root, color: 'GREEN' }
    }),
    null,
    2
  )
)
/*
{
  "root": {
    "value": 1,
    "color": "ORANGE"
  },
  "forest": [
    {
      "root": {
        "value": 2,
        "color": "RED"
      },
      "forest": []
    },
    {
      "root": {
        "value": 3,
        "color": "ORANGE"
      },
      "forest": [
        {
          "root": {
            "value": 4,
            "color": "RED"
          },
          "forest": []
        }
      ]
    }
  ]
}
*/

import { extend, fold } from '../../src/Array'

const temperatures = [23, 19, 19, 18, 18, 20, 24]

console.log(
  extend(
    as => fold(() => '???', (prev, tail) => fold(() => '???', (next, _) => (next <= prev ? 'YAY' : 'BOO'), tail), as),
    temperatures
  )
)
// => [ 'YAY', 'YAY', 'YAY', 'YAY', 'BOO', 'BOO', '???' ]
