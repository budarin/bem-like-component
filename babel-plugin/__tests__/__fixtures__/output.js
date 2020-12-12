import { Button, withSizeM, withViewAction, withWidthMax } from '@yandex/ui/Button/desktop';
import { compose } from '@bem-react/core';
const Component = compose(withSizeM, withViewAction, withWidthMax)(Button);
export const Button2 = ({ children: children, ...rest }) => (
    <Component {...rest} size="m" view="action" width="max">
        {children}
    </Component>
);
