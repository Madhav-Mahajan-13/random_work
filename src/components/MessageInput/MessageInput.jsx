import React from 'react';
import { Box } from '@mui/material';
import './MessageInput.css';

const MessageInput = ({ value, onChange, onSend, activeTab }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  // Set character limit based on active tab (0 = In-App, 1 = SMS)
  const maxCharacters = activeTab === 0 ? 520 : 320;
  const remaining = maxCharacters - (value ? value.length : 0);

  return (
    <Box className="message-input-wrapper">
      <div className="custom-input-field">
        <textarea
          className="message-field"
          placeholder="Enter your message here..."
          value={value}
          onChange={onChange}
          onKeyUp={handleKeyPress}
          maxLength={maxCharacters}
        />
        <button 
          type="button" 
          className="send-button"
          onClick={onSend}
          disabled={!value.trim()}
        >
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
        
        <div className="character-counter">
          <span>Characters remaining : <b>{remaining}</b></span>
        </div>
      </div>
    </Box>
  );
};

export default MessageInput;

