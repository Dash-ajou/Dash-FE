import React, { useState } from 'react';
import Tab from './Tab';

interface TabsProps {
    tabs: string[];
    children: React.ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            <div className="flex border-b w-full">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab}
                        isActive={index === activeTab}
                        onClick={() => setActiveTab(index)}
                    />
                ))}
            </div>

            <div className="p-4">{children[activeTab]}</div>
        </div>
    );
};

export default Tabs;
