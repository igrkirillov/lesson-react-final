import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {CatalogFilter, CatalogState, Item} from "../types";
import {getGoodsFromServer} from "../serverApi";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const initialState = {
    goods: [],
    loading: false,
    error: null,
    filter: null
} as CatalogState;

export const catalogSlice = createSliceWithThunk({
    name: "catalog",
    initialState,
    selectors: {
        catalogState: (state) => state,
    },
    reducers: (create) => ({
        fetchGoods: create.asyncThunk<Item[], CatalogFilter | null>(
            async  (filter: CatalogFilter | null, thunkApi) => {
                try {
                    return await getGoodsFromServer(filter);
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
                    state.goods = action.payload ? action.payload : [];
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

export const {fetchGoods} = catalogSlice.actions;
export const {catalogState} = catalogSlice.selectors;