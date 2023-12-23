import { PayloadAction } from '@reduxjs/toolkit';
import { GameSliceState, GameState } from '../types';
import {
  getMappedKey,
  getPlayerDirection,
  moveEntity,
  checkTileAction,
  getTilePosition,
} from '../modules/game/gameUtils';

export const inputAddReducer = (state: GameSliceState, key: string) => {
  if (!state.gameState.currentTransition) {
    if (key === 'escape') {
      state.gameState.isPaused = !state.gameState.isPaused;
      return;
    }
    if (!state.gameState.isPaused) {
      const mappedKey = getMappedKey(key);
      if (mappedKey && !state.keysDown[mappedKey]) {
        state.keysDown[mappedKey] = true;
      }
    }
  }
};
export const inputRemoveReducer = (state: GameSliceState, key: string) => {
  if (!state.gameState.currentTransition) {
    const mappedKey = getMappedKey(key);
    if (mappedKey && state.keysDown[mappedKey]) {
      delete state.keysDown[mappedKey];
    }
  }
};

const checkEntitiesProximityStatus = (gameState: GameState) => {
  gameState.entities.forEach((entity, idx) => {
    const distance =
      Math.abs(entity.position.x - gameState.player.position.x) +
      Math.abs(entity.position.y - gameState.player.position.y);
    const isActive = distance < 5;
    if (entity.isActive !== isActive) {
      gameState.entities[idx].isActive = isActive;
    }
  });
};

export const processPhysicsReducer = (state: GameSliceState) => {
  if (!state.gameState.isPaused) {
    const direction = getPlayerDirection(state.keysDown);

    state.gameState.physicsFrame =
      state.gameState.physicsFrame > 10 ? 0 : state.gameState.physicsFrame + 1;
    if (state.gameState.physicsFrame === 0) {
      // check all entities active/inactive based on distance (dx+dy) from player
      checkEntitiesProximityStatus(state.gameState);
    }

    const currentTileMap = state.gameState.level.areas[state.gameState.player.area || 0].tileMap;
    moveEntity(
      state.gameState.player,
      direction,
      state.gameState.entities,
      currentTileMap,
      state.gameState.cameraOffset,
      state.gameState.screen.aspectRatio,
      state.gameState.screen.scale,
    );

    checkTileAction(state, currentTileMap);
  }
};
