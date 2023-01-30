import { DIRECTIONS } from '@/utils/constants'


export const updateCritters = (critterArray: any, worldArray: any) => {
  //state has already been copied. it is already a new array. So I can now modify it.
  critterArray = critterArray.map((critter: any) => {

    let hasChosenDirection = false
    //while the critter has not moved yet
    while (!hasChosenDirection) {
      const facedCell = worldArray[critter.y + critter.facing.y][critter.x + critter.facing.x]
      // if the cell the critter is facing is not empty
      if (facedCell !== ' ') {
        // turn
        const newFacing = DIRECTIONS[Math.floor(Math.random() * 8)]
        critter.facing = { x: newFacing.x, y: newFacing.y }
      }
      // else the cell is a clear space
      else {
        critter.x = critter.x + critter.facing.x
        critter.y = critter.y + critter.facing.y
        hasChosenDirection = true
      }
    }
    // todo - double check: I'm mutating the critter object, but it's from deep copied state... is that ok?
    return critter
  })

  return critterArray
}
