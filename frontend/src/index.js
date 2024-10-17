import { createRoot } from 'react-dom/client';
// import React from 'react';
import init from './init.jsx';
// import { Provider } from 'react-redux';
// import store from './store/store.js';
// import App from './components/App.jsx';
// import socketInit from './socket.js';

// socketInit(store);

const container = document.getElementById('root');

// if (!store) {
//     console.error('Store не инициализирован');
//   }
const app = async () => {
const root = createRoot(container);
// const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(await init());
}

app();