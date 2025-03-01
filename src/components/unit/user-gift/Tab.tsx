import React from 'react';

interface TabProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            className={`px-4 py-2 font-medium text-base transition-all flex justify-center w-full ${
                isActive
                    ? 'border-b-4 border-blue-500 text-black'
                    : 'text-gray-500 hover:text-black'
            }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Tab;
