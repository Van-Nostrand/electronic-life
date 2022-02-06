import { ICoordinates } from '@/types'

export interface ICritterProps {
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  }
}

export interface ICritterClass {
  x: number
  y: number
  facing: ICoordinates
  classString: string
  foodChain?: number
  speed?: number
  critterType?: string
}
