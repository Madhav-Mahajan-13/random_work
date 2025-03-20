import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const BasicButtonGroup=({buttons})=> {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
        {
            buttons.map((buttonText,index)=>(
                <Button key={index}>{buttonText}</Button>
                )               
            )
        }
    </ButtonGroup>
      
  );
}

export default BasicButtonGroup;