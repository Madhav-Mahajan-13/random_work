import React from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './MessageInput.css';

const MessageInput = ({ value, onChange, onSend }) => {
  const maxLength = 512;
  const remainingChars = maxLength - (value?.length || 0);
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };
  
  return (
    <Box className="message-input-container">
      <TextField
        className="message-input"
        placeholder="Enter your message"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        multiline
        maxRows={4}
        variant="outlined"
        fullWidth
        InputProps={{
          className: "message-input-field"
        }}
      />
      <Box className="message-input-actions">
        <Typography variant="caption" className="char-counter">
          Characters remaining: {remainingChars}
        </Typography>
        <IconButton 
          color="primary" 
          className="send-button"
          onClick={onSend}
          disabled={!value?.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageInput;