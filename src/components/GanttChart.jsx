import { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const zoomLevels = [
  { value: 0, label: '12h', hours: 12 },
  { value: 1, label: '6h', hours: 6 },
  { value: 2, label: '4h', hours: 4 },
  { value: 3, label: '2h', hours: 2 },
  { value: 4, label: '1h', hours: 1 },
  { value: 5, label: '30m', hours: 0.5 },
];

const GanttChart = () => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const [zoomValue, setZoomValue] = useState(0);

  useEffect(() => {
    const routes = [
      {
        route: [
          { seq: 1, start_time: '10:00 AM', end_time: '12:00 PM' },
          { seq: 2, start_time: '1:00 PM', end_time: '1:30 PM' },
          { seq: 3, start_time: '2:00 PM', end_time: '4:00 PM' },
        ],
      },
      {
        route: [
          { seq: 1, start_time: '9:00 AM', end_time: '10:00 AM' },
          { seq: 2, start_time: '1:00 PM', end_time: '1:30 PM' },
          { seq: 3, start_time: '2:00 PM', end_time: '4:00 PM' },
        ],
      },
    ];

    const items = routes.flatMap((route, index) =>
      route.route.map((task) => ({
        id: `${index}_${task.seq}`,
        group: index,
        content: `${task.seq}`,
        start: moment(
          `2025-05-11 ${task.start_time}`,
          'YYYY-MM-DD h:mm A'
        ).toDate(),
        end: moment(
          `2025-05-11 ${task.end_time}`,
          'YYYY-MM-DD h:mm A'
        ).toDate(),
      }))
    );

    const groups = routes.map((_, index) => ({
      id: index,
      content: `Route ${index + 1}`,
    }));

    const options = {
      start: moment('2025-05-11 08:00 AM', 'YYYY-MM-DD hh:mm A').toDate(),
      end: moment('2025-05-11 06:00 PM', 'YYYY-MM-DD hh:mm A').toDate(),
      orientation: 'top',
      zoomable: true,
      moveable: true,
      format: {
        minorLabels: {
          hour: 'hh:mm A',
        },
        majorLabels: {
          hour: 'hh:mm A',
        },
      },
      min: moment('2025-05-11 06:00 AM', 'YYYY-MM-DD hh:mm A').toDate(),
      max: moment('2025-05-11 08:00 PM', 'YYYY-MM-DD hh:mm A').toDate(),
    };

    timelineRef.current = new Timeline(
      containerRef.current,
      items,
      groups,
      options
    );

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;

    const { hours } = zoomLevels[zoomValue];
    const startTime = moment('2025-05-11 08:00 AM');

    timelineRef.current.setWindow(
      startTime.toDate(),
      startTime.clone().add(hours, 'hours').toDate(),
      { animation: true }
    );
  }, [zoomValue]);

  const handleZoomChange = (_, newValue) => {
    setZoomValue(newValue);
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Arial, sans-serif' }}>
      <Typography variant='h4' gutterBottom>
        Route Schedule Gantt Chart
      </Typography>

      <Box sx={{ width: '80%', mx: 'auto', mb: 4 }}>
        <Typography gutterBottom>Zoom Level</Typography>
        <Slider
          value={zoomValue}
          onChange={handleZoomChange}
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

      <Box
        ref={containerRef}
        sx={{
          height: 400,
          border: '1px solid #ddd',
          borderRadius: 1,
          backgroundColor: '#f9f9f9',
        }}
      />
    </Box>
  );
};

export default GanttChart;
