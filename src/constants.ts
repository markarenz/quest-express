import { GameState, TileDef, ENTITY_STATUSES, DIRECTIONS, Size } from './types';
import { getScreenDimensions } from './components/game/gameUtils';
import { area_1_0 } from './constants_area_1_0';
import { area_1_1 } from './constants_area_1_1';

export const TILE_WIDTH = 32;

export const tileDefs: { [key: string]: TileDef } = {
  floor1: {
    walkable: true,
    spritePosition: { x: 3, y: 2 },
  },
  floor2: {
    walkable: true,
    spritePosition: { x: 4, y: 2 },
  },
  floor3: {
    walkable: true,
    spritePosition: { x: 5, y: 2 },
  },
  wall1t: {
    walkable: false,
    spritePosition: { x: 3, y: 0 },
  },
  wall1b: {
    walkable: false,
    spritePosition: { x: 3, y: 1 },
  },
  wall2t: {
    walkable: false,
    spritePosition: { x: 4, y: 0 },
  },
  wall2b: {
    walkable: false,
    spritePosition: { x: 4, y: 1 },
  },
  wall3t: {
    walkable: false,
    spritePosition: { x: 5, y: 0 },
  },
  wall3b: {
    walkable: false,
    spritePosition: { x: 5, y: 1 },
  },
  wall4t: {
    walkable: false,
    spritePosition: { x: 6, y: 0 },
  },
  wall4b: {
    walkable: false,
    spritePosition: { x: 6, y: 1 },
  },
  edge_tl: {
    walkable: false,
    spritePosition: { x: 0, y: 0 },
  },
  edge_t: {
    walkable: false,
    spritePosition: { x: 1, y: 0 },
  },
  edge_tr: {
    walkable: false,
    spritePosition: { x: 2, y: 0 },
  },
  edge_l: {
    walkable: false,
    spritePosition: { x: 0, y: 1 },
  },
  edge_top: {
    walkable: false,
    spritePosition: { x: 1, y: 1 },
  },
  edge_b: {
    walkable: false,
    spritePosition: { x: 1, y: 2 },
  },
  edge_bl: {
    walkable: false,
    spritePosition: { x: 0, y: 2 },
  },
  edge_br: {
    walkable: false,
    spritePosition: { x: 2, y: 2 },
  },
  edge_r: {
    walkable: false,
    spritePosition: { x: 2, y: 1 },
  },
  edge_cap_up: {
    walkable: false,
    spritePosition: { x: 7, y: 0 },
  },
  edge_cap_down: {
    walkable: false,
    spritePosition: { x: 7, y: 1 },
  },
  edge_cap_left: {
    walkable: false,
    spritePosition: { x: 6, y: 2 },
  },
  edge_cap_right: {
    walkable: false,
    spritePosition: { x: 7, y: 2 },
  },
  edge_corner_inside_br: {
    walkable: false,
    spritePosition: { x: 0, y: 3 },
  },
  edge_corner_inside_bl: {
    walkable: false,
    spritePosition: { x: 1, y: 3 },
  },
  edge_corner_inside_tr: {
    walkable: false,
    spritePosition: { x: 0, y: 4 },
  },
  edge_corner_inside_tl: {
    walkable: false,
    spritePosition: { x: 1, y: 4 },
  },
  edge_corner_outside_br: {
    walkable: false,
    spritePosition: { x: 1, y: 6 },
  },
  edge_corner_outside_bl: {
    walkable: false,
    spritePosition: { x: 0, y: 6 },
  },
  edge_corner_outside_tl: {
    walkable: false,
    spritePosition: { x: 0, y: 5 },
  },
  edge_corner_outside_tr: {
    walkable: false,
    spritePosition: { x: 1, y: 5 },
  },

  edge_b_tr: {
    walkable: false,
    spritePosition: { x: 2, y: 3 },
  },
  edge_b_tl: {
    walkable: false,
    spritePosition: { x: 3, y: 3 },
  },
  edge_t_br: {
    walkable: false,
    spritePosition: { x: 2, y: 4 },
  },
  edge_t_bl: {
    walkable: false,
    spritePosition: { x: 3, y: 4 },
  },
  edge_tr_br: {
    walkable: false,
    spritePosition: { x: 4, y: 3 },
  },
  edge_t_b: {
    walkable: false,
    spritePosition: { x: 5, y: 3 },
  },
  edge_tl_bl: {
    walkable: false,
    spritePosition: { x: 6, y: 3 },
  },
  edge_bl_br: {
    walkable: false,
    spritePosition: { x: 4, y: 4 },
  },
  edge_tl_tr: {
    walkable: false,
    spritePosition: { x: 4, y: 6 },
  },
  edge_l_br: {
    walkable: false,
    spritePosition: { x: 2, y: 5 },
  },
  edge_l_tr: {
    walkable: false,
    spritePosition: { x: 2, y: 6 },
  },
  edge_r_bl: {
    walkable: false,
    spritePosition: { x: 3, y: 5 },
  },
  edge_r_tl: {
    walkable: false,
    spritePosition: { x: 3, y: 6 },
  },
  edge_l_r: {
    walkable: false,
    spritePosition: { x: 4, y: 5 },
  },

  stairs_up_n: {
    walkable: true,
    spritePosition: { x: 6, y: 6 },
    action: 'go_up',
  },
  stairs_down_n: {
    walkable: true,
    spritePosition: { x: 5, y: 6 },
    action: 'go_down',
  },

  stairs_up_s: {
    walkable: true,
    spritePosition: { x: 6, y: 7 },
    action: 'go_up',
  },
  stairs_down_s: {
    walkable: true,
    spritePosition: { x: 5, y: 7 },
    action: 'go_down',
  },

  // OVERLAYS: SHADOWS
  shadow_lf: {
    walkable: true,
    spritePosition: { x: 7, y: 3 },
  },
  shadow_l: {
    walkable: true,
    spritePosition: { x: 7, y: 4 },
  },
  shadow_t: {
    walkable: true,
    spritePosition: { x: 5, y: 5 },
  },
  shadow_tf: {
    walkable: true,
    spritePosition: { x: 6, y: 5 },
  },
  shadow_tl: {
    walkable: true,
    spritePosition: { x: 6, y: 4 },
  },
  shadow_tl_corner: {
    walkable: true,
    spritePosition: { x: 7, y: 5 },
  },
};

export const entityDefs: { [key: string]: Size } = {
  player: {
    w: 1,
    h: 1,
  },
  plant: {
    w: 1,
    h: 2,
  },
};

export const initialGameState: GameState = {
  isPaused: false,
  isLevelReady: false,
  screen: getScreenDimensions(),
  physicsFrame: 0,
  cameraOffset: {
    x: 0,
    y: 0,
  },
  level: {
    playerInit: {
      x: 5,
      y: 5,
    },
    startArea: 0,
    // separate tilemap and entities - or instantiate them from data?
    areas: {
      0: area_1_0,
      1: area_1_1,
    },
  },
  player: {
    id: 'player',
    type: 'player',
    area: 0,
    isActive: true,
    direction: DIRECTIONS.NONE,
    status: ENTITY_STATUSES.IDLE,
    position: {
      x: 6,
      y: 9,
    },
    size: {
      h: 1,
      w: 1,
    },
    hitBox: {
      position: {
        x: 0,
        y: 0.5,
      },
      size: {
        h: 0.5,
        w: 1,
      },
    },
  },
  entities: [],
};

export const INPUT_MAPPINGS: { [key: string]: string } = {
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right',
};

export const SPRITE_FRAMES: any = {
  plant: {
    idle: {
      none: [[0, 4]],
    },
  },
  player: {
    walk: {
      up: [
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 3],
      ],
      down: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      left: [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
      ],
      right: [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
      ],
    },
    idle: {
      up: [[3, 3]],
      down: [[3, 0]],
      left: [[3, 1]],
      right: [[3, 2]],
    },
  },
};
