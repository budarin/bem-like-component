import { Button } from '@yandex/ui/Button/desktop/bundle';

export const Button2 = ({ children, ...rest }: { children: React.ReactNode }) => (
    <Button {...rest} size="m" view="action" width="max">
        {children}
    </Button>
);
