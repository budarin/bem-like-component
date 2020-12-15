import { compose } from '@bem-react/core';
import {
    Button,
    withSizeM,
    withSizeL,
    withSizeS,
    withViewDefault,
    withViewAction,
    withWidthAuto,
    withWidthMax,
} from '@yandex/ui/Button/desktop';

/**
 * Код тут вообще не нужен - нужен лишь интерфейс -заглушка для TS
 * в рантайме этот модуль вообще не будет включен в дерево зависимостей
 * лучше было бы если можно возвращать Button as <результирующий тип в зависимости от входных параметров>
 * возможно как-то можно использовать последнюю фичу TS - MappedTypes
 *
 * Если все же данный модуль полностью реализует функциональность -
 * без babel-плагина это будет, правильно сконфигурированный, компонент в соответствии с входными параметрами,
 * включающий в бандл все зависимости.
 */

interface ICreateButtonProps {
    size?: 'm' | 's' | 'l';
    view?: 'default' | 'action';
    width?: 'auto' | 'max';
}

const sizes = {
    m: 'withSizeM',
    s: 'withSizeS',
    l: 'withSizeL',
};
const views = {
    default: 'withViewDefault',
    action: 'withViewAction',
};
const widths = {
    auto: 'withWidthAuto',
    max: 'withWidthMax',
};

let mods = [];

export const createButton = (props: ICreateButtonProps) => {
    const { size, view, width } = props;

    const sizeMod = sizes[size];
    if (sizeMod) {
        mods.push(sizeMod);
    }

    const viewMod = views[view];
    if (viewMod) {
        mods.push(viewMod);
    }

    const widthMod = widths[width];
    if (widthMod) {
        mods.push(widthMod);
    }

    const Component = compose(...mods)(Button);

    const result = ({ children, ...rest }) => (
        <Component {...rest} {...props}>
            {children}
        </Component>
    );

    return result;
};
