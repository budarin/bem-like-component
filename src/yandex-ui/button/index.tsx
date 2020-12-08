import { Button, IButtonViewDefaultProps, IButtonSizeMProps, IButtonProps } from '@yandex/ui/Button/desktop';

interface ICreateButtonProps {
    size?: 'm' | 's' | 'l';
}

export const createButton = (props: ICreateButtonProps) => {
    if (props.size) {
        return Button as React.ComponentClass<IButtonProps, IButtonViewDefaultProps> & IButtonSizeMProps;
    }

    return Button;
};
