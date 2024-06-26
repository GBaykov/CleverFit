import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { RouterState, createReduxHistoryContext } from 'redux-first-history';
import { authAPI } from '../services/auth';
import userReducer, { UserState, userSlice } from './reducers/userSlice';
import { feedbacksAPI } from '../services/feedbacks';

import appReducer, { AppState, appSlice } from './reducers/appSlice';
import trainingReducer, { InitialStateTraining, trainingSlice } from './reducers/trainingSlice';
import { calendarAPI } from '../services/trainings';
import { userAPI } from '../services/user';
import { tariffAPI } from '../services/tariffs';

const { createReduxHistory, routerReducer, routerMiddleware } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    router: routerReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [feedbacksAPI.reducerPath]: feedbacksAPI.reducer,
    [calendarAPI.reducerPath]: calendarAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [tariffAPI.reducerPath]: tariffAPI.reducer,
    [trainingSlice.name]: trainingReducer,
    [appSlice.name]: appReducer,
    appReducer: appSlice,
    [userSlice.name]: userReducer,
    userReducer: userSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            routerMiddleware,
            authAPI.middleware,
            feedbacksAPI.middleware,
            calendarAPI.middleware,
            userAPI.middleware,
            tariffAPI.middleware,
        ),
});

export const history = createReduxHistory(store);

export type ApplicationState = Readonly<{
    [appSlice.name]: AppState;
    [trainingSlice.name]: InitialStateTraining;
    [userSlice.name]: UserState;
    router: RouterState;
}>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
