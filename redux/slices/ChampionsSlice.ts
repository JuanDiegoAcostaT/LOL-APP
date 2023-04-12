import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IChampion } from "../../interfaces/Champion"
import { getChampionsList } from "../../services/championsService"
import { toggleActive } from "./SpinnerSlice"

export interface ChampionsState {
    champions: IChampion[] | [] | undefined
}

const initialState: ChampionsState = {
    champions: []
}


export const fetchChampionsList = createAsyncThunk(
    'champions/fetchChampionsList',
    async (params, { dispatch }) => {
        dispatch(toggleActive(true))
        try {
            const champions = getChampionsList()
            dispatch(toggleActive(false))
            return champions
        } catch (err) {
            dispatch(toggleActive(false))
        }
    }
)

const ChampionsSlice = createSlice({
    name: "champions",
    initialState,
    reducers: {
        setChampions: (state, { payload }: PayloadAction<IChampion[]>) => {
            state.champions = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChampionsList.fulfilled, (state, action) => {
            state.champions = action.payload
        })
    }
})


export const { setChampions } = ChampionsSlice.actions

export default ChampionsSlice.reducer

export const championsSelector = (state: { championsStore: ChampionsState }) =>
    state.championsStore.champions