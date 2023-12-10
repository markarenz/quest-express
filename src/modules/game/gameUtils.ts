import {
  Vector,
  ObjectOfBooleans,
  Vectors,
  EntityInstance,
  TileMap,
  TileInstance,
  ENTITY_STATUSES,
  GameSliceState,
  GameState,
  EffectInstance,
  ObjectOfImages,
  ObjectOfAudio,
} from '@/types';
import {
  INPUT_MAPPINGS,
  tileDefs,
  entityDefs,
  pickupDefs,
  GAME_IMAGE_SRC,
  GAME_SOUND_SRC,
} from '@/constants';

export const sigFigs = (num: number): number => Number(num.toFixed(2));

export const getMappedKey = (key: string): string => INPUT_MAPPINGS[key];

export const getScreenDimensions = () => {
  if (typeof window !== 'undefined') {
    const w = window?.innerWidth;
    const h = window?.innerHeight;

    const scale = w > 1240 ? 5 : w > 1024 ? 7 : w > 768 ? 10 : w > 486 ? 13 : 15;

    return {
      size: {
        w,
        h,
      },
      aspectRatio: w && h ? w / h : 1,
      scale,
    };
  }

  return {
    size: {
      w: 1,
      h: 1,
    },
    aspectRatio: 1,
    scale: 1,
  };
};

export const setCameraOffsetInit = (gameState: GameState) => {
  const {
    player,
    screen: { aspectRatio, scale },
  } = gameState;

  const xMid = 100 / scale / 2;
  const yMid = (1 / aspectRatio) * xMid;

  gameState.cameraOffset.x = xMid - player.position.x;
  gameState.cameraOffset.y = yMid - player.position.y;
};

export const getPlayerDirection = (keysDown: ObjectOfBooleans): Vector => {
  const direction: Vector = {
    x: 0,
    y: 0,
  };

  if (keysDown['left']) {
    direction.x = -1;
  } else if (keysDown['right']) {
    direction.x = 1;
  }

  if (keysDown['up']) {
    direction.y = -1;
  } else if (keysDown['down']) {
    direction.y = 1;
  }
  return direction;
};

export const getCornersFromEntity = (entity: EntityInstance, useHitBox = true): Vectors => {
  const x = useHitBox ? entity.hitBox.position.x : 0;
  const y = useHitBox ? entity.hitBox.position.y : 0;
  const h = useHitBox ? entity.hitBox.size.h : entity.size.h;
  const w = useHitBox ? entity.hitBox.size.w : entity.size.w;

  return {
    tl: {
      x: entity.position.x + x,
      y: entity.position.y + y,
    },
    tr: {
      x: entity.position.x + x + w,
      y: entity.position.y + y,
    },
    bl: {
      x: entity.position.x + x,
      y: entity.position.y + y + h,
    },
    br: {
      x: entity.position.x + x + w,
      y: entity.position.y + y + h,
    },
  };
};

export const checkCollisionEntity = (
  entityCorners: Vectors,
  otherEntity: EntityInstance,
  direction: Vector,
  speed: number,
): boolean => {
  const otherEntityCorners = getCornersFromEntity(otherEntity, true);
  return (
    Object.keys(entityCorners).some(
      (key) =>
        // simple collision check
        entityCorners[key].x > otherEntityCorners.tl.x &&
        entityCorners[key].x < otherEntityCorners.tr.x &&
        entityCorners[key].y > otherEntityCorners.tl.y &&
        entityCorners[key].y < otherEntityCorners.br.y,
    ) ||
    (direction.x < 0 &&
      entityCorners.tl.x <= otherEntityCorners.tr.x &&
      entityCorners.tl.y === otherEntityCorners.tr.y &&
      entityCorners.bl.x <= otherEntityCorners.br.x &&
      entityCorners.bl.y === otherEntityCorners.br.y &&
      entityCorners.tl.x > otherEntityCorners.tl.x &&
      entityCorners.bl.x > otherEntityCorners.bl.x) ||
    (direction.x > 0 &&
      entityCorners.tr.x >= otherEntityCorners.tl.x &&
      entityCorners.tr.y === otherEntityCorners.tl.y &&
      entityCorners.br.x >= otherEntityCorners.bl.x &&
      entityCorners.br.y === otherEntityCorners.bl.y &&
      entityCorners.tr.x < otherEntityCorners.tr.x &&
      entityCorners.br.x < otherEntityCorners.br.x) ||
    (direction.y < 0 &&
      entityCorners.tl.x === otherEntityCorners.bl.x &&
      entityCorners.tl.y <= otherEntityCorners.bl.y &&
      entityCorners.tr.x === otherEntityCorners.br.x &&
      entityCorners.tr.y <= otherEntityCorners.br.y &&
      entityCorners.tr.y > otherEntityCorners.tr.y &&
      entityCorners.tl.y > otherEntityCorners.tl.y) ||
    (direction.y > 0 &&
      entityCorners.bl.x === otherEntityCorners.tl.x &&
      entityCorners.bl.y >= otherEntityCorners.tl.y &&
      entityCorners.br.x === otherEntityCorners.tr.x &&
      entityCorners.br.y >= otherEntityCorners.tr.y &&
      entityCorners.br.y < otherEntityCorners.br.y &&
      entityCorners.bl.y < otherEntityCorners.bl.y)
  );
};

export const checkTileCollide = (points: Vector[], level: TileMap): boolean => {
  const coordsArr = points.map((point) => `${point.x},${point.y}`);
  return coordsArr.some(
    (coords) =>
      !!level[coords] && !!tileDefs[level[coords].type] && !tileDefs[level[coords].type].walkable,
  );
};

export const checkCollisionTiles = (
  entity: EntityInstance,
  direction: Vector,
  speed: number,
  level: TileMap,
) => {
  if (direction.x === 0 && direction.y === 0) {
    return direction;
  }

  const newDirection = { ...direction };
  const corners = getCornersFromEntity(entity, true);

  const pointsToCheckX = [];
  if (direction.x > 0) {
    pointsToCheckX.push(
      { x: Math.floor(Math.floor(corners.tr.x) + speed), y: Math.floor(corners.tr.y + 0.2) },
      { x: Math.floor(Math.floor(corners.br.x) + speed), y: Math.floor(corners.br.y - 0.2) },
    );
  }
  if (direction.x < 0) {
    pointsToCheckX.push(
      { x: Math.floor(corners.tl.x - speed), y: Math.floor(corners.tl.y + 0.2) },
      { x: Math.floor(corners.bl.x - speed), y: Math.floor(corners.bl.y - 0.2) },
    );
  }

  if (direction.x !== 0 && checkTileCollide(pointsToCheckX, level)) {
    newDirection.x = 0;
  }

  const pointsToCheckY = [];
  if (direction.y < 0) {
    pointsToCheckY.push(
      { x: Math.floor(Math.floor(corners.tl.x) + 0.2), y: Math.floor(corners.tl.y - speed) },
      { x: Math.floor(corners.tr.x - 0.2), y: Math.floor(corners.tr.y - speed) },
    );
  }
  if (direction.y > 0) {
    pointsToCheckY.push(
      {
        x: Math.floor(Math.floor(corners.bl.x) + 0.2),
        y: Math.floor(Math.floor(corners.bl.y) + speed),
      },
      { x: Math.floor(corners.br.x - 0.2), y: Math.floor(Math.floor(corners.br.y) + speed) },
    );
  }

  if (direction.y !== 0 && checkTileCollide(pointsToCheckY, level)) {
    newDirection.y = 0;
  }

  return newDirection;
};

export const moveEntity = (
  entity: EntityInstance,
  direction: Vector,
  entities: EntityInstance[],
  level: { [key: string]: TileInstance },
  cameraOffset: Vector,
  aspectRatio: number,
  scale: number,
): void => {
  if (direction.x !== 0 || direction.y !== 0) {
    const speed = 0.2;

    const newDirection = checkCollisionTiles(entity, direction, speed, level);

    // check for collisions in newX and newY with hitRects
    const entityCornersHitBox = getCornersFromEntity(
      {
        ...entity,
        position: {
          x: entity.position.x + direction.x * speed,
          y: entity.position.y + direction.y * speed,
        },
      },
      true,
    );
    const isCollidingEntities = entities
      .filter((otherEntity) => otherEntity.isActive)
      .some((otherEntity) =>
        checkCollisionEntity(entityCornersHitBox, otherEntity, direction, speed),
      );

    if ((newDirection.x !== 0 || newDirection.y !== 0) && !isCollidingEntities) {
      entity.position = {
        x: sigFigs(entity.position.x + newDirection.x * speed),
        y: sigFigs(entity.position.y + newDirection.y * speed),
      };
      entity.direction = newDirection;
      entity.status = ENTITY_STATUSES.WALK;

      // Check camera offset
      if (entity.id === 'player') {
        const screenPosition: Vector = {
          x: entity.position.x + cameraOffset.x,
          y: entity.position.y + cameraOffset.y,
        };

        const marginMax = (100 / scale) * 0.75;
        const marginMin = (100 / scale) * 0.25;

        if (screenPosition.x > marginMax) {
          cameraOffset.x = sigFigs(cameraOffset.x - speed);
        } else if (screenPosition.x < marginMin) {
          cameraOffset.x = sigFigs(cameraOffset.x + speed);
        }
        if (screenPosition.y > (1 / aspectRatio) * marginMax) {
          cameraOffset.y = sigFigs(cameraOffset.y - speed);
        } else if (screenPosition.y < (1 / aspectRatio) * marginMin) {
          cameraOffset.y = sigFigs(cameraOffset.y + speed);
        }
      }
    } else {
      entity.status = ENTITY_STATUSES.IDLE;
    }
  } else {
    entity.status = ENTITY_STATUSES.IDLE;
  }
};

export const processTileAction = (state: GameSliceState, action: string, actionValue?: string) => {
  if (action) {
    switch (action) {
      case 'go':
      case 'go_up':
      case 'go_down':
        let nextArea;
        const nextPosition: Vector = {
          x: state.gameState.player.position.x,
          y: state.gameState.player.position.y,
        };
        if (actionValue) {
          const [x, y, a] = actionValue.split('_');
          nextArea = parseFloat(a);
          nextPosition.x = parseFloat(x);
          nextPosition.y = parseFloat(y);
        } else {
          nextPosition.y += action === 'go_up' ? -1 : action === 'go_down' ? 1 : 0;

          const dir = action === 'go_up' ? 1 : -1;
          nextArea =
            typeof state.gameState.player.area !== 'undefined'
              ? state.gameState.player.area + 1 * dir
              : 0;
        }

        state.keysDown = {};
        state.gameState.currentTransition = `teleport-${nextPosition.x}_${nextPosition.y}_${nextArea}`;
        break;
      default:
        break;
    }
  }
};
export const getTilePosition = (entity: EntityInstance): Vector => ({
  x: Math.floor(entity.position.x + 0.5),
  y: Math.floor(entity.position.y + 0.75),
});

export const getRandomHash = (): string => {
  const length = 10;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  while (result.length < length) {
    result = result.concat(characters.charAt(Math.floor(Math.random() * characters.length)));
  }
  return result;
};

export const checkTileAction = (state: GameSliceState, tileMap: TileMap) => {
  const playerTile = getTilePosition(state.gameState.player);
  const playerTileStr = `${playerTile.x},${playerTile.y}`;
  const currentTile = tileMap[playerTileStr];

  if (currentTile) {
    const action = tileDefs[currentTile.type]?.action || null;
    if (action) {
      processTileAction(state, action, currentTile.actionValue);
    }
  }

  const currentPickup = state.gameState.pickups[playerTileStr];

  if (currentPickup) {
    const pickup = state.gameState.pickups[playerTileStr];
    // pickup.action
    // pickup.value
    // console.log('PICKUP', pickup.action, pickup.value);
    switch (pickup.action) {
      case 'take':
        state.gameState.inventory[pickup.type] = parseFloat(pickup.value) || 1;
        break;
      default: {
        break;
      }
    }

    // Remove pickup from in-memory level area
    const newPickups = state.gameState.level.areas[state.gameState.player.area || 0].pickups.filter(
      (item) => item.id != pickup.id,
    );
    state.gameState.level.areas[state.gameState.player.area || 0].pickups = newPickups;

    // add POW to this position playerTileStr
    const newEffect = {
      id: getRandomHash(),
      type: 'pow',
      position: playerTile, //state.gameState.player.position,
    };
    state.gameState.effects.push(newEffect);
    delete state.gameState.pickups[playerTileStr];
  }
};

export const doInitArea = (gameState: GameState) => {
  gameState.entities = gameState.level.areas[gameState.player.area || 0].entities.map(
    (entityInstance) => {
      return {
        ...entityDefs[entityInstance.type],
        ...entityInstance,
      };
    },
  );

  // TODO: pack the pickups into an object with x,y keys for easy lookups
  gameState.pickups = {};
  gameState.effects = [];
  gameState.level.areas[gameState.player.area || 0].pickups.forEach((pickupInstance) => {
    gameState.pickups[`${pickupInstance.position.x},${pickupInstance.position.y}`] = {
      ...pickupDefs[pickupInstance.type],
      ...pickupInstance,
    };
  });

  setCameraOffsetInit(gameState);
};

export const getDefaultImages = () => {
  const defaultImages: ObjectOfImages = {};
  Object.keys(GAME_IMAGE_SRC).forEach((slug: string) => {
    defaultImages[slug] = new Image();
  });
  return defaultImages;
};

export const getDefaultSounds = () => {
  const defaultSounds: ObjectOfAudio = {};
  Object.keys(GAME_SOUND_SRC).forEach((slug: string) => {
    defaultSounds[slug] = new Audio(GAME_SOUND_SRC[slug]);
  });
  return defaultSounds;
};
