import { compose } from '@bem-react/core';
import {
    Button,
    withSizeM,
    withSizeL,
    withSizeS,
    withViewDefault,
    withWidthAuto,
    withWidthMax,
} from '@yandex/ui/Button/desktop';

interface ICreateButtonProps {
    size?: 'm' | 's' | 'l';
    view?: 'default';
    width?: 'auto' | 'max';
}

let mods = [];

export const createButton = ({ size, view, width }: ICreateButtonProps) => {
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

    if (width) {
        switch (width) {
            case 'auto':
                mods.push(withWidthAuto);
                break;

            case 'max':
                mods.push(withWidthMax);
                break;

            default:
                break;
        }
    }

    return compose(...mods)(Button);
};
