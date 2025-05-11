import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { zoomLevels } from '../constants/constants';

const ZoomControls = ({ zoomValue, onZoomChange }) => {
  return (
    <Box sx={{ width: '80%', mx: 'auto', mb: 4 }}>
      <Slider
        value={zoomValue}
        onChange={onZoomChange}
        step={1}
        marks={zoomLevels}
        min={0}
        max={zoomLevels.length - 1}
        valueLabelDisplay='auto'
        valueLabelFormat={(value) =>
          zoomLevels.find((level) => level.value === value)?.label
        }
      />
    </Box>
  );
};

export default ZoomControls;
