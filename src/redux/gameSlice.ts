import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSliceState } from '../types';
import { initialGameState } from '../constants';
import { inputAddReducer, inputRemoveReducer, processPhysicsReducer } from './reducers';
import { getScreenDimensions, setCameraOffsetInit, doInitArea } from '../components/game/gameUtils';

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
      inputAddReducer(state, action);
    },
    inputRemove: (state, action: PayloadAction<string>) => {
      inputRemoveReducer(state, action);
    },
    processPhysics: (state) => {
      if (!state.gameState.currentTransition) {
        processPhysicsReducer(state);
      }
    },
    setLevelArea: (state, action: PayloadAction<number>) => {
      state.gameState.player.position = {
        x: state.gameState.player.position.x,
        y: state.gameState.player.position.y + 1 * state.gameState.player.direction.y,
      };

      state.gameState.player.area = action.payload;

      doInitArea(state.gameState);
    },
    clearTransition: (state) => {
      delete state.gameState.currentTransition;
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
  setLevelArea,
  clearTransition,
} = gameSlice.actions;

export default gameSlice.reducer;
