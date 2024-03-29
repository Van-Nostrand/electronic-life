// import { ICritter } from '@/types'
export const DEFAULT_PLAN = [
  '############################',
  '#      #b   #      w      ##',
  '#      #    #              #',
  '#      ##                  #',
  '#                          #',
  '#        ######            #',
  '#             #            #',
  '#             #####        #',
  '#    b                     #',
  '#               w          #',
  '#                          #',
  '#                    #     #',
  '#     ##      b      #     #',
  '#     ##         #   #     #',
  '#    ###          ####     #',
  '#   ## #                   #',
  '#   #   #           b      #',
  '#   #                      #',
  '#                          #',
  '#          #####           #',
  '##         #   #    ##     #',
  '###           ##     #     #',
  '#           ###      #     #',
  '#   ####                   #',
  '#   ##       b             #',
  '# b  #         b       ### #',
  '#    #                     #',
  '############################'
]
// export const DEFAULT_PLAN = [
//   '############',
//   '#      #  ##',
//   '#          #',
//   '# ##   ##  #',
//   '#    #     #',
//   '#b         #',
//   '############'
// ]
// export const DEFAULT_PLAN = [
//   '#####',
//   '#b  #',
//   '#   #',
//   '#####'
// ];

export const DIRECTION_NAMES = 'n ne e se s sw w nw'.split(' ')

export const DIRECTION_BY_STRING = {
  'n': { x: 0, y: -1 }, //n
  'ne': { x: 1, y: -1 }, //ne
  'e': { x: 1, y: 0 },  //e
  'se': { x: 1, y: 1 },  //se
  's': { x: 0, y: 1 },  //s
  'sw': { x: -1, y: 1 }, //sw
  'w': { x: -1, y: 0 }, //w
  'nw': { x: -1, y: -1 } //nw
}

export const DIRECTIONS = [
  { x: 0, y: -1 }, //n
  { x: 1, y: -1 }, //ne
  { x: 1, y: 0 },  //e
  { x: 1, y: 1 },  //se
  { x: 0, y: 1 },  //s
  { x: -1, y: 1 }, //sw
  { x: -1, y: 0 }, //w
  { x: -1, y: -1 } //nw
]

export const CARDINAL_STRING_FROM_COORDINATE = {
  '0,-1': 'n',
  '1,-1': 'ne',
  '1,0': 'e',
  '1,1': 'se',
  '0,1': 's',
  '-1,1': 'sw',
  '-1,0': 'w',
  '-1,-1': 'nw'
}
