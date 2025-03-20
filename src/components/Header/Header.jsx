import React from 'react';
import { Box, Typography } from '@mui/material';
import './Header.css';

const Header = ({ title, timer }) => {
  return (
    <Box className="header">
      <Typography variant="h6" className="header-title">
        {title}
      </Typography>
      {timer && (
        <Typography variant="body2" className="header-timer">
          Timer: {timer}
        </Typography>
      )}
    </Box>
  );
};

export default Header;