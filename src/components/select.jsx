import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect({options}) {
  const [Value, setValue] = React.useState('');

    const handleChange=(event)=>{
        setValue(event.target.value)
    }
  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Value</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={null}
          label="Value"
          onChange={handleChange}
        >
            {
                options.map((option,index)=>(
                    <MenuItem value={option.value}> {option.label} </MenuItem>
                
            ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}