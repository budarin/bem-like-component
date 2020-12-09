import { compose } from '@bem-react/core';
import { Button, withSizeM, withSizeL, withSizeS, withViewDefault } from '@yandex/ui/Button/desktop';

interface ICreateButtonProps {
    size?: 'm' | 's' | 'l';
    view?: 'default';
}

let mods = [];

export const createButton = ({ size, view }: ICreateButtonProps) => {
    if (size) {
        switch (size) {
            case 'm':
                mods.push(withSizeM);
                break;

            case 's':
                mods.push(withSizeS);
                break;

            case 'l':
                mods.push(withSizeL);
                break;

            default:
                break;
        }
    }

    if (view) {
        mods.push(withViewDefault);
    }

    return compose(...mods)(Button);
};
