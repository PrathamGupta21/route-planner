import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const ZoomControls = ({ value, onChange, levels }) => (
  <Box sx={{ width: '80%', mx: 'auto', mb: 4 }}>
    <Slider
      value={value}
      onChange={onChange}
      step={1}
      marks={levels}
      min={0}
      max={levels.length - 1}
      valueLabelDisplay='auto'
      valueLabelFormat={(value) =>
        levels.find((level) => level.value === value)?.label
      }
    />
  </Box>
);

export default ZoomControls;
