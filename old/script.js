const WORLD_DIV = document.getElementById("playground");
const DIRECTION_NAMES = "n ne e se s sw w nw".split(" ");
const PLAN = [
  "############################",
  "#      #    #      o      ##",
  "#                          #",
  "#          #####           #",
  "##         #   #    ##     #",
  "###           ##     #     #",
  "#           ###      #     #",
  "#   ####                   #",
  "#   ##       o             #",
  "# o  #         o       ### #",
  "#    #                     #",
  "############################"
];

class Vector{
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  };
}

const DIRECTIONS = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

class Grid{
  constructor(width, height){
    this.space = new Array(width*height);
    this.width = width;
    this.height = height;
  }

  //vector is inside the world?
  isInside(vector){
    return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
  }

  //get the vector
  get(vector){
    return this.space[vector.x + this.width * vector.y];
  }

  //set the vector
  set(vector, value){
    this.space[vector.x + this.width * vector.y] = value;
  }

  forEach(f, context){
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var value = this.space[x + y * this.width];
        if (value != null)
          f.call(context, value, new Vector(x, y));
      }
    }
  }
}

class View{
  constructor(world, vector) {
    this.world = world;
    this.vector = vector;
  }

  look(dir) {
    let target = this.vector.plus(DIRECTIONS[dir]);
    if (this.world.grid.isInside(target))
      return charFromElement(this.world.grid.get(target));
    else
      return "#";
  };

  findAll(ch) {
    var found = [];
    for (var dir in DIRECTIONS)
      if (this.look(dir) == ch)
        found.push(dir);
    return found;
  };

  find(ch) {
    var found = this.findAll(ch);
    if (found.length == 0) return null;
    return randomElement(found);
  };
}

class BouncingCritter{
  constructor(){
    this.direction = randomElement(DIRECTION_NAMES);
  }

  act(view){
    if (view.look(this.direction) != " ")
      this.direction = view.find(" ") || "s";
    return {type: "move", direction: this.direction};
  }
}

class World{
  constructor(mapArray, legend, portal, worldDiv){
    this.grid = new Grid(mapArray[0].length, mapArray.length);
    this.legend = legend;
    mapArray.forEach((line, y) => {
      for(let x = 0; x < line.length; x++){
        this.grid.set(new Vector(x,y), elementFromChar(legend, line[x]));
      }
    });
    this.portal = portal;
    // this.worldRef = worldDiv;
  }

  toString(){
    let output = "";
    for (var y = 0; y < this.grid.height; y++) {
      for (var x = 0; x < this.grid.width; x++) {
        var element = this.grid.get(new Vector(x, y));
        output += charFromElement(element);
      }
      output += "\n";
    }
    return output;
  }

  turn(){
    let acted = [];
    console.log(this.grid.space);
    this.grid.space.forEach((critter, vector) => {
      if (critter !== null && critter.act && acted.indexOf(critter) == -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
    this.portal.innerHTML = this.toString();
  }

  letAct(critter, vector){
    let action = critter.act(new View(this, vector));
    if (action && action.type == "move") {
      let dest = this.checkDestination(action, vector);
      if (dest && this.grid.get(dest) == null) {
        this.grid.set(vector, null);
        this.grid.set(dest, critter);
      }
    }
  }

  start(){
    setInterval(() => {
      console.log("setinterval!")
      this.turn;
    }, 1000);
  }

  checkDestination(action, vector){
    if (DIRECTIONS.hasOwnProperty(action.direction)) {
      let dest = vector.plus(DIRECTIONS[action.direction]);
      if (this.grid.isInside(dest))
        return dest;
    }
  }
}

let actionTypes = Object.create(null);

class LifelikeWorld extends World{
  constructor(map, legend) {
    super(map, legend);
  }

  letAct(critter, vector) {
    let action = critter.act(new View(this, vector));
    let handled = action &&
      action.type in actionTypes &&
      actionTypes[action.type].call(this, critter,
                                    vector, action);
    if (!handled) {
      critter.energy -= 0.2;
      if (critter.energy <= 0)
        this.grid.set(vector, null);
    }
  };
}

//"A wall is a simple object - it is used only for taking up space and has no act() method
function Wall(){}

let world = new World(PLAN, {"#": Wall, "o": BouncingCritter}, WORLD_DIV);
world.start();
WORLD_DIV.textContent = world.toString();

////////////////////////////
// uncomment to test 5 turns
////////////////////////////
// for (var i = 0; i < 5; i++) {
//   world.turn();
//   WORLD_DIV.textContent = world.toString();
// }

function dirPlus(dir, n) {
  var index = DIRECTION_NAMES.indexOf(dir);
  return DIRECTION_NAMES[(index + n + 8) % 8];
}

class WallFollower{
  constructor(){
    this.dir = "s";
  }
  act(view) {
    var start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) != " ")
      start = this.dir = dirPlus(this.dir, -2);
    while (view.look(this.dir) != " ") {
      this.dir = dirPlus(this.dir, 1);
      if (this.dir == start) break;
    }
    return {type: "move", direction: this.dir};
  };
}



// animateWorld(new World(
//   ["############",
//    "#     #    #",
//    "#   ~    ~ #",
//    "#  ##      #",
//    "#  ##  o####",
//    "#          #",
//    "############"],
//   {"#": Wall,
//    "~": WallFollower,
//    "o": BouncingCritter}
// ));

//create a char for the updated plan? I think?
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

//this translates characters to world elements.
function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;// keep info on the original character
  return element;
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
