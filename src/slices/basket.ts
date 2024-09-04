import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {BasketState, DeliveryInfo, Position} from "../types";
import {postOrderToServer} from "../serverApi";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const initialState = {
    loading: false,
    error: null,
    positions: [],
    orderCreated: false
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
              pos => pos.detailInfo.id === action.payload.detailInfo.id && pos.size === action.payload.size);
          if (index >= 0) {
              state.positions.splice(index, 1);
          }
        }),
        postOrder: create.asyncThunk<void, DeliveryInfo, {state: any}>(
            async  (deliveryInfo, thunkApi) => {
                try {
                    const {positions} = (thunkApi.getState()["basket"] as BasketState);
                    return await postOrderToServer(deliveryInfo, positions);
                } catch (e) {
                    return thunkApi.rejectWithValue(e as Error);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = null;
                    state.orderCreated = false;
                },
                fulfilled: (state) => {
                    state.orderCreated = true;
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

export const {addToBasket, removeFromBasket} = basketSlice.actions;
export const {basketState} = basketSlice.selectors;