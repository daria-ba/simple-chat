import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import store from './store/store.js';
import App from './components/App.jsx';
import socket from './socket.js';
import resources from '../src/locales/index.js'

const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
};

const init = async () => {
    leoProfanity.add(leoProfanity.getDictionary('ru'));
    const i18n = i18next.createInstance();
    await i18n
        .use(initReactI18next)
        .init({
        resources,
        fallbackLng: 'ru',
    });

    socket(store);

    return (
        <RollbarProvider config={rollbarConfig}>
            <ErrorBoundary>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <App />
                </I18nextProvider>
                </Provider>
            </ErrorBoundary>
        </RollbarProvider>
    )
};

export default init;
