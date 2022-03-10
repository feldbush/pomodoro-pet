import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import timerReducer from "./reducers/timerReducer";
export const rootReducer = combineReducers(
    {
        timerReducer
    }
);

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });;
}

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState['dispatch']
export type AppGetState = AppState['getState']
