import { createRoot } from 'react-dom/client';
import init from './init.jsx';

const container = document.getElementById('root');

const app = async () => {
const root = createRoot(container);
    root.render(await init());
}

app();