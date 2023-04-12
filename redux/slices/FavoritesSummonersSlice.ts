// src / features / photos / PhotoSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FavoritesSummonerState {
    favorites: string[]
}

const initialState: FavoritesSummonerState = {
    favorites: []
}

const favoritesSummonerSlice = createSlice({
    name: "favoritesSummoner",
    initialState,
    reducers: {
        removeFavs: (state, { payload }: PayloadAction<string>) => {
            state.favorites = state.favorites.filter((fav: any) => {
                return fav !== payload
            })
        },
        setFavs: (state, { payload }: PayloadAction<string>) => {
            state.favorites = [...state.favorites, payload]
        },
    },
})

export const { setFavs, removeFavs } = favoritesSummonerSlice.actions

export default favoritesSummonerSlice.reducer

export const favoritesSummonerSelector = (state: { favoritesSummonerStore: FavoritesSummonerState }) =>
    state.favoritesSummonerStore