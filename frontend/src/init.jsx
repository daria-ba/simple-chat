import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './components/App.jsx';
import socket from './socket.js';
// import i18n from 'i18next';
// import { I18nextProvider, initReactI18next } from 'react-i18next';


const init = () => {

    socket(store);

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default init;

