import Critter from './Critter'
import { ICritterProps } from '@/types'
import { faceNewRandomDirection } from '@/utils/helperFunctions'

/**
 * bouncing critters are pretty simple
 * if they are facing an empty cell, then they move there
 * if they are not, then they will select a new random direction and see if that cell is clear
 * they will keep selecting random directions until they find a clear path
 * this can result in an infinite loop if they are boxed in by other critters, so I'll have to account for that soon. Maybe they can rest after
 */
export default class BouncingCritter extends Critter {
  constructor (props: ICritterProps) {
    super(props)

  }

  takeTurn (worldMap?: string[][]): this | Error {
    // console.log(`critter.takeTurn at position(${this.x},${this.y}) is facing (${this.facing.x},${this.facing.y})`)
    if (worldMap === undefined) {
      return new Error('Error in BouncingCritter.takeTurn, worldMap is undefined')
    }
    // if (worldMap === undefined) return new Error(`Error in BouncingCritter.takeTurn @ position (${this.x}, ${this.y}), facing (${this.facing?.x}, ${this.facing?.y})`)

    let hasChosenDirection = false
    let newFacing: {x: number; y: number;} = { ...this.facing }

    do {
      const facedCell: string = worldMap[this.y + newFacing.y][this.x + newFacing.x]
      // if the faced cell is clear, we're good
      if (facedCell === ' ') {
        hasChosenDirection = true
      } else {
        // turn
        newFacing = faceNewRandomDirection(this.facing)
      }
    } while (!hasChosenDirection)

    this.x = this.x + newFacing.x
    this.y = this.y + newFacing.y
    this.facing = newFacing
  }
}
