import Critter from './Critter'
import { ICritterProps, ICritter } from '@/critters/types'
import { TWorldMap } from '@/types'
import { faceNewRandomDirection } from '@/constants/helperFunctions'

export default function BouncingCritter ({
  classString = 'critter bouncing-critter',
  critterType = 'b',
  foodChain = 1,
  facing = { x: 0, y: -1 },
  speed = 1,
  x, y, position
}: ICritterProps) {

  return ({
    ...Critter({ classString, critterType, foodChain, facing, speed, x, y, position }),
    // bouncing critters are pretty simple
    // if they are facing an empty cell, then they move there
    // if they are not, then they will select a new random direction and see if that cell is clear
    // they will keep selecting random directions until they find a clear path
    // this can result in an infinite loop if they are boxed in by other critters, so I'll have to account for that soon. Maybe they can rest after
    takeTurn (worldMap?: TWorldMap): ICritter | Error {
      console.log(`critter.takeTurn at position(${this.x},${this.y}) is facing (${this.facing.x},${this.facing.y})`)
      if (worldMap === undefined) return new Error('Error in BouncingCritter.takeTurn, worldMap is undefined')
      // if (worldMap === undefined) return new Error(`Error in BouncingCritter.takeTurn @ position (${this.x}, ${this.y}), facing (${this.facing?.x}, ${this.facing?.y})`)

      let hasChosenDirection: boolean = false
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

      this.setPosition({ x: this.x + newFacing.x, y: this.y + newFacing.y })
      this.setFacing(newFacing)
      return this
    }
  })

  // bouncing critters are pretty simple
  // if they are facing an empty cell, then they move there
  // if they are not, then they will select a new random direction and see if that cell is clear
  // they will keep selecting random directions until they find a clear path
  // this can result in an infinite loop if they are boxed in by other critters, so I'll have to account for that soon. Maybe they can rest after
  // takeTurn (worldMap?: Array<Array<string>>): this | Error {
  //   if (worldMap === undefined) return new Error('Error in BouncingCritter.takeTurn')
  //   let hasChosenDirection: boolean = false
  //   let newFacing: {x: number; y: number;} = { ...this.facing }

  //   do {
  //     const facedCell: string = worldMap[this.y + newFacing.y][this.x + newFacing.x]
  //     // if the cell the critter is facing is not empty
  //     if (facedCell !== ' ') {
  //       // turn
  //       newFacing = { x: Math.floor(Math.random()*3) - 1, y: Math.floor(Math.random()*3) - 1 }
  //     }
  //     // else the cell is a clear space
  //     else if (facedCell === ' ') {
  //       hasChosenDirection = true
  //     }
  //   } while (!hasChosenDirection)

  //   this.setPosition({ x: this.x + newFacing.x, y: this.y + newFacing.y })
  //   this.setFacing(newFacing)
  //   return this
  // }
}
