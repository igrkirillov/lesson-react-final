import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoriesState, Category} from "../types";
import {getCategoriesFromServer} from "../serverApi";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const initialState = {
    categories: [],
    loading: false,
    error: null,
} as CategoriesState;

export const categoriesSlice = createSliceWithThunk({
    name: "categories",
    initialState,
    selectors: {
        categoriesState: (state) => state,
    },
    reducers: (create) => ({
        fetchCategories: create.asyncThunk<Category[]>(
            async  (__, thunkApi) => {
                try {
                    return await getCategoriesFromServer();
                } catch (e) {
                    return thunkApi.rejectWithValue(e as Error);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = null;
                },
                fulfilled: (state, action: PayloadAction<Category[]>) => {
                    state.categories = action.payload ? action.payload : [];
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

export const {fetchCategories} = categoriesSlice.actions;
export const {categoriesState} = categoriesSlice.selectors;