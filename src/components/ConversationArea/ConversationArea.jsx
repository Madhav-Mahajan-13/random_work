import React, { useState } from 'react';
import { Box, Typography, Paper, Link, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmptyConversation from '../EmptyConversation/EmptyCoversation';
import './ConversationArea.css';

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
      {messages.map((message, index) => {
        
        const showDateDivider = message.dateDivider && !displayedDates.has(message.dateDivider);
        
        
        if (showDateDivider) {
          displayedDates.add(message.dateDivider);
        }
        
        return (
          <React.Fragment key={message.id}>
            {showDateDivider && (
              <Box className="date-divider">
                <Typography variant="caption" className="date-text">
                  {message.dateDivider}
                </Typography>
              </Box>
            )}
            
            <Box className="message-container">
              <Box className="message-content">
                <Box className="message-header">
                  <Typography variant="subtitle2" className="message-sender">
                    {message.role || 'Care Coordinator'}
                  </Typography>
                  
                  <Box className="message-options-wrapper">
                    <MoreVertIcon 
                      fontSize="small" 
                      className="message-options-icon" 
                      onClick={(e) => handleMenuOpen(e, message.id)}
                    />
                  </Box>
                </Box>
                
                <Paper className="message-bubble">
                  {message.isLink ? (
                    <Link href={message.content} target="_blank" rel="noopener noreferrer">
                      {message.content}
                    </Link>
                  ) : (
                    <Typography variant="body1">{message.content}</Typography>
                  )}
                </Paper>
                
                <Typography variant="caption" className="message-timestamp">
                  {message.timestamp || '09:05 am'}
                </Typography>
              </Box>
            </Box>
          </React.Fragment>
        );
      })}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleMenuOption('Send to notes')}>Send to notes</MenuItem>
        <MenuItem onClick={() => handleMenuOption('Copy to notes')}>Copy to notes</MenuItem>
      </Menu>
    </Box>
  );
};

export default ConversationArea;