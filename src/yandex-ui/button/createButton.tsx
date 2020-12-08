import { compose } from '@bem-react/core';
import { Button, withSizeM, withViewDefault } from '@yandex/ui/Button/desktop';

interface ICreateButtonProps {
    size?: 'm' | 's' | 'l';
    view?: 'default';
}

let mods = [];

export const createButton = ({ size, view }: ICreateButtonProps) => {
    if (size && size === 'm') {
        mods.push(withSizeM);
    }

    if (view && view === 'default') {
        mods.push(withViewDefault);
    }

    return compose(...mods)(Button);
};
