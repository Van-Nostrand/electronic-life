export type TCoordinates = {
  x: number
  y: number
}

export interface IRelativeCoordinates {
  coordinates: TCoordinates
  radius: number
}

export interface IWorldProps {
  worldMap: string[][]
  critters: ICritter[]
}

export interface ICritterProps {
  type?: string
  x: number
  y: number
  tileSize?: number
  facing?: {
    x: number
    y: number
  }
  foodChain?: number
  speed?: number
  view?: any
}

export interface ICritterElementProps {
  tileSize: number
  x: number
  y: number
  critter: ICritter
}

export type TCoordVoidFunc = (x: number, y: number) => void

export interface ICritter extends ICritterProps {
  takeTurn: (() => this | Error) | ((world: string[][]) => this | Error)
  // getLocation: () => { x:number, y:number }
  // setLocation: TCoordVoidFunc
  // getFacing: () => { x:number, y:number }
  // setFacing: TCoordVoidFunc
  // getFoodChain: () => number
  // getType: () => string
  // getSpeed: () => number
  // getClassString: () => string
}

export interface IWallFollower extends ICritter {
  hasFoundWall: boolean
  wallCoordinate: {
    coordinates: TCoordinates,
    radius: number
  }
  movesClockwise: boolean
}
