import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "./TabsContainer.css";
import app_active from "../../assets/msg-cht.svg"; // Ensure these paths are correct
import app_inactive from "../../assets/app_inactive.svg";
import sms_active from "../../assets/sms_active.svg";
import sms_inactive from "../../assets/sms_inactive.svg";

const TabsContainer = ({ activeTab, handleTabChange, inAppCount = 0 }) => {
  return (
    <Box className="tabs-container">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        className="tabs"
        // TabIndicatorProps={{ style: { display: "none" } }}
      >
        <Tab
          label={
            <span className="tab-content">
              <img
                alt="In-App Icon"
                src={activeTab === 0 ? app_active : app_inactive}
                className="tab-icon"
                style={{ width: activeTab === 0 ? "16px" : "18px" }}
              />
              <span className={activeTab === 0 ? "tab-text-active" : "tab-text"}>In-App</span>
            </span>
          }
          className={`tab ${activeTab === 0 ? "active-tab" : ""}`}
          disableRipple
        />
        <Tab
          label={
            <span className="tab-content">
              <img
                alt="SMS Icon"
                src={activeTab === 1 ? sms_active : sms_inactive}
                className="tab-icon"
                style={{ width: "10px" }}
              />
              <span className={activeTab === 1 ? "tab-text-active" : "tab-text"}>SMS</span>
            </span>
          }
          className={`tab ${activeTab === 1 ? "active-tab" : ""}`}
          disableRipple
        />
      </Tabs>
    </Box>
  );
};

export default TabsContainer;
