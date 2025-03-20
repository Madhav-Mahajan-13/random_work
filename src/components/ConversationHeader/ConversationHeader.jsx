import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './ConversationHeader.css';

const ConversationHeader = ({ patient }) => {
  const defaultAvatar = patient.avatar || null;
  
  return (
    <Box className="conversation-header">
      {defaultAvatar ? (
        <Avatar src={defaultAvatar} alt={patient.name} className="conversation-avatar" />
      ) : (
        <Avatar className="conversation-avatar">
          <PersonIcon />
        </Avatar>
      )}
      <Box className="conversation-user-info">
        <Typography variant="h6" className="conversation-user-name">
          {patient.name}
        </Typography>
        {patient.dob && (
          <Typography variant="body2" className="conversation-user-details">
            (DOB - {patient.dob})
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ConversationHeader;