import { ApplicationState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

export const initialState = {
    isError: false,
    isLoading: false,
    openLeftMenu: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppIsError(state, { payload: isError }: PayloadAction<boolean>) {
            state.isError = isError;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setStateLeftMenu: (state) => {
            state.openLeftMenu = !state.openLeftMenu;
        },
    },
});

export const appSelector = (state: ApplicationState) => state.app;

export const errorSelector = (state: ApplicationState) => state.app.isError;

export const leftMenuSelector = (state: ApplicationState) => state.app.openLeftMenu;
export const { setAppLoader, setAppIsError, setStateLeftMenu } = appSlice.actions;

export default appSlice.reducer;
