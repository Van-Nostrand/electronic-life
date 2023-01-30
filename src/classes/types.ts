export type TCoordinates = {
  x: number
  y: number
}

export interface ICritterProps {
  classString?: string
  critterType?: string
  foodChain?: number
  position?: TCoordinates
  x: number
  y: number
  facing?: TCoordinates
  speed?: number
}

export interface ICritter extends ICritterProps {
  view: Array<boolean> | null
  setPosition (newPos: TCoordinates): void
  setFacing (newFacing: TCoordinates): void
  takeTurn (world: undefined | string[][] ): this | Error
}

export interface IWallFollower extends ICritter {
  hasFoundWall: boolean
  wallCoordinate: {
    coordinates: TCoordinates,
    radius: number
  }
  movesClockwise: boolean
}
