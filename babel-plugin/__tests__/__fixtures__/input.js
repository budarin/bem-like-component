import { Button } from '@yandex/ui/Button/desktop/bundle';

export const ExtButton = ({ children, ...rest }) => (
    <Button {...rest} size="m" view="action" width="max">
        {children}
    </Button>
);
