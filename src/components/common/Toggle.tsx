import React from "react";

type ToggleProps = {
    isOn: boolean;
    onToggle: (state: boolean) => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle, onClick }) => {
    return (
        <div
            onClick={(e) => {
                onClick?.(e);
                onToggle(!isOn);
            }}
            className={`w-[4.25rem] h-9 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                isOn ? "bg-blue-500" : "bg-gray-300"
            }`}
        >
            <div
                className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform ${
                    isOn ? "translate-x-8" : "translate-x-0"
                }`}
            />
        </div>
    );
};

export default Toggle;
