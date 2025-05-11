import { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import Box from '@mui/material/Box';
import {
  DEFAULT_DATE,
  ROUTE_DATA,
  TIMELINE_OPTIONS,
  ZOOM_LEVELS,
} from '../constants/constants';
import GanttHeader from './GanttHeader';
import TimelineContainer from './TimelineContainer';
import ZoomControls from './ZoomControls';

const GanttChart = () => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const [zoomValue, setZoomValue] = useState(0);

  useEffect(() => {
    const items = ROUTE_DATA.flatMap((route, index) =>
      route.route.map((task) => ({
        id: `${index}_${task.seq}`,
        group: index,
        content: `${task.seq}`,
        start: moment(
          `${DEFAULT_DATE} ${task.start_time}`,
          'YYYY-MM-DD h:mm A'
        ).toDate(),
        end: moment(
          `${DEFAULT_DATE} ${task.end_time}`,
          'YYYY-MM-DD h:mm A'
        ).toDate(),
      }))
    );

    const groups = ROUTE_DATA.map((_, index) => ({
      id: index,
      content: `Route ${index + 1}`,
    }));

    timelineRef.current = new Timeline(
      containerRef.current,
      items,
      groups,
      TIMELINE_OPTIONS
    );

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;

    const { hours } = ZOOM_LEVELS[zoomValue];
    const startTime = moment(`${DEFAULT_DATE} 08:00 AM`, 'YYYY-MM-DD hh:mm A');

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
      <GanttHeader />
      <ZoomControls
        value={zoomValue}
        onChange={handleZoomChange}
        levels={ZOOM_LEVELS}
      />
      <TimelineContainer containerRef={containerRef} />
    </Box>
  );
};

export default GanttChart;
