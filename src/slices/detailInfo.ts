import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {DetailInfo, DetailInfoState} from "../types";
import {getItemDetailInfoFromServer} from "../serverApi";

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

const initialState = {
    detailInfo: null,
    loading: false,
    error: null,
} as DetailInfoState;

export const detailInfoSlice = createSliceWithThunk({
    name: "detailInfo",
    initialState,
    selectors: {
        detailInfoState: (state) => state,
    },
    reducers: (create) => ({
        fetchDetailInfo: create.asyncThunk<DetailInfo, string>(
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

export const {fetchDetailInfo} = detailInfoSlice.actions;
export const {detailInfoState} = detailInfoSlice.selectors;