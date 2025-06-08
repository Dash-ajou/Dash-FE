import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DeviceState {
    isMobile: boolean
}

const initialState: DeviceState = {
    isMobile: typeof window !== "undefined" ? window.innerWidth <= 1024 : false,
}

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        setIsMobile(state, action: PayloadAction<boolean>) {
            state.isMobile = action.payload
        },
    },
})

export const { setIsMobile } = deviceSlice.actions
export default deviceSlice.reducer
