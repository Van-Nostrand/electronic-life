

export const viewAllSurroundingTiles = (critter, worldMap) => {

  let startingX = critter.x - 1;
  let startingY = critter.y - 1;
  let immediateSurroundings = [];

  immediateSurroundings.push( 
    worldMap[startingY].slice(startingX, startingX + 3)
  )
  immediateSurroundings.push(
    worldMap[startingY + 1].slice(startingX, startingX + 3)
  )
  immediateSurroundings.push(
    worldMap[startingY + 2].slice(startingX, startingX + 3)
  )

  return immediateSurroundings;
}
