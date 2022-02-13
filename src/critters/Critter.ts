import {
  ICoordinates,
  TWorldMap
} from '@/types'
import {
  ICritterProps,
  ICritter
} from '@/critters/types'

export default function Critter (props: ICritterProps): ICritter {

  return ({
    ...props,
    view: null,
    setPosition (newPos): void {
      this.x = newPos.x
      this.y = newPos.y
    },

    setFacing (newFacing: ICoordinates): void {
      this.facing = newFacing
    },

    takeTurn (world?: TWorldMap): ICritter | Error { world; return this }
  })
}
