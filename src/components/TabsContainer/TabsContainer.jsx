import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import './TabsContainer.css';

const TabsContainer = ({ activeTab, handleTabChange, inAppCount = 0 }) => {
  return (
    <Box className="tabs-container">
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="fullWidth"
        className="tabs"
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        <Tab 
          label={
            <span className="tab-content">
              <img 
                alt="" 
                src={activeTab === 0 
                  ? "https://prtlimages.healtharc.io/images/icons/chat.svg" 
                  : "https://prtlimages.healtharc.io/images/icons/msg-cht.svg"} 
                className="tab-icon" 
                style={{ width: activeTab === 0 ? '16px' : '18px' }}
              />
              <span className={activeTab === 0 ? "tab-text-active" : "tab-text"}>In-App</span>
              {/* {inAppCount > 0 && (
                <span className="circle inboxInappCount">
                  {inAppCount}
                </span>
              )} */}
            </span>
          }
          className={`tab ${activeTab === 0 ? 'active-tab' : ''}`}
          disableRipple
        />
        <Tab 
          label={
            <span className="tab-content">
              <img 
                alt="" 
                src={activeTab === 1 
                  ? "https://prtlimages.healtharc.io/images/icons/phone-icon-white.svg" 
                  : "https://prtlimages.healtharc.io/images/icons/gray-phone-cob.svg"} 
                className="tab-icon" 
                style={{ width: '10px' }}
              />
              <span className={activeTab === 1 ? "tab-text-active" : "tab-text"}>SMS</span>
            </span>
          }
          className={`tab ${activeTab === 1 ? 'active-tab' : ''}`}
          disableRipple
        />
      </Tabs>
    </Box>
  );
};

export default TabsContainer;