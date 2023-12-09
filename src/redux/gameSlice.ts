import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSliceState } from '../types';
import { initialGameState } from '../constants';
import { inputAddReducer, inputRemoveReducer, processPhysicsReducer } from './reducers';
import { getScreenDimensions, setCameraOffsetInit, doInitArea } from '../modules/game/gameUtils';

export type Slices = {
  game: GameSliceState;
};

const getInitialState = () => {
  const initialState: GameSliceState = {
    appStatus: 'playing',
    gameState: initialGameState,
    keysDown: {},
  };
  return initialState;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: getInitialState(),
  reducers: {
    initState: (state) => {
      state = getInitialState();
    },
    initArea: (state) => {
      doInitArea(state.gameState);
      state.gameState.isLevelReady = true;
      // state.gameState.currentTransition = 'initArea';
    },
    initLevel: (state) => {
      doInitArea(state.gameState);
      // setCameraOffsetInit(state.gameState);
      state.gameState.isLevelReady = true;
    },
    setScreenDimensions: (state) => {
      state.gameState.screen = getScreenDimensions();
    },
    inputAdd: (state, action: PayloadAction<string>) => {
      inputAddReducer(state, action.payload);
    },
    inputRemove: (state, action: PayloadAction<string>) => {
      inputRemoveReducer(state, action.payload);
    },
    processPhysics: (state) => {
      if (!state.gameState.currentTransition) {
        processPhysicsReducer(state);
      }
    },
    teleportPlayer: (state, action: PayloadAction<string>) => {
      const [newX, newY, newArea] = `${action.payload}`.split('_');
      state.gameState.player.position = {
        x: parseFloat(newX),
        y: parseFloat(newY),
      };

      state.gameState.player.area = parseFloat(newArea);

      doInitArea(state.gameState);
    },
    clearTransition: (state) => {
      delete state.gameState.currentTransition;
    },
    removeEffect: (state, action: PayloadAction<string>) => {
      state.gameState.effects = state.gameState.effects.filter(
        (effect) => effect.id !== action.payload,
      );
    },
  },
});

export const {
  initState,
  inputAdd,
  inputRemove,
  processPhysics,
  setScreenDimensions,
  initLevel,
  initArea,
  teleportPlayer,
  clearTransition,
  removeEffect,
} = gameSlice.actions;

export default gameSlice.reducer;
