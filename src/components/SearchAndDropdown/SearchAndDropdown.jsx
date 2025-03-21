import React from 'react';
import { 
  Box, 
  InputBase, 
  FormControl,
  Select,
  MenuItem,
  styled 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './SearchAndDropdown.css';

// Custom styled search input
const SearchInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 0',
    paddingLeft: '12px',
    borderRadius: '20px',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    width: '100%',
    '&:focus': {
      borderRadius: '20px',
      backgroundColor: 'white',
      borderColor: theme.palette.primary.main,
    },
    '&::placeholder': {
      opacity: 0.8,
      color: '#757575',
    },
  },
}));

// Custom styled select input to match the chosen style
const StyledSelect = styled(Select)(({ theme }) => ({
  height: '36px',
  minWidth: '80px',
  fontSize: '14px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '1px solid #e0e0e0',
  '& .MuiSelect-select': {
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: '10px',
    paddingRight: '24px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const SearchAndDropdown = ({ 
  searchValue = '', 
  productType = '1', 
  onSearchChange, 
  onProductTypeChange 
}) => {
  // Map product type values to their display names
  const productTypes = {
    '1': 'RPM',
    '2': 'CCM',
    '4': 'PCM',
    '3': 'RTM',
    '5': 'TCM',
    '6': 'MTM',
    '7': 'APCM',
  };
  
  return (
    <Box 
      className="search-dropdown-container"
      sx={{
        display: 'flex',
        padding: '12px 16px',
        alignItems: 'center',
      }}
    >
      <Box className="search-container" sx={{ display: 'flex', flex: 1, position: 'relative' }}>
        <SearchIcon sx={{ position: 'absolute', left: '10px', top: '9px', color: '#757575', fontSize: '20px' }} />
        <SearchInput
          placeholder="Search Patient"
          value={searchValue}
          onChange={onSearchChange}
          fullWidth
          sx={{ pl: 4 }}
          className="inbox-search searchFunction"
          inputProps={{ 'aria-label': 'search patient' }}
        />
      </Box>
      
      <Box className="dropdown-container" sx={{ marginLeft: '16px' }}>
        <FormControl variant="outlined" size="small">
          <StyledSelect
            value={productType}
            onChange={onProductTypeChange}
            displayEmpty
            className="product-type-select"
            IconComponent={KeyboardArrowDownIcon}
            MenuProps={{
              PaperProps: {
                sx: {
                  mt: 0.5,
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  '& .MuiMenuItem-root': {
                    fontSize: '14px',
                    padding: '6px 10px',
                  },
                },
              },
            }}
          >
            {Object.entries(productTypes).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SearchAndDropdown;