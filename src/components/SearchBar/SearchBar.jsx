import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      className="search-bar"
      placeholder="Search Patient"
      value={value}
      onChange={onChange}
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        className: "search-input"
      }}
    />
  );
};

export default SearchBar;