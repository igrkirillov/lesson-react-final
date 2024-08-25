import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {CatalogFilter, CatalogState, Item, DetailInfo} from "../types";
import {getGoodsFromServer, getItemDetailInfoFromServer} from "../serverApi";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const initialState = {
    goods: [],
    loading: false,
    error: null,
    filter: null,
    detailInfo: null
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
            }),
        fetchDetailInfo: create.asyncThunk<DetailInfo, number>(
            async  (id, thunkApi) => {
                try {
                    return await getItemDetailInfoFromServer(id);
                } catch (e) {
                    return thunkApi.rejectWithValue(e as Error);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = null;
                },
                fulfilled: (state, action: PayloadAction<DetailInfo>) => {
                    state.detailInfo = action.payload ? action.payload : null;
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

export const {fetchGoods, setCategoryId, setSearchText, fetchItemDetailInfo} = catalogSlice.actions;
export const {catalogState} = catalogSlice.selectors;