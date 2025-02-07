import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  deleteFavs,
  fetchFavs,
  storeFavs,
} from '../../services/FavoritesService';
import {toggleActive} from './SpinnerSlice';

export interface FavoritesSummonerState {
  favorites: string[];
}

const initialState: FavoritesSummonerState = {
  favorites: [],
};

//TODO
export const storeFavorites = createAsyncThunk<any, any, any>(
  'favorites/storeFavs',
  async (params, {dispatch}) => {
    dispatch(toggleActive(true));
    try {
      const fav = await storeFavs(params);
      dispatch(toggleActive(false));
      return {
        id: params,
        key: fav.name,
      };
    } catch (err) {
      console.log(err);
      dispatch(toggleActive(false));
    }
  },
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavs',
  async (params, {dispatch}) => {
    dispatch(toggleActive(true));
    try {
      const favs = await fetchFavs();
      dispatch(toggleActive(false));
      return favs;
    } catch (err) {
      console.log(err);
      dispatch(toggleActive(false));
    }
  },
);

export const deleteFavorites = createAsyncThunk<any, any, any>(
  'favorites/deleteFavs',
  async (params, {dispatch}) => {
    dispatch(toggleActive(true));
    try {
      await deleteFavs(params);
      dispatch(toggleActive(false));
      return params;
    } catch (err) {
      console.log(err);
      dispatch(toggleActive(false));
    }
  },
);

const favoritesSummonerSlice = createSlice({
  name: 'favoritesSummoner',
  initialState,
  reducers: {
    removeFavs: (state, {payload}: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((fav: any) => {
        return fav !== payload;
      });
    },
    setFavs: (state, {payload}: PayloadAction<string>) => {
      state.favorites = [...state.favorites, payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(storeFavorites.fulfilled, (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      if (action.payload) {
        state.favorites = action.payload;
      }
    });
    builder.addCase(deleteFavorites.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(
        (fav: any) => fav.key !== action.payload,
      );
    });
  },
});

export const {setFavs, removeFavs} = favoritesSummonerSlice.actions;

export default favoritesSummonerSlice.reducer;

export const favoritesSummonerSelector = (state: {
  favoritesSummonerStore: FavoritesSummonerState;
}) => state.favoritesSummonerStore;
