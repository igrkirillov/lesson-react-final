import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {BasketState, Position} from "../types";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const initialState = {
    positions: [],
} as BasketState;

export const basketSlice = createSliceWithThunk({
    name: "basket",
    initialState,
    selectors: {
        basketState: (state) => state,
    },
    reducers: (create) => ({
        addToBasket: create.reducer((state, action: PayloadAction<Position>) => {
            state.positions.push(action.payload);
        }),
        removeFromBasket: create.reducer((state, action: PayloadAction<Position>) => {
          const index = state.positions.findIndex(
              pos => pos.item.id === action.payload.item.id && pos.size === action.payload.size);
          if (index >= 0) {
              state.positions.splice(index, 1);
          }
        })
    })
})

export const {addToBasket, removeFromBasket} = basketSlice.actions;
export const {basketState} = basketSlice.selectors;