import ReactDOM from 'react-dom';

import { configureRootTheme } from '@yandex/ui/Theme';
import { theme } from '@yandex/ui/Theme/presets/default';

configureRootTheme({ theme });

import { Button1 } from './components/button1';
import { Button2 } from './components/button2';

const appElement = document.getElementById('app');

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <>
            <Button1>Hand made Button</Button1>
            <Button2>Created with factory Button</Button2>
        </>,
        appElement,
    );
});
