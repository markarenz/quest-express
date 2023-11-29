import { PayloadAction } from '@reduxjs/toolkit';
import { GameSliceState, GameState } from '../types';
import {
  getMappedKey,
  getPlayerDirection,
  moveEntity,
  checkTileAction,
} from '../components/game/gameUtils';

export const inputAddReducer = (state: GameSliceState, action: PayloadAction<string>) => {
  if (!state.gameState.currentTransition) {
    if (action.payload === 'escape') {
      state.gameState.isPaused = !state.gameState.isPaused;
      return;
    }
    if (!state.gameState.isPaused) {
      const mappedKey = getMappedKey(action.payload);
      if (mappedKey && !state.keysDown[mappedKey]) {
        state.keysDown[mappedKey] = true;
      }
    }
  }
};
export const inputRemoveReducer = (state: GameSliceState, action: PayloadAction<string>) => {
  if (!state.gameState.currentTransition) {
    const mappedKey = getMappedKey(action.payload);
    if (mappedKey && state.keysDown[mappedKey]) {
      delete state.keysDown[mappedKey];
    }
  }
};

const checkEntitiesProximityStatus = (gameState: GameState) => {
  gameState.entities = gameState.entities.map((entity) => {
    const distance =
      Math.abs(entity.position.x - gameState.player.position.x) +
      Math.abs(entity.position.y - gameState.player.position.y);
    entity.isActive = distance < 5;
    return entity;
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
