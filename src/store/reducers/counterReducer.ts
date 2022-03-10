import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    counterValue: 1
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        inc(state, action: PayloadAction<number>) {
            state.counterValue = state.counterValue + action.payload;
        },
        dec(state, action: PayloadAction<number>) {
            state.counterValue = state.counterValue - action.payload;
        }
    }
});

export const {dec, inc} = counterSlice.actions;
export default counterSlice.reducer