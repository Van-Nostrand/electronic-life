export const POPULATE_WORLD = "POPULATE_WORLD";
export const TAKE_TURN = "TAKE_TURN";
export const START_TIMER = "START_TIMER";

export function populateWorld(){
  return {
    type: POPULATE_WORLD
  }
}

export function takeTurn(){
  return {
    type: TAKE_TURN
  }
}

export function startTimer(){
  return {
    type: START_TIMER
  }
}
