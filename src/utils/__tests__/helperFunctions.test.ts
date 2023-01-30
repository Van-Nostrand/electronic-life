import { faceNewRandomDirection } from '../helperFunctions'

describe('helper functions', () => {
  test('faceNewRandomDirection', () => {
    const start = { x: 0, y: 1 }
    const result = new Array(20).fill(start).map((coords) => faceNewRandomDirection(coords))
    result.forEach((r) => {
      const xIsSame = r.x === start.x
      const yIsSame = r.y === start.y
      expect(xIsSame && yIsSame).toBeFalsy()
    })
  })
})
