import { compose } from '@bem-react/core';
import { Button as ButtonDesktop, withSizeM, withViewDefault } from '@yandex/ui/Button/desktop';

const Component = compose(withSizeM, withViewDefault)(ButtonDesktop);

export const Button1 = ({ children, ...rest }: { children: React.ReactNode }) => (
    <Component {...rest} size="m" view="default">
        {children}
    </Component>
);
