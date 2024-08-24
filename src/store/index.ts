import {configureStore} from "@reduxjs/toolkit";
import {hitsSlice} from "../slices/hits";
import {catalogSlice} from "../slices/catalog";

export const store = configureStore({
    reducer: {
        hits: hitsSlice.reducer,
        catalog: catalogSlice.reducer
    }
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<AppStore['getState']>