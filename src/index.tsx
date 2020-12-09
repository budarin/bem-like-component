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
            <Button1 view="default" size="m">
                Button1
            </Button1>

            <Button2 view="default" size="m">
                Button2
            </Button2>
        </>,
        appElement,
    );
});
