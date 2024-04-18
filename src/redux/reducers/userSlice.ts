import { ApplicationState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UploadFile } from 'antd';
import { UserResponce } from 'src/services/types';

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
    FileList: UploadFile[];
    profileInfo: UserResponce;
};

const defaultProfile = {
    firstName: '',
    email: '',
    lastName: '',
    birthday: '',
    imgSrc: '',
    sendNotification: false,
    readyForJointTraining: false,
    tariff: {
        tariffId: '',
        expired: '',
    },
};
const initialState: UserState = {
    user: {
        email: '',
        password: '',
    },
    token: '',
    FileList: [],
    profileInfo: defaultProfile,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ValuesSignupForm>) => {
            state.user = action.payload;
        },
        setProfileInfo: (state, action: PayloadAction<UserResponce>) => {
            state.profileInfo = action.payload;
        },

        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUserUploadFileList: (state, action: PayloadAction<UploadFile[]>) => {
            state.FileList = action.payload;
        },
    },
});

export const baseUser = (state: ApplicationState) => state.user.user;

export const userInfo = (state: ApplicationState) => state.user.profileInfo;

export const { setUser, setProfileInfo, setToken, setUserUploadFileList } = userSlice.actions;
export const userToken = (state: ApplicationState) => state.user.token;

export default userSlice.reducer;
