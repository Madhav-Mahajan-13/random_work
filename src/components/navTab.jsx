import React, { useState } from 'react';
import './NavTabs.css';


const NavTabs = ({ 
  tabs = [], 
  defaultTabIndex = 0, 
  onTabChange = () => {}, 
  children
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultTabIndex);

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    onTabChange(index);
  };

  return (
    <div className="nav-tabs-container">
      <ul className="nav-tabs" role="tablist">
        {tabs.map((tab, index) => (
          <li 
            key={tab.id || `tab-${index}`}
            className={`nav-tab ${activeTabIndex === index ? 'active' : ''}`}
            id={tab.id || `tab-${index}`}
            role="tab"
            aria-controls={`tabpanel-${index}`}
            aria-selected={activeTabIndex === index}
            onClick={() => handleTabChange(index)}
            {...tab.tabProps}
          >
            {tab.activeIcon && tab.inactiveIcon && (
              <>
                <img
                  alt=""
                  className="tab-icon inactive-icon"
                  src={tab.inactiveIcon}
                  style={{ width: tab.iconWidth || '18px' }}
                />
                <img
                  alt=""
                  className="tab-icon active-icon"
                  src={tab.activeIcon}
                  style={{ width: tab.iconWidth || '18px' }}
                />
              </>
            )}
            {tab.label}
            {tab.badgeContent !== undefined && (
              <span className={`notification-badge ${tab.badgeContent > 0 ? 'visible' : ''}`}>
                {tab.badgeContent}
              </span>
            )}
          </li>
        ))}
      </ul>
      
      {/* Render children as tab panels if provided */}
      {React.Children.map(children, (child, index) => (
        <div 
          className={`tab-panel ${activeTabIndex !== index ? 'hidden' : ''}`}
          role="tabpanel" 
          id={`tabpanel-${index}`} 
          aria-labelledby={tabs[index]?.id || `tab-${index}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default NavTabs;