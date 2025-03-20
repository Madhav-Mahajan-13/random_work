import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './ConversationArea.css';

const MessageItem = ({ message }) => {
  const { content, timestamp, isLink } = message;
  
  return (
    <Box className="message-container">
      <Box className="message-header">
        <Typography variant="body2" className="message-sender">
          {message.sender}
        </Typography>
      </Box>
      <Box className="message-content">
        {isLink ? (
          <Link href={content} target="_blank" className="message-link">
            {content}
          </Link>
        ) : (
          <Typography variant="body1" className="message-text">
            {content}
          </Typography>
        )}
      </Box>
      <Typography variant="caption" className="message-timestamp">
        {timestamp}
      </Typography>
    </Box>
  );
};

const ConversationArea = ({ messages }) => {
  return (
    <Box className="conversation-area">
      <Box className="date-separator">
        <Typography variant="caption" className="date-text">
          27 February
        </Typography>
      </Box>
      
      <Box className="messages-container">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </Box>
    </Box>
  );
};

export default ConversationArea;