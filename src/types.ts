export interface ICritterProps {
  x: number
  y: number
  tileSize?: number
}

export interface IWorldProps {
  worldMap: string[][]
  creatures: any
}

export interface ICreatureProps {
  creatureType: string
  x: number
  y: number
  facing?: {
    x: number
    y: number
  }
  foodChain?: number
  speed?: number
  view?: any
}

export interface ICreature extends ICreatureProps {
  getLocation: () => { x:number, y:number }
  setLocation: (x:number, y:number) => void
  getFacing: () => { x:number, y:number }
  setFacing: (x:number, y:number) => void
  getFoodChain: () => number
  getType: () => string
  getSpeed: () => number
  getClassString: () => string
}
