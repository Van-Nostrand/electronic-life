import { ICritterProps, ICritter } from '@/types'

export default function Critter (props: ICritterProps): ICritter {

  return  ({
    ...props,
    setPosition (newPos) {
      this.x = newPos.x
      this.y = newPos.y
    },

    setFacing (newFacing) {
      this.facing = newFacing
    },

    takeTurn () {}
  })
}
