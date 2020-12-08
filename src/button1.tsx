import { compose } from '@bem-react/core';
import { Button as ButtonDesktop, withSizeM, withViewDefault } from '@yandex/ui/Button/desktop';
import '@yandex/ui/Button/Button.css';

export const Button1 = compose(withSizeM, withViewDefault)(ButtonDesktop);
