import {configureStore} from "@reduxjs/toolkit";
import {hitsSlice} from "../slices/hits";
import {catalogSlice} from "../slices/catalog";
import {categoriesSlice} from "../slices/categories";
import {basketSlice} from "../slices/basket";
import {detailInfoSlice} from "../slices/detailInfo";

export const store = configureStore({
    reducer: {
        hits: hitsSlice.reducer,
        catalog: catalogSlice.reducer,
        categories: categoriesSlice.reducer,
        detailInfo: detailInfoSlice.reducer,
        basket: basketSlice.reducer,
    }
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<AppStore['getState']>