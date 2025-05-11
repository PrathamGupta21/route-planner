import { Box } from '@mui/material';
import { forwardRef } from 'react';

const TimelineContainer = forwardRef((_, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        height: 400,
        border: '1px solid #ddd',
        borderRadius: 1,
        backgroundColor: '#f9f9f9',
      }}
    />
  );
});

export default TimelineContainer;
