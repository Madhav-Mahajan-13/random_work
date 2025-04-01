import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import './ConversationHeader.css';
import dummyAvatar from "../../assets/demo-profile.svg";

const ConversationHeader = ({ patient, isMobile, onBackClick }) => {
  return (
    <Box className="conversation-header">
      {isMobile && (
        <IconButton 
          className="back-button" 
          onClick={onBackClick}
          size="small"
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      
      <Box className="conversation-user">
        <Avatar className="conversation-avatar">
          {patient.avatar ? (
            <img src={patient.avatar} alt={patient.name} />
          ) : (
            <img src={dummyAvatar} alt="" />
          )}
        </Avatar>
        <Box className="conversation-info">
          <Box className="patient-details">
            <Typography variant="body1" className="conversation-name" title={patient.name}>
              {patient.name}  
            </Typography>
            {patient.dob && (
              <Typography variant="body2" className="patient-dob" title={`DOB - ${patient.dob}`}>
                {`DOB - ${patient.dob}`}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Typography variant="body2" className="conversation-status">
        Unknown
      </Typography>
    </Box>
  );
};

export default ConversationHeader;