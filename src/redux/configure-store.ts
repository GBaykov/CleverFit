import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { RouterState, createReduxHistoryContext } from 'redux-first-history';
import { authAPI } from '../services/auth';
import { userSlice, UserState } from './reducers/userSlice';
import { feedbacksAPI } from '../services/feedbacks';

import appReducer, { AppState, appSlice } from './reducers/appSlice';
import trainingReducer, { InitialStateTraining, trainingSlice } from './reducers/trainingSlice';
import { calendarAPI } from '../services/trainings';
import { userAPI } from 'src/services/user';

const { createReduxHistory, routerReducer, routerMiddleware } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    router: routerReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [feedbacksAPI.reducerPath]: feedbacksAPI.reducer,
    [calendarAPI.reducerPath]: calendarAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [trainingSlice.name]: trainingReducer,
    [appSlice.name]: appReducer,
    userReducer: userSlice,
    appReducer: appSlice,
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
