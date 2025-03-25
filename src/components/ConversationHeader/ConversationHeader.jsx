import React from 'react';
import { Box, Typography, Avatar, imageListClasses } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './ConversationHeader.css';
import dummyAvatar from "../../assets/demo-profile.svg"
const ConversationHeader = ({ patient }) => {
  return (
    <Box className="conversation-header">
      <Box className="conversation-user">
        <Avatar className="conversation-avatar">
          {patient.avatar ? (
            <img src={patient.avatar} alt={patient.name} />
          ) : (
            <img src={dummyAvatar} alt="" />
          )}
        </Avatar>
        <Typography variant="h6" className="conversation-name">
          {patient.name} {patient.dob ? `(DOB - ${patient.dob})` : ''}
        </Typography>
      </Box>
      <Typography variant="body2" className="conversation-status">
        Unknown
      </Typography>
    </Box>
  );
};

export default ConversationHeader;

