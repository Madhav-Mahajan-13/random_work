import React from 'react';
import { FormControl, Select, MenuItem, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './DropdownMenu.css';

const DropdownMenu = ({ value, onChange, options }) => {
  return (
    <Box className="dropdown-container">
      <FormControl className="dropdown-form-control">
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          IconComponent={ArrowDropDownIcon}
          className="dropdown-select"
          MenuProps={{
            classes: {
              paper: 'dropdown-menu-paper'
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} className="dropdown-menu-item">
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownMenu;