import React, { ReactNode, useState } from 'react';
import { Tab, TabBar, TabContent } from './style';

interface Props {
    tabs: string[];
    children: ReactNode[];
}

const Tabs = ({ tabs, children }: Props) => {
    const [currentTab, setCurrentTab] = useState(0);

    const changeTab = (index: number) => {
        setCurrentTab(index);
    };

    return (
        <>
            <TabBar>
                {tabs.map((tabName, index) => (
                    <Tab key={index} selected={currentTab === index} onClick={(e) => changeTab(index)}>
                        {tabName}
                    </Tab>
                ))}
            </TabBar>

            {children.map((component, index) => (
                <TabContent key={index} show={currentTab === index}>
                    {component}
                </TabContent>
            ))}
        </>
    );
};

export default Tabs;
