import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ValuesSignupForm = {
    email: string;
    password: string;
    repeatPassword?: string;
};

type UserState = {
    user: {
        email: string;
        password: string;
    };
};

const initialState: UserState = {
    user: {
        email: '',
        password: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ValuesSignupForm>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
