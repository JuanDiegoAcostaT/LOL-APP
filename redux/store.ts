import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import ChampionsSlice from './slices/ChampionsSlice';
import FavoritesSummonersSlice from './slices/FavoritesSummonersSlice';
import ModalSlice from './slices/ModalSlice';
import SpinnerSlice from './slices/SpinnerSlice';

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const store = configureStore({
  reducer: {
    favoritesSummonerStore: FavoritesSummonersSlice,
    spinnerStore: SpinnerSlice,
    championsStore: ChampionsSlice,
    authStore: AuthSlice,
    modalStore: ModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
