import { compose } from '@bem-react/core';
import { Button as ButtonDesktop, withSizeM, withViewAction } from '@yandex/ui/Button/desktop';

const Component = compose(withSizeM, withViewAction)(ButtonDesktop);

export const Button1 = ({ children, ...rest }) => (
    <Component {...rest} size="m" view="action">
        {children}
    </Component>
);
