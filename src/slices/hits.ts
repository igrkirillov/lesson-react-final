import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {Item, HitsState} from "../types";
import {getHitsFromServer} from "../serverApi";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const initialState = {
    hits: [],
    loading: false,
    error: null
} as HitsState;

export const hitsSlice = createSliceWithThunk({
    name: "hits",
    initialState,
    selectors: {
        hitsState: (state) => state,
    },
    reducers: (create) => ({
        fetchHits: create.asyncThunk<Item[]>(
            async  (__, thunkApi) => {
                try {
                    return await getHitsFromServer();
                } catch (e) {
                    return thunkApi.rejectWithValue(e as Error);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = null;
                },
                fulfilled: (state, action: PayloadAction<Item[]>) => {
                    state.hits = action.payload ? action.payload : [];
                    state.isWarmed = true;
                },
                rejected: (state, action) => {
                    state.error = action.payload as Error;
                },
                settled: (state) => {
                    state.loading = false;
                }
            })
    })
})

export const {fetchHits} = hitsSlice.actions;
export const {hitsState} = hitsSlice.selectors;