import { ICreature } from '@/types'

// todo - rename to getSurroundingTiles ??
export const viewAllSurroundingTiles = (critter: ICreature, worldMap: string[][], radius = 1) => {

  // determine the x and y range
  const getRange = [radius * -1, radius]

  // copy those coordinates to a new map
  const arrayLength = (getRange[1] - getRange[0]) + 1 // plus one to account for index
  const surroundings = new Array(arrayLength).fill(null).map(() => new Array(arrayLength).fill(''))

  for (let i = getRange[0], y = 0; i <= getRange[1]; i++, y++) {
    for (let j = getRange[0], x = 0; j <= getRange[1]; j++, x++) {
      // if the coordinate is the middle, where the critter is...
      if (i === 0 && j === 0) {
        surroundings[y][x] = critter.creatureType
      }
      // if the coordinate exceeds the world map
      else if (!worldMap[critter.y + i] || !worldMap[critter.y + i][critter.x + j]) {
        surroundings[y][x] = 'X'
      }
      // else, return the world tile
      else {
        surroundings[y][x] = worldMap[critter.y + i][critter.x + j]
      }
    }
  }
  return surroundings
}

// this will search the area around the critter for the nearest wall
export const findNearestWall = (critter: ICreature, worldMap: string[][]) => {
  let direction, surroundings
  let wallFound = false
  let radius = 1

  do {
    // get the critters surroundings
    surroundings = viewAllSurroundingTiles(critter, worldMap, radius)
    // check each tile for a wall
    surroundings.forEach(row => row.forEach(tile => {
      if (tile === '#') {
        wallFound = true
      }
    }))
    // if no wall was found, increase search radius
    if (!wallFound) radius += 1

  } while (!wallFound)

  // surroundings contains the nearest wall
  /*
    the critter will find the wall by looking forwards to the end of surroundings and then checking side to side tiles
    critter.facing = {x: 0, y: -1}
    if radius was 3, we would need to check surroundings[0][3]
    how do I get there?
    critter is facing 0,-1, and need to check coordinate 2,0
    if radius is 3 then it looks like this

    #######
    #-----#
    #-----#
    #--c--#
    #-----#
    #-----#
    #######

    radius is 2 then it looks like
    #####
    #---#
    #-c-#
    #---#
    #####

    and facing 0,-1 we would need to check 2,0
    if facing 0,1 we would need to check 2,4

    so a formula would look like
    y = radius + (facing.y * radius) ?
    x = radius + (facing.x * radius) ?

    say facing 1,1, we would need to check 4,4
    y = 2 + (1 * 2) = 4
    x = 2 + (1 * 2) = 4

    say facing -1,1, we would need to check 0,4
    y = 2 + (1 * 2) = 4
    x = 2 + (-1 * 2) = 0

    say facing -1,0, checking 0,2
    y = 2 + (0 * 2) = 2,
    x = 2 + (-1 * 2) = 0
  */
  const testX = radius + (critter.facing.x * radius)
  const testY = radius + (critter.facing.y * radius)
  const testCell = surroundings[radius + (critter.facing.y * radius)][radius + (critter.facing.x * radius)]
  if (testCell === '#') {
    //wall found
  } else {
    // test cells beside it
    /*
      if facing is 0,-1, we're looking at 2,0 and need to test 1,0 and 3,0
    */
    const directionFound = false
    const spread = 1
    // test counter clockwise
    const counterCW = { y: testY, x: testX - spread }
    const clockW = { y: testY, x: testX + spread }
    if (counterCW.x < 0 || clockW.x > surroundings.length - 1) {
      // rotate perspective
    }
    else {
      const cCWTest = surroundings[counterCW.y][counterCW.x]
      const cWTest = surroundings[clockW.y][clockW.x]
    }
  }



  return direction
}

// export const shouldCreatureTurn = (critter, area) => {

// }



export const DIRECTION_NAMES = 'n ne e se s sw w nw'.split(' ')

export const DIRECTION_BY_STRING = {
  'n': { x: 0, y: -1 }, //n
  'ne': { x: 1, y: -1 }, //ne
  'e': { x: 1, y: 0 },  //e
  'se': { x: 1, y: 1 },  //se
  's': { x: 0, y: 1 },  //s
  'sw': { x: -1, y: 1 }, //sw
  'w': { x: -1, y: 0 }, //w
  'nw': { x: -1, y: -1 } //nw
}

export const DIRECTIONS = [
  { x: 0, y: -1 }, //n
  { x: 1, y: -1 }, //ne
  { x: 1, y: 0 },  //e
  { x: 1, y: 1 },  //se
  { x: 0, y: 1 },  //s
  { x: -1, y: 1 }, //sw
  { x: -1, y: 0 }, //w
  { x: -1, y: -1 } //nw
]

export const CARDINAL_STRING_FROM_COORDINATE = {
  '0,-1': 'n',
  '1,-1': 'ne',
  '1,0': 'e',
  '1,1': 'se',
  '0,1': 's',
  '-1,1': 'sw',
  '-1,0': 'w',
  '-1,-1': 'nw'
}

export const getCardinalString = (x: number, y: number) => {
  if (x === 0) {
    if (y === 1) return 's'
    else return 'n'
  }
  else if (x === 1) {
    if (y === 0) return 'e'
    else if (y === 1) return 'se'
    else if (y === -1) return 'ne'
  }
  else if (x === -1) {
    if (y === 0) return 'w'
    else if (y === 1) return 'sw'
    else if (y === -1) return 'nw'
  }
}


