import { ApplicationState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertProps } from 'antd';

// export type AppState = typeof initialState;

export type AppState = {
    isError: boolean;
    isLoading: boolean;
    openLeftMenu: boolean;
    alert: AlertProps;
};

export const initialState = {
    isError: false,
    isLoading: false,
    openLeftMenu: false,
    alert: {
        // type: undefined,
        // message: '',
    },
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
        setAppAlert(state, { payload }: PayloadAction<AlertProps>) {
            state.alert = { ...payload };
        },
    },
});

export const appSelector = (state: ApplicationState) => state.app;

export const errorSelector = (state: ApplicationState) => state.app.isError;
export const appAlert = (state: ApplicationState) => state.app.alert;

export const leftMenuSelector = (state: ApplicationState) => state.app.openLeftMenu;
export const { setAppLoader, setAppIsError, setStateLeftMenu, setAppAlert } = appSlice.actions;

export default appSlice.reducer;
