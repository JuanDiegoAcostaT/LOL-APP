import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit';
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
    modalStore: ModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
