import { Box } from '@mui/material';

const TimelineContainer = ({ containerRef }) => (
  <Box
    ref={containerRef}
    sx={{
      height: 400,
      border: '1px solid #ddd',
      borderRadius: 1,
      backgroundColor: '#f9f9f9',
    }}
  />
);

export default TimelineContainer;
