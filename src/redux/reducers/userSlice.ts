import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ValuesSignupForm = {
    email: string;
    password: string;
    repeatPassword?: string;
};

export type UserState = {
    user: {
        email: string;
        password: string;
    };
    token: string;
};

const initialState: UserState = {
    user: {
        email: '',
        password: '',
    },
    token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ValuesSignupForm>) => {
            state.user = action.payload;
        },
        // setToken(state, action:PayloadAction<string>) = > {

        // },

        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
