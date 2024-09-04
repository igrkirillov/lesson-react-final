import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {CatalogFilter, CatalogState, Item} from "../types";
import {getGoodsFromServer} from "../serverApi";
import {pageSize} from "../constants";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const initialState = {
    goods: [],
    loading: false,
    error: null,
    filter: null,
    detailInfo: null,
    hasNext: true,
    offset: 0
} as CatalogState;

export const catalogSlice = createSliceWithThunk({
    name: "catalog",
    initialState,
    selectors: {
        catalogState: (state) => state,
    },
    reducers: (create) => ({
        setCategoryId: create.reducer((state, action: PayloadAction<number|null>) => {
            if (state.filter) {
                state.filter.categoryId = action.payload;
            } else {
                state.filter = {categoryId: action.payload} as CatalogFilter
            }
        }),
        setSearchText: create.reducer((state, action: PayloadAction<string|null>) => {
           if (state.filter) {
               state.filter.searchText = action.payload;
           } else {
               state.filter = {searchText: action.payload} as CatalogFilter
           }
        }),
        fetchGoods: create.asyncThunk<Item[], void, {state: any}>(
            async  (__, thunkApi) => {
                try {
                    const {filter} = (thunkApi.getState()["catalog"] as CatalogState);
                    return await getGoodsFromServer(filter, 0);
                } catch (e) {
                    return thunkApi.rejectWithValue(e as Error);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = null;
                    state.offset = 0;
                },
                fulfilled: (state, action: PayloadAction<Item[]>) => {
                    state.goods = action.payload;
                    state.isWarmed = true;
                },
                rejected: (state, action) => {
                    state.error = action.payload as Error;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }),
        fetchNextGoods: create.asyncThunk<Item[], void, {state: any}>(
            async  (__, thunkApi) => {
                try {
                    const {filter, offset} = (thunkApi.getState()["catalog"] as CatalogState);
                    return await getGoodsFromServer(filter, offset);
                } catch (e) {
                    return thunkApi.rejectWithValue(e as Error);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = null;
                    state.offset += pageSize;
                },
                fulfilled: (state, action: PayloadAction<Item[]>) => {
                    state.goods.push(...action.payload);
                    state.hasNext = action.payload.length >= pageSize;
                },
                rejected: (state, action) => {
                    state.error = action.payload as Error;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }),
    })
})

export const {fetchGoods, setCategoryId, setSearchText, fetchNextGoods} = catalogSlice.actions;
export const {catalogState} = catalogSlice.selectors;