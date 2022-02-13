import { ICritterProps } from '@/critters/types'

export type TWorldMap = Array<Array<string>>

export type IWorldProps = {
  worldMap: TWorldMap;
  critters: Array<ICritterProps>;
}

export interface ICoordinates {
  x: number;
  y: number;
}

// use radius and coordinates to describe how far from a point another point is, and in which direction
export interface IRelativeCoordinates {
  coordinates: ICoordinates;
  radius: number;
}
