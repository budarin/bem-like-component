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

let mods = [];

export const createButton = (props: ICreateButtonProps) => {
    // if (props) {
    //     throw new Error('Add Button Babel plugin to your babel config');
    // }

    const { size, view, width } = props;

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
        switch (view) {
            case 'default':
                mods.push(withViewDefault);
                break;

            case 'action':
                mods.push(withViewAction);
                break;

            default:
                break;
        }
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

    const Component = compose(...mods)(Button);

    return ({ children, ...rest }: { children: React.ReactNode }) => (
        <Component {...rest} size={size} view={view} width={width}>
            {children}
        </Component>
    );
};
