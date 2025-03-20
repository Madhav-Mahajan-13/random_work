import React, { useState } from 'react';
import { 
  Tabs, 
  Tab, 
  Box, 
  Badge,
  styled
} from '@mui/material';

// Styled components
const StyledTabs = styled(Tabs)({
  minHeight: '40px',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  border: 'none',
});

const StyledTab = styled(Tab)(({ theme, active }) => ({
  minHeight: '40px',
  textTransform: 'none',
  padding: '10px 15px',
  color: active ? '#fff' : theme.palette.text.primary,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  borderRadius: '4px 4px 0 0',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : theme.palette.action.hover,
  },
  '& .MuiTab-wrapper': {
    flexDirection: 'row',
  },
  '& img': {
    marginRight: '5px',
  },
}));

const Circle = styled(Badge)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: '#fff',
  borderRadius: '50%',
  padding: '0px 6px',
  fontSize: '12px',
  marginLeft: '5px',
  visibility: props => props.count > 0 ? 'visible' : 'hidden',
}));

function NavTabs() {
  const [value, setValue] = useState(1); // Start with SMS tab active (index 1)
  const [inAppCount, setInAppCount] = useState(0);
  const [smsCount, setSmsCount] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 0 }}>
      <StyledTabs value={value} onChange={handleChange} aria-label="navigation tabs">
        <StyledTab 
          icon={
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                alt="" 
                src="https://prtlimages.healtharc.io/images/icons/msg-cht.svg" 
                style={{ 
                  width: '18px',
                  display: value === 0 ? 'none' : 'inline'
                }} 
              />
              <img 
                alt="" 
                src="https://prtlimages.healtharc.io/images/icons/chat.svg" 
                style={{ 
                  width: '16px',
                  display: value === 0 ? 'inline' : 'none'
                }} 
              />
              In-App
              {inAppCount > 0 && 
                <Circle count={inAppCount}>{inAppCount}</Circle>
              }
            </Box>
          }
          id="inApp-tab"
          active={value === 0}
          aria-controls="tabpanel-0"
        />
        <StyledTab 
          icon={
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                alt="" 
                src="https://prtlimages.healtharc.io/images/icons/gray-phone-cob.svg" 
                style={{ 
                  width: '10px',
                  display: value === 1 ? 'none' : 'inline'
                }} 
              />
              <img 
                alt="" 
                src="https://prtlimages.healtharc.io/images/icons/phone-icon-white.svg" 
                style={{ 
                  width: '10px',
                  display: value === 1 ? 'inline' : 'none'
                }} 
              />
              SMS
              {smsCount > 0 && 
                <Circle count={smsCount}>{smsCount}</Circle>
              }
            </Box>
          }
          id="profile-tab"
          active={value === 1}
          aria-controls="tabpanel-1"
        />
      </StyledTabs>
      
      {/* Tab panels would go here */}
      <Box role="tabpanel" hidden={value !== 0} id="tabpanel-0" aria-labelledby="inApp-tab">
        {/* In-App content */}
      </Box>
      <Box role="tabpanel" hidden={value !== 1} id="tabpanel-1" aria-labelledby="profile-tab">
        {/* SMS content */}
      </Box>
    </Box>
  );
}

export default NavTabs;