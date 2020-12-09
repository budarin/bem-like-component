import { Button, withSizeM, withViewDefault, withWidthMax } from '@yandex/ui/Button/desktop';
import { compose } from '@bem-react/core';
const Component = compose(withSizeM, withViewDefault, withWidthMax)(Button);
export const Button2 = ({children, ...restProps}) => <Component {...restProps} width="max" view="default" size="m">{children}</Component>;
