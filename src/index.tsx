import ReactDOM from 'react-dom';

import { configureRootTheme } from '@yandex/ui/Theme';
import { theme } from '@yandex/ui/Theme/presets/default';

configureRootTheme({ theme });

import { Button1 } from './button1';
import { Button2 } from './button2';

const appElement = document.getElementById('app');

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <>
            <Button1 view="default" size="m">
                Button1
            </Button1>
            <Button2>Button2</Button2>
        </>,
        appElement,
    );
});
