import Critter from './Critter';

export default class WallFollower extends Critter {

  constructor(x, y, facing) {
    super(x, y, facing, 0, 1, "w");

    this.classString = 'critter wall-follower'
  }
}