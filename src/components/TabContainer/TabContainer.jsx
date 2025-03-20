import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SmsIcon from '@mui/icons-material/Sms';
import './TabsContainer.css';

const TabsContainer = ({ activeTab, handleTabChange }) => {
  return (
    <Box className="tabs-container">
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="fullWidth"
        className="tabs"
      >
        <Tab 
          icon={<ChatIcon />} 
          label="In-App" 
          className={`tab ${activeTab === 0 ? 'active-tab' : ''}`}
        />
        <Tab 
          icon={<SmsIcon />} 
          label="SMS" 
          className={`tab ${activeTab === 1 ? 'active-tab' : ''}`}
        />
      </Tabs>
    </Box>
  );
};

export default TabsContainer;