import React, {HTMLAttributes} from "react";
import Icon from "../icons/Icon.tsx";
import IconRegistry from "../icons/IconRegistry.tsx";

type CircleButtonProps = {
    size: "small" | "large";
    fill: "gray" | "blue";
    icon: keyof typeof IconRegistry;
    // mode: "none" | "search";
} & HTMLAttributes<HTMLButtonElement>;

const sizeStyles = {
    small: "w-10 h-10",
    large: "w-12 h-12",
};

const fillStyles = {
    gray: "bg-gray-200 hover:bg-gray-300",
    blue: "bg-blue-500 hover:bg-blue-600",
};

const CircleButton: React.FC<CircleButtonProps> = ({
                                                       size,
                                                       fill,
                                                       icon,
                                                       // mode,
                                                       ...props
                                                   }) => {
    return (
        <div className="relative">
            <button
                className={`rounded-full flex items-center justify-center ${sizeStyles[size]} ${fillStyles[fill]} ${size=="large" && 'shadow-custom-basic'}` }
                {...props}
            >
                {size==="large" ?
                    <Icon name={icon} size={32}/>
                    :
                    <Icon name={icon} size={16}/>
                }
            </button>
        </div>
    )
};

export default CircleButton;
