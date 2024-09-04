import {asyncThunkCreator, buildCreateSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {BasketState, DeliveryInfo, Position} from "../types";
import {postOrderToServer} from "../serverApi";
import {loadBasketFromLocalStorage, saveBasketToLocalStorage} from "../utils";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const defaultBasket = {
    loading: false,
    error: null,
    positions: [],
    orderCreated: false
} as BasketState;

const initialState = loadBasketFromLocalStorage(defaultBasket);

export const basketSlice = createSliceWithThunk({
    name: "basket",
    initialState,
    selectors: {
        basketState: (state) => state,
    },
    reducers: (create) => ({
        addToBasket: create.reducer((state, action: PayloadAction<Position>) => {
            action.payload.reservedPrice = action.payload.detailInfo.price;
            state.positions.push(action.payload);
            state.orderCreated = false;
            saveBasketToLocalStorage(current(state));
        }),
        removeFromBasket: create.reducer((state, action: PayloadAction<Position>) => {
          const index = state.positions.findIndex(
              pos => pos.detailInfo.id === action.payload.detailInfo.id && pos.size === action.payload.size);
          if (index >= 0) {
              state.positions.splice(index, 1);
          }
          state.orderCreated = false;
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
                    state.positions = [];
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

export const {addToBasket, removeFromBasket, postOrder} = basketSlice.actions;
export const {basketState} = basketSlice.selectors;