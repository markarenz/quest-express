import {
  Vector,
  ObjectOfBooleans,
  Vectors,
  EntityType,
  TileMap,
  TileType,
  ENTITY_STATUSES,
} from '../../types';
import { INPUT_MAPPINGS, tileDefs } from '../../constants';

export const sigFigs = (num: number): number => Number(num.toFixed(2));

export const getMappedKey = (key: string): string => INPUT_MAPPINGS[key];

export const getAspectRatio = (): number => {
  if (typeof window !== 'undefined') {
    const w = window?.innerWidth;
    const h = window?.innerHeight;

    return w && h ? w / h : 1;
  }

  return 1;
};

export const getCameraOffsetInit = (playerPosition: Vector, aspectRatio: number): Vector => {
  const cameraOffset: Vector = {
    x: 0,
    y: 0,
  };

  const xMid = 10;
  const yMid = (1 / aspectRatio) * 10;
  cameraOffset.x = xMid - playerPosition.x;
  cameraOffset.y = yMid - playerPosition.y;

  return cameraOffset;
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

export const getCornersFromEntity = (entity: EntityType, useHitBox = true): Vectors => {
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
  otherEntity: EntityType,
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
  entity: EntityType,
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
  entity: EntityType,
  direction: Vector,
  entities: EntityType[],
  level: { [key: string]: TileType },
  cameraOffset: Vector,
  aspectRatio: number,
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
    const isCollidingEntities = entities.some((otherEntity) =>
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

        if (screenPosition.x > 15) {
          cameraOffset.x = sigFigs(cameraOffset.x - speed);
        } else if (screenPosition.x < 5) {
          cameraOffset.x = sigFigs(cameraOffset.x + speed);
        }
        if (screenPosition.y > (1 / aspectRatio) * 15) {
          cameraOffset.y = sigFigs(cameraOffset.y - speed);
        } else if (screenPosition.y < (1 / aspectRatio) * 5) {
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
