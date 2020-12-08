import ReactDOM from 'react-dom';

import { configureRootTheme } from '@yandex/ui/Theme';
import { theme } from '@yandex/ui/Theme/presets/default';

configureRootTheme({ theme });

import { Button1 } from './components/button1';
import { Button2 } from './components/button2';
import { createButton } from './yandex-ui/button/createButton';

const appElement = document.getElementById('app');

const Button = createButton({ size: 'm', view: 'default' });

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <>
            <Button1 view="default" size="m">
                Button1
            </Button1>

            <Button2>Button2</Button2>

            <Button size="m">Button</Button>
        </>,
        appElement,
    );
});
