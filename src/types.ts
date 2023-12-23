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
  size: Size;
  hitBox: {
    position: Vector;
    size: Size;
  };
};

type EntityTileMapInstance = {
  id: string;
  type: string;
  direction?: Vector;
  position: Vector;
};

export type EntityInstance = {
  id: string;
  type: string;
  isActive: boolean;
  direction?: Vector;
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
  pickups: PickupTileMapInstance[];
};

export type Level = {
  playerInit: Vector;
  startArea: number;
  areas: { [key: string]: Area };
};
export type EffectInstance = {
  id: string;
  type: string;
  position: Vector;
};

export type Screen = {
  size: Size;
  aspectRatio: number;
  scale: number;
};

export type GameState = {
  isPaused: boolean;
  currentTransition?: string;
  physicsFrame: number;
  isLevelReady: boolean;
  screen: Screen;
  level: Level;
  cameraOffset: Vector;
  inventory: ObjectOfNumbers;
  player: EntityInstance;
  entities: EntityInstance[];
  pickups: { [key: string]: PickupInstance };
  effects: EffectInstance[];
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
export type ObjectOfNumbers = {
  [key: string]: number;
};
export type ObjectOfImages = {
  [key: string]: HTMLImageElement;
};
export type ObjectOfAudio = {
  [key: string]: HTMLAudioElement;
};

export const DIRECTIONS = {
  NONE: { x: 0, y: 0 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
};

// PICKUPS

export type PickupDef = {
  size: Size;
  action: string;
  value: string;
  // refresh?
};

export type PickupTileMapInstance = {
  id: string;
  type: string;
  position: Vector;
};

export type PickupInstance = {
  id: string;
  type: string;
  position: Vector;

  size: Size;
  action: string;
  value: string;
};

export type PickupInstances = {
  [key: string]: PickupInstance;
};
