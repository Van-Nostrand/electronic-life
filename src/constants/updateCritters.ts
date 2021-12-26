import { Critter } from '../critters'
//update the critters array
export const updateCritters = (critterArray: Array<Critter>, worldArray) => {

  const CARDINAL_DIRECTIONS = [
    { x: 0, y: -1 }, //n
    { x: 1, y: -1 }, //ne
    { x: 1, y: 0 },  //e
    { x: 1, y: 1 },  //se
    { x: 0, y: 1 },  //s
    { x: -1, y: 1 }, //sw
    { x: -1, y: 0 }, //w
    { x: -1, y: -1 } //nw
  ]

  //state has already been copied. it is already a new array. So I can now modify it.
  critterArray = critterArray.map((critter, i) => {

    let hasChosenDirection = false
    //while the critter has not moved yet
    while (!hasChosenDirection) {
      const facedCell = worldArray[critter.y + critter.facing.y][critter.x + critter.facing.x]
      // if the cell the critter is facing is not empty
      if (facedCell !== ' ') {
        // turn
        const newFacing = CARDINAL_DIRECTIONS[Math.floor(Math.random()*8)]
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
