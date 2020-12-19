import { compose } from '@bem-react/core';
import { Button, withSizeM, withViewAction, withWidthMax } from '@yandex/ui/Button/desktop';
const Component = compose(withSizeM, withViewAction, withWidthMax)(Button);
export const ExtButton = ({ children, ...rest }) => (
    <Component {...rest} size="m" view="action" width="max">
        {children}
    </Component>
);
