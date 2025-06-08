import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import typeReducer from "./typeSlice"
import deviceReducer from "./deviceSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        type: typeReducer,
        device: deviceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
