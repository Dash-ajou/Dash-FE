import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TypeState {
    userType: string;
}

const initialState: TypeState = {
    userType: '',
};

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        setUserType: (state, action: PayloadAction<string>) => {
            state.userType = action.payload;
        },
        resetUserType: (state) => {
            state.userType = '';
        },
    },
});

export const {setUserType, resetUserType} = typeSlice.actions;
export default typeSlice.reducer;
