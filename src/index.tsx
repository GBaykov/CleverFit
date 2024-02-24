import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { store } from '@redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import './index.css';
import { FormPage } from '@pages/formPage';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path='/main' element={<MainPage />} />
                    <Route path='/auth' element={<FormPage />}>
                        <Route path='/auth/registration' />
                        <Route path='/auth/confirm-email' />
                        <Route path='/auth/change-password' />
                    </Route>
                    <Route path='/result' element={<FormPage />}>
                        <Route path='/result/success' />
                        <Route path='/result/error' />
                        <Route path='/result/error-login' />
                        <Route path='/result/error-user-exist' />
                        <Route path='/result/error-check-email-no-exist' />
                        <Route path='/result/error-check-email' />
                        <Route path='/result/error-change-password' />
                        <Route path='/result/success-change-password' />
                    </Route>
                    {/* <Route path='/' element={<FormPage />} /> */}
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
);
