import { compose } from '@bem-react/core';
import { Button as ButtonDesktop, withSizeM, withViewAction, withViewDefault } from '@yandex/ui/Button/desktop';

export const Button1 = compose(withSizeM, withViewAction)(ButtonDesktop);
