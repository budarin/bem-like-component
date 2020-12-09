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

export const createButton = (props: ICreateButtonProps) => {
    // if (props) {
    //     throw new Error('Add Button Babel plugin to your babel config');
    // }

    const { size, view, width } = props;

    /**
     * Сам код тут не нужен - это заглушка для TS
     * в рантайме она будет заменена только на необходимый код при помощи babel плагина
     * лучше было бы если можно возвращать Button as <результирующий тип в зависимости от входных параметров>
     * возможно как-то можно использовать последнюю фичу TS - MappedTypes
     * без babel-плагина это будет, правильно сконфигурированный, компонент в соответствии с входными параметрами,
     * включающий в бандл все зависимости
     */

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
