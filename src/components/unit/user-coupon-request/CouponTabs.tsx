import React from "react";

type Tab = {
    label: string;
}

interface CouponTabsProps {
    tabs: Tab[];
    activeTab: number;
    onTabChange: (index: number) => void;
    completedTabs?: number[];
}

const CouponTabs: React.FC<CouponTabsProps> = ({tabs, activeTab, onTabChange, completedTabs}) => {
    return (
        <div className="flex gap-1 mb-4">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`px-3 py-2 text-center font-medium text-base transition-all border-2 rounded-md 
                        ${activeTab === index
                        ? "border-blue-500 text-black"
                        : completedTabs?.includes(index)
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-gray-300 text-black hover:bg-gray-100"}
                    `}
                    onClick={() => {
                        if (index === 0 || completedTabs?.includes(0)) {
                            onTabChange(index);
                        }
                    }}>
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default CouponTabs;
