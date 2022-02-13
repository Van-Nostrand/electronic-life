import {
  ICoordinates,
  TWorldMap
} from '@/types'

export interface ICritterProps {
  classString?: string;
  critterType?: string;
  foodChain?: number;
  position?: ICoordinates;
  x: number;
  y: number;
  facing?: ICoordinates;
  speed?: number;
}

export interface ICritter extends ICritterProps {
  view: Array<boolean> | null
  setPosition (newPos: ICoordinates): void;
  setFacing (newFacing: ICoordinates): void;
  takeTurn (world: undefined | TWorldMap ): this | Error;
}

export interface IWallFollower extends ICritter {
  hasFoundWall: boolean;
  wallCoordinate: {
    coordinates: ICoordinates,
    radius: number;
  };
  movesClockwise: boolean;
}
