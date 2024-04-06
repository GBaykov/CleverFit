import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { RouterState, createReduxHistoryContext } from 'redux-first-history';
import { authAPI } from '../services/auth';
import userSlice from './reducers/userSlice';
import { feedbacksAPI } from '../services/feedbacks';
import { catalogsAPI } from '../services/catalogs';

import appReducer, { AppState, appSlice } from './reducers/appSlice';
import trainingReducer, { InitialStateTraining, trainingSlice } from './reducers/trainingSlice';

const { createReduxHistory, routerReducer, routerMiddleware } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    router: routerReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [feedbacksAPI.reducerPath]: feedbacksAPI.reducer,
    [catalogsAPI.reducerPath]: catalogsAPI.reducer,
    [appSlice.name]: appReducer,
    userReducer: userSlice,
    trainingReducer: trainingSlice,
    appReducer: appSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            routerMiddleware,
            authAPI.middleware,
            feedbacksAPI.middleware,
        ),
});

export const history = createReduxHistory(store);

export type ApplicationState = Readonly<{
    [appSlice.name]: AppState;
    [trainingSlice.name]: InitialStateTraining;
    router: RouterState;
}>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
