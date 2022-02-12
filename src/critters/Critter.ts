import {
  ICoordinates,
} from '@/types'
import {
  ICritterProps,
  ICritter
} from '@/critters/types'

export default function Critter (props: ICritterProps): ICritter {

  return ({
    ...props,
    setPosition (newPos): void {
      this.x = newPos.x
      this.y = newPos.y
    },

    setFacing (newFacing: ICoordinates): void {
      this.facing = newFacing
    },

    takeTurn () {}
  })
}
