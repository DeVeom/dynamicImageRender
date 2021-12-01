import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '45px',
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};

export default Spinner;
