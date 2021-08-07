
export const getSurroundingTiles = (critter, worldMap, radius = 1) => {
  
  // determine the x and y range
  let getRange = [radius * -1, radius];

  // copy those coordinates to a new map
  let arrayLength = (getRange[1] - getRange[0]) + 1; // plus one to account for index
  let surroundings = new Array(arrayLength).fill().map(() => new Array(arrayLength).fill(""));
  
  for (let i = getRange[0], y = 0; i <= getRange[1]; i++, y++) { 
    for (let j = getRange[0], x = 0; j <= getRange[1]; j++, x++) {
      // if the coordinate is the middle, where the critter is... 
      if (i === 0 && j === 0) {
        surroundings[y][x] = critter.creatureType;
      }
      // if the coordinate exceeds the world map
      else if (!worldMap[critter.y + i] || !worldMap[critter.y + i][critter.x + j]) {
        surroundings[y][x] = "X";
      }
      // else, return the world tile
      else {
        surroundings[y][x] = worldMap[critter.y + i][critter.x + j];
      }
    }
  }
  return surroundings;
}


// this will search the area around the critter for the nearest wall
export const findNearestWall = (critter, worldMap) => {
  let surroundings;
  let wallFound = false;
  let radius = 1;
  let borderTestResults;

  do {
    // get the critters surroundings
    surroundings = getSurroundingTiles(critter, worldMap, radius);
    // check each tile for a wall 
    borderTestResults = checkBorderOf2dArray(surroundings, "#", critter.facing);
    if (borderTestResults !== null) {
      wallFound = true;
      if (radius === 1) critter.huggingWall = true;
    }
    // if no wall was found, increase search radius
    if (!wallFound) radius += 1;

  } while (!wallFound);

  return borderTestResults;
}

export const checkBorderOf2dArray = (twoDeeArr, valueToFind, facingFromOrigin = {x: 0, y: -1}) => {

  // in theory, I should never be passing in an array with an even number of indices
  if ((twoDeeArr.length - 1) % 2 > 0) {
    return null;
  }

  let radius = (twoDeeArr.length - 1) / 2; // the 2d array will always be an odd number length so this works... 
  let startX = facingFromOrigin.x === 0 ? radius : facingFromOrigin.x > 0 ? radius * 2 : 0;
  let startY = facingFromOrigin.y === 0 ? radius : facingFromOrigin.y > 0 ? radius * 2 : 0;
  let iter = 1;
  let maxChecks = (twoDeeArr.length - 1) * 4; 
  let counterClockwiseCoordinates = {x: startX, y: startY};
  let clockwiseCoordinates = {x: startX, y: startY}; 
  let directionFound = false;
  do {
    // do the single initial check
    if (iter === 1) {
      // if the first check is a wall, then that's the closest wall
      if (twoDeeArr[startY][startX] === valueToFind) {
        return ({x: startX, y: startY});
      }
    }
    // else, we're iterating through ccw and cw checks
    else {
      counterClockwiseCoordinates = getCounterClockwiseCoordinate(counterClockwiseCoordinates.x, counterClockwiseCoordinates.y, twoDeeArr.length);
      clockwiseCoordinates = getClockwiseCoordinate(clockwiseCoordinates.x, clockwiseCoordinates.y, twoDeeArr.length);
      let counterClockwiseTile = twoDeeArr[counterClockwiseCoordinates.y][counterClockwiseCoordinates.x];
      let clockwiseTile = twoDeeArr[clockwiseCoordinates.y][clockwiseCoordinates.x];
      // if both coordinates are valueToFind
      if (counterClockwiseTile === valueToFind && clockwiseTile === valueToFind) {
        // false will be ccw, true will be cw
        return [ Math.random() < 0.5 ? counterClockwiseCoordinates : clockwiseCoordinates, radius ];
      }
      // else if only one matches
      else if (counterClockwiseTile === valueToFind || clockwiseTile === valueToFind) {
        return [ counterClockwiseTile === valueToFind ? counterClockwiseCoordinates : clockwiseCoordinates, radius ];
      }
    }
    iter += 1;
  } while (!directionFound && iter <= maxChecks);

  return null;
}


const getCounterClockwiseCoordinate = (x, y, arrayLength) => {

  switch(true) {
    case y === 0 && x > 0: // top row except top left corner
      return ({x: x - 1, y: y});
    case x === 0 && y < arrayLength - 1: // left column except bottom left corner
      return ({x: x, y: y + 1 });
    case y === arrayLength - 1 && x < arrayLength - 1: // bottom row except bottom right corner
      return ({x: x + 1, y: y});
    case x === arrayLength - 1 && y > 0: // right column except top right corner
      return ({x: x, y: y - 1});
    default: return new Error("what the hell happened??");
  }
}


const getClockwiseCoordinate = (x, y, arrayLength) => {

  switch(true){
    case y === 0 && x < arrayLength - 1: // top row except top right corner
      return ({x: x + 1, y: y});
    case x === arrayLength - 1 && y < arrayLength - 1: // right column except bottom right corner
      return ({x: x, y: y + 1});
    case y === arrayLength - 1 && x > 0: // bottom row except bottom left corner
      return ({x: x - 1, y: y});
    case y > 0 && x === 0: // left column except top left corner
      return ({x: x, y: y - 1 });
    default: return new Error("what the hell happened??");
  }
}

export const deriveDirectionFromCoordinates = (coordinates, radius) => {
  /*
    say coordinates is {x: 4, y: 1} and radius is 2
    I would want to return {x: 1, y: -1}
  */
  let direction = {x: 0, y: 0};
  if (coordinates.x > radius) direction.x = 1;
  else if (coordinates.x < radius) direction.x = -1;
  // if (coordinates.x === radius) direction.x = 0;
  if (coordinates.y > radius) direction.y = 1;
  else if (coordinates.y < radius) direction.y = -1;
  // if (coordinates.y === radius) direction.y = 0;
  return direction;
}

export const shouldCreatureTurn = (critter, area) => {

}



export const DIRECTION_NAMES = "n ne e se s sw w nw".split(" ");

export const DIRECTION_BY_STRING = {
  "n": { x: 0, y: -1 }, //n
  "ne": { x: 1, y: -1 }, //ne
  "e": { x: 1, y: 0 },  //e
  "se": { x: 1, y: 1 },  //se
  "s": { x: 0, y: 1 },  //s
  "sw": { x: -1, y: 1 },//sw
  "w": { x: -1, y: 0 }, //w
  "nw": { x: -1, y: -1 } //nw
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
];

export const CARDINAL_STRING_FROM_COORDINATE = {
  "0,-1": "n",
  "1,-1": "ne",
  "1,0": "e",
  "1,1": "se",
  "0,1": "s",
  "-1,1": "sw",
  "-1,0": "w",
  "-1,-1": "nw"
}

export const getCardinalString = (x, y) => {
  if (x === 0) {
    if (y === 1) return "s";
    else return "n";
  }
  else if (x === 1) {
    if (y === 0) return "e";
    else if (y === 1) return "se";
    else if (y === -1) return "ne";
  }
  else if (x === -1) {
    if (y === 0) return "w";
    else if (y === 1) return "sw";
    else if (y === -1) return "nw";
  }
}


