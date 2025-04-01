import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "./TabsContainer.css";

const TabsContainer = ({ activeTab, handleTabChange, tabsData }) => {
  return (
    <Box className="tabs-container">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        className="tabs"
        
      >
        {tabsData.map((tab, index) => (
          <Tab
            key={index}
            label={
              <span className="tab-content">
                <img
                  alt={`${tab.label} Icon`}
                  src={activeTab === index ? tab.activeIcon : tab.inactiveIcon}
                  className="tab-icon"
                  style={{ width: tab.iconWidth || "18px" }}
                />
                <span className={activeTab === index ? "tab-text-active" : "tab-text"}>
                  {tab.label}
                </span>
                
              </span>
            }
            className={`tab ${activeTab === index ? "active-tab" : ""}`}
            disableRipple
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsContainer;