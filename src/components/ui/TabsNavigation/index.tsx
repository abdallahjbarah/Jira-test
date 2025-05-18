'use client';
import React, { useState } from 'react';
import clsx from 'clsx';

export type TabItem = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

interface TabsNavigationProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  containerClassName?: string;
  tabsContainerClassName?: string;
  contentClassName?: string;
  showContent?: boolean;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({
  tabs,
  defaultActiveTab,
  onChange,
  containerClassName,
  tabsContainerClassName,
  contentClassName,
  showContent = true,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab || (tabs.length > 0 ? tabs[0].id : ''),
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange && onChange(tabId);
  };

  const activeTabItem = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={clsx('', containerClassName)}>
      <div
        className={clsx(
          'flex rounded-[1.5rem] overflow-hidden shadow-customShadow_1 bg-primary_7',
          tabsContainerClassName,
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={clsx(
              'flex-1 py-[11px] px-[30px] text-custom-18 font-custom-600 transition-all duration-200 rounded-[1.5rem] leading-full',
              tab.id === activeTab
                ? 'bg-primary_4 text-primary_7 font-custom-800'
                : ' text-primary_4 hover:bg-opacity-90 ',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {showContent && activeTabItem?.content && (
        <div className={clsx('mt-6', contentClassName)}>
          {activeTabItem.content}
        </div>
      )}
    </div>
  );
};

export default TabsNavigation;
