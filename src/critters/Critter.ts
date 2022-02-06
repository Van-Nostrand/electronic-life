import { ICoordinates, ICritterProps } from '../types'

export default class Critter {
  x: number
  y: number
  facing: ICoordinates
  classString: string
  foodChain?: number
  speed?: number
  critterType?: string

  constructor (props: ICritterProps) {
    this.x              = props.x
    this.y              = props.y
    this.facing         = props.facing

    this.classString    = 'critter'
  }

  setPosition (newPos: {x: number; y: number;}): void {
    this.x = newPos.x
    this.y = newPos.y
  }

  setFacing (newFacing: {x: number; y: number;}): void {
    this.facing = newFacing
  }

  takeTurn (): void {
    return
  }

}
