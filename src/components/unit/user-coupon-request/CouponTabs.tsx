import React from "react";

type Tab = {
    label: string;
}

interface CouponTabsProps {
    tabs: Tab[];
    activeTab: number;
    onTabChange: (index: number) => void;
}

const CouponTabs: React.FC<CouponTabsProps> = ({tabs, activeTab, onTabChange}) => {
    return (
        <div className="flex gap-1">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`px-3 py-2 text-center font-medium text-base text-black transition-all border-2  
                        rounded-md
                                ${activeTab === index ? "border-blue-500" : "border-gray-300 hover:bg-gray-100"}`}
                    onClick={() => onTabChange(index)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default CouponTabs;
