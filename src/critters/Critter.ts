import { ICritterProps } from '@/types'

// export default class Critter implements ICritterProps {
export default function Critter (props: ICritterProps) {

  return  ({
    // x: props.x
    // y: props.y
    // facing     : props.facing
    // foodChain  : props.foodChain
    // speed      : props.speed
    // critterType: props.critterType
    // classString: 'critter'
    ...props,
    setPosition (newPos: {x: number; y: number;}): void {
      this.x = newPos.x
      this.y = newPos.y
    },

    setFacing (newFacing: {x: number; y: number;}): void {
      this.facing = newFacing
    },

    takeTurn (): void {}
  })
}
