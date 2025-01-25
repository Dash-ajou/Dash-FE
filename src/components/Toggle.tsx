import React from 'react';

type ToggleProps = {
    isOn: boolean;
    onToggle: (state: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
    return (
        <div
            className={`w-[3.25rem] h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                isOn ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => onToggle(!isOn)}
        >
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    isOn ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
        </div>
    )
};

export default Toggle;
