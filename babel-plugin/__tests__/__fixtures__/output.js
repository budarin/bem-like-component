import { Button, withSizeM, withViewAction, withWidthMax } from '@yandex/ui/Button/desktop';
import { compose } from '@bem-react/core';
const Component = compose(withSizeM, withViewAction, withWidthMax)(Button);
export const Button2 = ({ children, ...restProps }) => (
    <Component {...restProps} size="m" view="default" width="max">
        {children}
    </Component>
);
