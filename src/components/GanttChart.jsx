import { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ZoomControls from './ZoomControls';
import TimelineContainer from './TimelineContainer';
import { routes, zoomLevels } from '../constants/constants';

const GanttChart = () => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const [zoomValue, setZoomValue] = useState(0);

  useEffect(() => {
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
      start: moment('2025-05-12 08:00 AM', 'YYYY-MM-DD hh:mm A').toDate(),
      end: moment('2025-05-12 06:00 PM', 'YYYY-MM-DD hh:mm A').toDate(),
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
      min: moment('2025-05-12 06:00 AM', 'YYYY-MM-DD hh:mm A').toDate(),
      max: moment('2025-05-12 08:00 PM', 'YYYY-MM-DD hh:mm A').toDate(),
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
    const startTime = moment('2025-05-12 08:00 AM');

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
        Gantt View for Route Planning
      </Typography>
      <ZoomControls zoomValue={zoomValue} onZoomChange={handleZoomChange} />
      <TimelineContainer ref={containerRef} />
    </Box>
  );
};

export default GanttChart;
