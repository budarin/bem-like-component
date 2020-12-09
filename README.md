# bem-like-component

Прототип компонента с фабрикой и бабель плагином

Фабрику не обязательно реализовывать - можно задекларировать при помощи ts нужную конфигурацию типов а плагин рапарсив описание типа - реализует желаемое

```jsx
import { FC } from 'react';
// Хелпер-тип, будет браться из библиотеки, или объявляться как глобальный.
type DynamicFC<T> = T & FC<T>;

const Button: DynamicFC<{
    size: { default: 's', mods: ['s', 'l'] };
    view: 'default';
    width: { default: 'auto', mods: ['auto', 'max'] };
}> = {} as any;

...

return (<Button className={someClass}>Small Button with width max</Button>)
```

плагин трансформирует это описание в :

```jsx
import { compose } from '@bem-react/core';
import { Button, withSizeM, withSizeL, withViewDefault, withWidthAuto, withWidthMax } from '@yandex/ui/Button/desktop';

const Component = compose(withSizeM, withViewDefault)(ButtonDesktop);

const Button = ({ children, ...rest }) => (
    <Button {...rest} size="s" view="default" width="max">
        {children}
    </Button>
);

...

return (<Button className={someClass}>Small Button with width max</Button>)

```
