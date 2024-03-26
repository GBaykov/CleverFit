import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { authAPI } from '../services/auth';
import userSlice from './reducers/userSlice';
import { feedbacksAPI } from '../services/feedbacks';

const { createReduxHistory, routerReducer, routerMiddleware } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [feedbacksAPI.reducerPath]: feedbacksAPI.reducer,
        userReducer: userSlice,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            routerMiddleware,
            authAPI.middleware,
            feedbacksAPI.middleware,
        ),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
