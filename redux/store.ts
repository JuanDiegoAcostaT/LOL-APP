import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit';
import ChampionsSlice from './slices/ChampionsSlice';
import FavoritesSummonersSlice from './slices/FavoritesSummonersSlice';
import SpinnerSlice from './slices/SpinnerSlice';

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const store = configureStore({
  reducer: {
    favoritesSummonerStore: FavoritesSummonersSlice,
    spinnerStore: SpinnerSlice,
    championsStore: ChampionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
