import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '../pages/game-4-buttons/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
