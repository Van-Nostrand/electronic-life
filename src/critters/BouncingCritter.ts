import Critter from './Critter';

export default class BouncingCritter extends Critter {
  
  constructor(x, y, facing) {
    super(x, y, facing, 0, 1, "b");

    this.classString = 'critter bouncing-critter'
  }
}
