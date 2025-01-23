import React, {HTMLAttributes, useRef, useEffect} from "react";
import Icon from "../icons/Icon.tsx";
import IconRegistry from "../icons/IconRegistry.tsx";

type CircleButtonProps = {
    size: "small" | "large";
    fill: "gray" | "blue";
    icon: keyof typeof IconRegistry;
    mode: "none" | "search" | "dropdown";
    dropdownitems?: string[];
} & HTMLAttributes<HTMLButtonElement>;

const sizeStyles = {
    small: "w-8 h-8",
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
                                                       mode,
                                                       dropdownitems,
                                                       ...props
                                                   }) => {
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        if (mode === "dropdown") {
            setIsDropdownVisible((prev) => !prev);
        }
    };

    return (
        <div className="relative">
            <button
                className={`rounded-full flex items-center justify-center ${sizeStyles[size]} ${fillStyles[fill]}`}
                onClick={handleButtonClick}
                {...props}
            >
                {size==="large" ?
                    <Icon name={icon} size={32}/>
                    :
                    <Icon name={icon} size={16}/>
                }
            </button>

            {mode === "dropdown" && isDropdownVisible && dropdownitems && (
                <ul
                    ref={dropdownRef}
                    className="absolute mt-2 bg-white shadow-lg rounded-lg w-40 z-50"
                >
                    {dropdownitems.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black-500"
                            onClick={() => console.log(`Clicked: ${item}`)} //이후 로직 연결
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default CircleButton;
