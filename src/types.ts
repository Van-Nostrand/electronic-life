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
  creatures: any
}

export interface ICritterProps {
  creatureType?: string
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

export interface ICritter extends ICritterProps {
  getLocation: () => { x:number, y:number }
  setLocation: (x:number, y:number) => void
  getFacing: () => { x:number, y:number }
  setFacing: (x:number, y:number) => void
  getFoodChain: () => number
  getType: () => string
  getSpeed: () => number
  getClassString: () => string
}
