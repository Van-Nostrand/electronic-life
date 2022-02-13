import {
  ICoordinates,
  IRelativeCoordinates
} from '@/types'
import {
  IWallFollower,
  ICritter
} from '@/critters/types'
// import {
//   WallFollower,
//   BouncingCritter,
//   Critter
// } from '@/critters'


export const getSurroundingTiles = (critter: ICritter, worldMap: Array<Array<string>>, radius: number = 1) => {

  // determine the x and y range
  const getRange: Array<number> = [radius * -1, radius]

  // copy those coordinates to a new map
  const arrayLength: number = (getRange[1] - getRange[0]) + 1 // plus one to account for index
  const surroundings: Array<Array<string>> = new Array(arrayLength).fill(undefined).map(() => new Array(arrayLength).fill(''))

  for (let i = getRange[0], y = 0; i <= getRange[1]; i++, y++) {
    for (let j = getRange[0], x = 0; j <= getRange[1]; j++, x++) {
      // if the coordinate is the middle, where the critter is...
      if (i === 0 && j === 0) {
        surroundings[y][x] = critter.critterType
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
export const findNearestWall = (critter: IWallFollower, worldMap: Array<Array<string>>): IRelativeCoordinates => {
  let surroundings: Array<Array<string>>
  const wallFound = false
  const radius = 1
  let borderTestResults
  const target = scanSurroundingsForItem(worldMap, { x: critter.x, y: critter.y }, '#', critter.facing)
  console.log('src/constants/helperFunctions.ts: target is ', target)
  // do {
  // get the critters surroundings
  // surroundings = getSurroundingTiles(critter, worldMap, radius);
  // check each tile for a wall
  // borderTestResults = checkBorderOf2dArray(surroundings, "#", critter.facing);



  // if (borderTestResults !== null && borderTestResults.radius > 0) {
  //   wallFound = true;
  // if (radius === 1) critter.hasFoundWall = true;
  // }
  // if no wall was found, increase search radius
  //   if (!wallFound) radius += 1;

  // } while (!wallFound);

  // return borderTestResults;
  return target
}


// this will replace checkBorderOf2dArray and getSurroundingTiles
// currently does not account for checking a tile that is out of bounds, but if the world is correctly built with walls then that shouldn't ever happen...
export const scanSurroundingsForItem = (
  worldMap: Array<Array<string>>,
  critterPosition: {x: number; y: number;},
  valueToFind: string,
  facingFromOrigin: ICoordinates = { x: 0, y: -1 }
): IRelativeCoordinates => {

  debugger
  // radius is exclusive: it does not include the center tile. so radius = 1 means it's a 3x3 grid
  let radius: number = 1
  let iter: number
  const directionFound: boolean = false
  let counterClockwiseCoordinates, clockwiseCoordinates: ICoordinates

  do {
    const startX = facingFromOrigin.x === 0
      ? critterPosition.x
      : facingFromOrigin.x === 1
        ? critterPosition.x + radius
        : critterPosition.x - radius
    const startY = facingFromOrigin.y === 0
      ? critterPosition.y
      : facingFromOrigin.y === 1
        ? critterPosition.y + radius
        : critterPosition.y - radius

    iter = 1

    do {
      if (iter === 1) {
        if (worldMap[startY][startX] === valueToFind) {
          return ({ coordinates: { x: startX, y: startY }, radius: radius })
        }
        counterClockwiseCoordinates = { x: startX, y: startY }
        clockwiseCoordinates = { x: startX, y: startY }
      }
      else {
        counterClockwiseCoordinates = getRelativeCCwCoordinate(
          counterClockwiseCoordinates.x,
          counterClockwiseCoordinates.y,
          { x: critterPosition.x + radius, y: critterPosition.y + radius },
          { x: critterPosition.x - radius, y: critterPosition.y - radius }
        )
        clockwiseCoordinates = getRelativeCwCoordinate(
          clockwiseCoordinates.x,
          clockwiseCoordinates.y,
          { x: critterPosition.x + radius, y: critterPosition.y + radius },
          { x: critterPosition.x - radius, y: critterPosition.y - radius }
        )
        const counterClockwiseTile = worldMap[counterClockwiseCoordinates.y][counterClockwiseCoordinates.x]
        const clockwiseTile = worldMap[clockwiseCoordinates.y][clockwiseCoordinates.x]
        // if both coordinates are valueToFind
        if (counterClockwiseTile === valueToFind && clockwiseTile === valueToFind) {
          // I haven't figured out how to choose between cw and ccw so I'll just flip a coin for now
          // false will be ccw, true will be cw
          return ({
            coordinates: Math.random() < 0.5 ? counterClockwiseCoordinates : clockwiseCoordinates,
            radius
          })
          // return [ Math.random() < 0.5 ? counterClockwiseCoordinates : clockwiseCoordinates, radius ];
        }
        // else if only one matches
        else if (counterClockwiseTile === valueToFind || clockwiseTile === valueToFind) {
          return ({ coordinates: counterClockwiseTile === valueToFind ? counterClockwiseCoordinates : clockwiseCoordinates, radius })
        }
      }

      iter += 1
    } while (iter < radius * 6) // todo - FIX THIS <-----
    // if radius is 2, then iter is less than radius * 6 which is 12
    // but if radius is 2 then we need 9 checks
    // if radius is 3 then iter is less than 18
    // but if radius is 3 then we need
    //    #######
    //    #-----#
    //    #-----#
    //    #-----#
    //    #-----#
    //    #-----#
    //    #######

    radius += 1

  } while (!directionFound)
}


// the wall follower has chosen a wall and needs to figure out where the next cell adjacent to the wall is
export const findNextSpaceToMoveAlongWall = (worldMap: Array<Array<string>>, wallFollower: IWallFollower): [ ICoordinates, IRelativeCoordinates ] => {
  const { x, y, facing, wallCoordinate, movesClockwise } = wallFollower
  let hasChosenDirection = false
  let newDirection

  do {

    const coordinateDirection = deriveDirectionFromCoordinates(wallCoordinate.coordinates, { x, y })
    newDirection = movesClockwise ?
      moveClockwiseAroundCoordinate(coordinateDirection)
      :
      moveCounterClockwiseAroundCoordinate(coordinateDirection)

    if (/[#]/.test(worldMap[newDirection.y + y][newDirection.x + x])) {
      // reassign wall coordinate
      wallCoordinate.coordinates = { x: newDirection.x + x, y: newDirection.y + y }
    }
    else if (/[bw]/.test(worldMap[newDirection.y + y][newDirection.x + x])) {
      // wait a turn
    }
    else if (worldMap[newDirection.y + y][newDirection.x + x] === ' ') {
      hasChosenDirection = true
    }

  } while (!hasChosenDirection)

  return [ newDirection, wallCoordinate ]

}


// will check all tiles in the "border" of a 2d array for a particular value
// only works on arrays with odd numbered lengths: there must be a "center cell"
export const checkBorderOf2dArray = (twoDeeArr: Array<Array<string>>, valueToFind: string, facingFromOrigin = { x: 0, y: -1 }): IRelativeCoordinates => {

  debugger

  // in theory, I should never be passing in an array with an even number of indices
  if ((twoDeeArr.length - 1) % 2 > 0) {
    return null
  }

  const radius: number = (twoDeeArr.length - 1) / 2 // the 2d array will always be an odd number length so this works...
  const startX: number = facingFromOrigin.x === 0 ? radius : facingFromOrigin.x > 0 ? radius * 2 : 0
  const startY: number = facingFromOrigin.y === 0 ? radius : facingFromOrigin.y > 0 ? radius * 2 : 0
  let iter: number = 1
  const maxChecks: number = (twoDeeArr.length - 1) * 4
  let counterClockwiseCoordinates: ICoordinates | Error = { x: startX, y: startY }
  let clockwiseCoordinates: ICoordinates | Error = { x: startX, y: startY }
  const directionFound: boolean = false
  do {
    // do the single initial check
    if (iter === 1) {
      // if the first check is a wall, then that's the closest wall
      if (twoDeeArr[startY][startX] === valueToFind) {
        return ({ coordinates: { x: startX, y: startY }, radius })
      }
    }
    // else, we're iterating through ccw and cw checks
    else {
      counterClockwiseCoordinates = getCounterClockwiseCoordinate(counterClockwiseCoordinates.x, counterClockwiseCoordinates.y, twoDeeArr.length)
      clockwiseCoordinates = getClockwiseCoordinate(clockwiseCoordinates.x, clockwiseCoordinates.y, twoDeeArr.length)
      // todo - fix this
      if (counterClockwiseCoordinates instanceof Error) {
        console.log('error while checking border ', counterClockwiseCoordinates)
        return ({ coordinates: { x:0, y:0 }, radius: 0 })
      }
      // todo - fix this
      if (clockwiseCoordinates instanceof Error) {
        return ({ coordinates: { x:0, y:0 }, radius: 0 })
      }
      const counterClockwiseTile = twoDeeArr[counterClockwiseCoordinates.y][counterClockwiseCoordinates.x]
      const clockwiseTile = twoDeeArr[clockwiseCoordinates.y][clockwiseCoordinates.x]
      // if both coordinates are valueToFind
      if (counterClockwiseTile === valueToFind && clockwiseTile === valueToFind) {
        // false will be ccw, true will be cw
        return ({
          coordinates: Math.random() < 0.5 ? counterClockwiseCoordinates : clockwiseCoordinates,
          radius
        })
        // return [ Math.random() < 0.5 ? counterClockwiseCoordinates : clockwiseCoordinates, radius ];
      }
      // else if only one matches
      else if (counterClockwiseTile === valueToFind || clockwiseTile === valueToFind) {
        return ({ coordinates: counterClockwiseTile === valueToFind ? counterClockwiseCoordinates : clockwiseCoordinates, radius })
      }
    }
    iter += 1
  } while (!directionFound && iter <= maxChecks)

  if (iter > maxChecks) console.log('something is seriously wrong in checkBorderOf2dArray')
  return ({ coordinates: { x:0, y:0 }, radius: -2 }) // indicates that something failed
}

export const getRelativeCCwCoordinate = (x: number, y: number, upperBounds: {x: number; y: number;}, lowerBounds: {x: number; y: number;}): ICoordinates => {
  switch (true) {
    case y === lowerBounds.y && x > lowerBounds.x: // top row except top left corner
      return ({ x: x - 1, y: y })
    case x === lowerBounds.x && y < upperBounds.y: // left column except bottom left corner
      return ({ x: x, y: y + 1 })
    case y === upperBounds.y && x < upperBounds.x: // bottom row except bottom right corner
      return ({ x: x + 1, y: y })
    case x === upperBounds.x && y > lowerBounds.y: // right column except top right corner
      return ({ x: x, y: y - 1 })
    default: return ({ x: -2, y: -2 })// indicates error
  }
}

export const getRelativeCwCoordinate = (x: number, y: number, upperBounds: {x: number; y: number;}, lowerBounds: {x: number; y: number;}): ICoordinates => {
  switch (true) {
    case y === lowerBounds.y && x < upperBounds.x: // top row except top right corner
      return ({ x: x + 1, y: y })
    case x === upperBounds.x && y < upperBounds.y: // right column except bottom right corner
      return ({ x: x, y: y + 1 })
    case y === upperBounds.y && x > lowerBounds.x: // bottom row except bottom left corner
      return ({ x: x - 1, y: y })
    case x === lowerBounds.x && y > lowerBounds.y: // left column except top left corner
      return ({ x: x, y: y - 1 })
    default: return ({ x: -2, y: -2 })
  }
}


// figures out the next cell in the border of a 2d array, moving counter clockwise
export const getCounterClockwiseCoordinate = (x: number, y: number, arrayLength: number): ICoordinates => {
  switch (true) {
    case y === 0 && x > 0: // top row except top left corner
      return ({ x: x - 1, y: y })
    case x === 0 && y < arrayLength - 1: // left column except bottom left corner
      return ({ x: x, y: y + 1 })
    case y === arrayLength - 1 && x < arrayLength - 1: // bottom row except bottom right corner
      return ({ x: x + 1, y: y })
    case x === arrayLength - 1 && y > 0: // right column except top right corner
      return ({ x: x, y: y - 1 })
    default: return ({ x: -2, y: -2 })// indicates error
  }
}


export const getClockwiseCoordinate = (x: number, y: number, arrayLength: number): ICoordinates => {
  switch (true) {
    case y === 0 && x < arrayLength - 1: // top row except top right corner
      return ({ x: x + 1, y: y })
    case x === arrayLength - 1 && y < arrayLength - 1: // right column except bottom right corner
      return ({ x: x, y: y + 1 })
    case y === arrayLength - 1 && x > 0: // bottom row except bottom left corner
      return ({ x: x - 1, y: y })
    case y > 0 && x === 0: // left column except top left corner
      return ({ x: x, y: y - 1 })
    default: return ({ x: -2, y: -2 })
  }
}


export const moveClockwiseAroundCoordinate = (facing: ICoordinates): ICoordinates => {
  switch (true) {
    case facing.y === -1 && facing.x < 1:
      return ({ x: -1, y: 0 }) // move left
    case facing.x === -1 && facing.y > -1:
      return ({ x: 0, y: 1 }) // move down
    case facing.y === 1 && facing.x > -1:
      return ({ x: 1, y: 0 }) // move right
    case facing.x === 1 && facing.y < 1:
      return ({ x: 0, y: -1 }) // move up
    default: return ({ x: -2, y: -2 })
  }
}


export const moveCounterClockwiseAroundCoordinate = (facing: ICoordinates): ICoordinates => {
  switch (true) {
    case facing.y === 1 && facing.x < 1:
      return ({ x: -1, y: 0 }) // move left
    case facing.x === 1 && facing.y > -1:
      return ({ x: 0, y: 1 }) // move down
    case facing.y === -1 && facing.x > -1:
      return ({ x: 1, y: 0 }) // move right
    case facing.x === -1 && facing.y < 1:
      return ({ x: 0, y: -1 }) // move up
    default: return ({ x: -2, y: -2 })
  }
}

// returns coordinates describing the direction of a point relative to the position of the calling object
export const deriveDirectionFromCoordinates = (
  targetCoordinates: ICoordinates,
  currentCoordinates: ICoordinates,
): {x: number, y: number} => {
  // targetCoordinates = 5,3
  // radius = 2
  // currentCoordinates = 3,3
  const direction: {x: number; y: number;} = {
    x: targetCoordinates.x > currentCoordinates.x ? 1 : targetCoordinates.x < currentCoordinates.x ? -1 : 0,
    y: targetCoordinates.y > currentCoordinates.y ? 1 : targetCoordinates.y < currentCoordinates.y ? -1 : 0
  }

  // if (targetCoordinates.x > currentCoordinates.x) direction.x = 1;
  // else if (targetCoordinates.x < radius) direction.x = -1;
  // if (targetCoordinates.y > radius) direction.y = 1;
  // else if (targetCoordinates.y < radius) direction.y = -1;
  // direction = 1,-1
  return direction
}


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


