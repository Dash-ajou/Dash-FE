import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    name: string;
    email: string;
    phone: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    phone: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        resetUserInfo: (state) => {
            state.name = '';
            state.email = '';
            state.phone = '';
        },
    },
});

export const {setUserInfo, resetUserInfo} = userSlice.actions;
export default userSlice.reducer;
