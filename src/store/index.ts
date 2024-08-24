import {configureStore} from "@reduxjs/toolkit";
import {hitsSlice} from "../slices/hits";
import {catalogSlice} from "../slices/catalog";
import {categoriesSlice} from "../slices/categories";

export const store = configureStore({
    reducer: {
        hits: hitsSlice.reducer,
        catalog: catalogSlice.reducer,
        categories: categoriesSlice.reducer
    }
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<AppStore['getState']>