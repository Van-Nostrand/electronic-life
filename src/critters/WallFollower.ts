import Critter from './Critter'
import {
  IRelativeCoordinates,
  // ICoordinates,
  ICritter
} from '@/types'
import {
  findNearestWall,
  deriveDirectionFromCoordinates,
  // getCounterClockwiseCoordinate,
  // getClockwiseCoordinate,
  // moveClockwiseAroundCoordinate,
  // moveCounterClockwiseAroundCoordinate,
  findNextSpaceToMoveAlongWall
} from '@/constants/helperFunctions' // temporary

import { ALL_CRITTER_TYPES } from '../constants/CONSTANTS'

export default class WallFollower extends Critter {
  hasFoundWall: boolean
  wallCoordinate: IRelativeCoordinates
  movesClockwise: boolean

  constructor (props: ICritter) {
    super(props)
    this.foodChain = 1
    this.speed = 1
    this.critterType = 'w'
    this.classString = 'critter wall-follower'
    this.hasFoundWall = false
    this.wallCoordinate = null
    this.movesClockwise = Math.floor(Math.random() * 2) === 0
  }

  // updateWallCoordinate(): void {
  //   if (this.wallCoordinate.radius > 1) this.wallCoordinate.radius -= 1;
  //   if (Math.abs(this.wallCoordinate.coordinates.x) > this.wallCoordinate.radius || Math.abs(this.wallCoordinate.coordinates.y) > this.wallCoordinate.radius) {

  //   }
  // }

  // wall followers turn is a bit more complicated than bouncing critter
  // if they aren't hugging a wall, they search their immediate surroundings for the nearest wall relative to their perspective (facing);
  // then, if they're not beside that wall, they align their perspective to move towards it.
  // if they're beside the wall, then the wall is found (hasFoundWall) and its coordinates are stored (wallCoordinate)
  // I haven't written functions detailing how they will move along the walls yet...
  takeTurn (worldMap?: Array<Array<string>>): this | void {

    let hasChosenDirection = false
    let newDirection = { ...this.facing }

    do {
      // if the critter has not found a wall yet (game has just started?)
      if (!this.hasFoundWall) {
        // temporarily using imported function
        const wallCoordinate: IRelativeCoordinates = findNearestWall(this, worldMap)
        newDirection = deriveDirectionFromCoordinates(wallCoordinate.coordinates, { x: this.x, y: this.y })
        console.log('src/critters/WallFollower.ts: newDirection is ', newDirection)
        this.wallCoordinate = wallCoordinate
        this.hasFoundWall = true
      }
      // not at the wall yet
      else if (this.hasFoundWall && this.wallCoordinate.radius > 1) {
        const wallCoordinate: IRelativeCoordinates = findNearestWall(this, worldMap)

        newDirection = deriveDirectionFromCoordinates(wallCoordinate.coordinates, { x: this.x, y: this.y })
        this.wallCoordinate = wallCoordinate
        hasChosenDirection = true
      }
      // the critter is next to the wall when radius is 1
      else if (this.hasFoundWall && this.wallCoordinate.radius === 1) {
        let { newDirection, wallCoordinate } = findNextSpaceToMoveAlongWall(worldMap, this)
        this.wallCoordinate = wallCoordinate

        // determine the next cell that the critter will face
        // newDirection = this.movesClockwise ?
        //   moveClockwiseAroundCoordinate(newDirection)
        //   :
        //   moveCounterClockwiseAroundCoordinate(newDirection);

        // get the value of the cell at that coordinate
        const testCell = worldMap[this.y + newDirection.y][this.x + newDirection.x]

        // if the cell is clear, success!!
        if (testCell === ' ') {
          // this.setFacing(newDirection);
          hasChosenDirection = true
        }
        else if (testCell === '#') {
          // reassigning wallCoordinate to newly found wall
          this.wallCoordinate = { coordinates: { x: this.x + newDirection.x, y: this.y + newDirection.y }, radius: 1 }
          newDirection = deriveDirectionFromCoordinates(this.wallCoordinate.coordinates, { x: this.x, y: this.y })
        }
        else if (ALL_CRITTER_TYPES.includes(testCell)) {
          // the cell contains another critter and WallFollower is not a predator so it can't move there.
          // for now, it's just going to wait a turn
          // todo - implement clockwise switching, and if it tests both sides and can't find a path then make it wait a turn
          newDirection = { x: 0, y: 0 }
          hasChosenDirection = true
        }
      }
    } while (!hasChosenDirection)

    this.setFacing(newDirection)
    // move the critter
    this.setPosition({ x: this.facing.x + this.x, y: this.facing.y + this.y })
    return this
  }
}
/*
  critter is at 5,4
  critter.facing = 0,-1
  relativePosition = 4,0
  radius = 2
  newFacing = deriveDirection((4,0), 2) = 1,-1

  ....#
  .....
  ..w..
  .....
  .....

  ..#
  .w.
  ...

  "############",
  "#          #",
  "#  ....###.#",
  "#  ........#",
  "#....w.....#",
  "#          #",
  "#          #",
  "#          #",
  "#          #",
  "#          #",
  "#          #",
  "############"
*/

/*
          critter.facing = 0,-1
          relativePosition = 4,0
          radius = 2
          newFacing = deriveDirection((4,0), 2) = 1,-1

          getClockwiseCoordinate takes x, y, arrayLength
          but I need to pass in coordinates as if the wall is the center of a 2d array and the critter is in the border
          critter is at 5,4
          how do I get 0,2 from that?
          facing is 1,-1 thats the wall (@ 6,3)
          getClockwiseCoordinate(0,2,3)
          getClockwiseCoordinate()

             +++
            .+#+
            .w++
            ...
          */
