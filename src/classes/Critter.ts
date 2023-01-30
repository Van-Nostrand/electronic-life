import { TCoordinates, ICritterProps, ICritter } from '@/types'

export default class Critter implements ICritter {
  x: number
  y: number
  type: string
  facing: TCoordinates
  foodChain: number
  speed: number
  view: any

  constructor (props: ICritterProps) {
    this.type = props.type || 'b'
    this.view = props.view
    this.x = props.x || -1
    this.y = props.y || -1
    this.facing = props.facing || { x: -1, y: -1 }
    this.foodChain = props.foodChain || 0
    this.speed = props.speed || 1
  }

  takeTurn (): this | Error {
    return this
  }
}
