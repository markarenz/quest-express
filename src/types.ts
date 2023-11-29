export type Vector = {
  x: number;
  y: number;
};

export type Size = {
  h: number;
  w: number;
};

export type TileDef = {
  walkable: boolean;
  spritePosition: Vector;
  action?: string;
};

export type TileInstance = {
  type: string;
  overlay?: string;
  actionValue?: string; // for teleport
};

export enum ENTITY_STATUSES {
  IDLE = 'idle',
  WALK = 'walk',
}

export type EntityDef = {
  isActive: boolean;
  status: ENTITY_STATUSES;
  area?: number; // only needed for player
  size: Size;
  hitBox: {
    position: Vector;
    size: Size;
  };
  // type: string;
  // id: string;
  // direction: Vector;
  // position: Vector;
};

type EntityTileMapInstance = {
  id: string;
  type: string;
  direction: Vector;
  position: Vector;
};

// export type EntityInstance = EntityDef & EntityTileMapInstance;

// extends EntityDef {
//   id: string;
//   type: string;
//   direction: Vector;
//   position: Vector;
// }

export type EntityInstance = {
  id: string;
  type: string;
  isActive: boolean;
  direction: Vector;
  status: ENTITY_STATUSES;
  position: Vector;
  area?: number;
  size: Size;
  hitBox: {
    position: Vector;
    size: Size;
  };
};

export type Area = {
  tileMap: TileMap;
  entities: EntityTileMapInstance[];
};

export type Level = {
  playerInit: Vector;
  startArea: number;
  areas: { [key: string]: Area };
};

export type GameState = {
  isPaused: boolean;
  currentTransition?: string;
  physicsFrame: number;
  isLevelReady: boolean;
  screen: {
    size: Size;
    aspectRatio: number;
    scale: number;
  };
  level: Level;
  cameraOffset: Vector;
  player: EntityInstance;
  entities: EntityInstance[];
};

export type GameSliceState = {
  appStatus: string;
  gameState: GameState;
  keysDown: ObjectOfBooleans;
};

export type TileMap = {
  [key: string]: TileInstance;
};

export type Vectors = {
  [key: string]: Vector;
};

export type ObjectOfBooleans = {
  [key: string]: boolean;
};
export type ObjectOfStrings = {
  [key: string]: string;
};

export const DIRECTIONS = {
  NONE: { x: 0, y: 0 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
};
