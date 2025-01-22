import React, {HTMLAttributes} from 'react';
import IconRegistry from './IconRegistry';

type IconProps = {
    name: keyof typeof IconRegistry;
    size?: number;
} & HTMLAttributes<HTMLDivElement>;

const Icon: React.FC<IconProps> = ({
                                       name,
                                       size = 24,
                                       ...props
                                   }) => {
    const SelectedIcon = IconRegistry[name];

    if (!SelectedIcon) {
        console.warn(`Icon "${name}" does not exist in the registry.`);
        return null;
    }

    return (
        <div
            className={'flex items-center justify-center'}
            style={{width: size, height: size}}
            {...props}
        >
            {React.cloneElement(SelectedIcon, {
                width: size,
                height: size,
            })}
        </div>
    );
};

export default Icon;
