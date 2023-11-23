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
};

export type TileType = {
  type: string;
  overlay?: string;
};

export enum ENTITY_STATUSES {
  IDLE = 'idle',
  WALK = 'walk',
}

export type EntityType = {
  id: string;
  type: string;
  isActive: boolean;
  direction: Vector;
  status: ENTITY_STATUSES;
  position: Vector;
  size: Size;
  hitBox: {
    position: Vector;
    size: Size;
  };
};

export type GameState = {
  isPaused: boolean;
  physicsFrame: number;
  isLevelReady: boolean;
  aspectRatio: number;
  level: TileMap;
  cameraOffset: Vector;
  player: EntityType;
  entities: EntityType[];
};

export type GameSliceState = {
  appStatus: string;
  gameState: GameState;
  keysDown: ObjectOfBooleans;
};

export type TileMap = {
  [key: string]: TileType;
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
