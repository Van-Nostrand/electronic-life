import {
  IRelativeCoordinates,
  ICoordinates
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
  setPosition (newPos: ICoordinates): void;
  setFacing (newFacing: ICoordinates): void;
  takeTurn (): void;
}

export interface IWallFollower extends ICritter {
  hasFoundWall: boolean;
  wallCoordinate: {
    coordinates: ICoordinates,
    radius: number;
  };
  movesClockwise: boolean;
}
