import React from 'react';
import { Box, Typography } from '@mui/material';
import './EmptyConversation.css';
import chatBubblesImage from "../../assets/grant-msg-icn.svg"
const EmptyConversation = () => {
  return (
    <Box className="empty-conversation-container">
      <Box className="chat-bubbles-container">
        <img
          src={chatBubblesImage}
          alt="Chat bubbles"
          className="chat-bubbles"
          width="120"
        />
      </Box>
      <Typography className="empty-conversation-text">
        Conversation not started yet
      </Typography>
    </Box>
  );
};

export default EmptyConversation;