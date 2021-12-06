import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DetailSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: '5px',
        position: 'absolute',
        top: '-120%',
        right: '193px',
        color: '#ff0044',
      }}
    >
      <CircularProgress size={25} />
    </Box>
  );
};

export default DetailSpinner;
