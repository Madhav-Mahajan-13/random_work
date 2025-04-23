import React, { useState } from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmptyConversation from '../EmptyConversation/EmptyConversation';
import './ConversationArea.css';

// Tick symbol components
const SingleTick = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
      fill="#9e9e9e"
    />
  </svg>
);

const DoubleTick = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"
      fill="#3574d6"
    />
  </svg>
);

const ConversationArea = ({ messages = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const hasMessages = messages && messages.length > 0;

  const handleMenuOpen = (event, messageId) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessageId(messageId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMessageId(null);
  };

  const handleMenuOption = (option) => {
    console.log(`Selected option "${option}" for message ID: ${selectedMessageId}`);
    handleMenuClose();
  };

  if (!hasMessages) {
    return (
      <Box className="conversation-area">
        <EmptyConversation />
      </Box>
    );
  }

  const displayedDates = new Set();

  return (
    <Box className="conversation-area">
      {messages.map((message) => {
        const showDateDivider =
          message.dateDivider && !displayedDates.has(message.dateDivider);

        if (showDateDivider) {
          displayedDates.add(message.dateDivider);
        }

        const isSent = message.role === 'sent' || message.sender === 'Me' || message.sender === 'Care Coordinator';

        return (
          <React.Fragment key={message.id}>
            {showDateDivider && (
              <Box className="date-divider">
                <Typography variant="caption" className="date-text">
                  {message.dateDivider}
                </Typography>
              </Box>
            )}

            <Box className={`message-container ${isSent ? 'sent' : 'received'}`}>
              <Box className="message-wrapper">
                <Box className="message-content">
                  <Box className={`message-bubble ${isSent ? 'sent-bubble' : 'received-bubble'}`}>
                    {!isSent && (
                      <Typography variant="subtitle2" className="message-sender-inside">
                        {message.sender || 'Michael Aiden'}
                      </Typography>
                    )}
                    
                    <Typography variant="body1" className="message-text">
                      {message.content}
                    </Typography>
                    
                    {isSent && (
                      <Box className="message-info sent-info">
                        <Typography variant="caption" className="message-timestamp">
                          {message.timestamp || '09:05 am'}
                        </Typography>
                        <Box className="message-status">
                          {message.isRead ? <DoubleTick /> : <SingleTick />}
                        </Box>
                      </Box>
                    )}
                    
                    {!isSent && (
                      <Typography variant="caption" className="message-timestamp">
                        {message.timestamp || '09:05 am'}
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                <Box className="options-container">
                  <IconButton 
                    className="message-options-button"
                    size="small"
                    onClick={(e) => handleMenuOpen(e, message.id)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </React.Fragment>
        );
      })}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={() => handleMenuOption('Send to notes')}>COPY</MenuItem>
        <MenuItem onClick={() => handleMenuOption('Copy to notes')}>FORWARD</MenuItem>
        <MenuItem onClick={() => handleMenuOption('Copy to notes')}>DELETE</MenuItem>
      </Menu>
    </Box>
  );
};

export default ConversationArea;