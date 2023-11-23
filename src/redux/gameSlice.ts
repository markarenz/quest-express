import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSliceState } from '../types';
import { initialGameState } from '../constants';
import { inputAddReducer, inputRemoveReducer, processPhysicsReducer } from './reducers';
import { getAspectRatio, getCameraOffsetInit } from '../components/game/gameUtils';

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
    initLevel: (state) => {
      state.gameState.cameraOffset = getCameraOffsetInit(
        state.gameState.player.position,
        state.gameState.aspectRatio,
      );
      state.gameState.isLevelReady = true;
    },
    setAspectRatio: (state) => {
      state.gameState.aspectRatio = getAspectRatio();
    },
    inputAdd: (state, action: PayloadAction<string>) => {
      inputAddReducer(state, action);
    },
    inputRemove: (state, action: PayloadAction<string>) => {
      inputRemoveReducer(state, action);
    },
    processPhysics: (state) => {
      processPhysicsReducer(state);
    },
  },
});

export const { initState, inputAdd, inputRemove, processPhysics, setAspectRatio, initLevel } =
  gameSlice.actions;

export default gameSlice.reducer;
