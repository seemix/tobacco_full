import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import './index.css';
import App from './App';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter  basename="/">
            <App/>
        </BrowserRouter>
    </Provider>
);