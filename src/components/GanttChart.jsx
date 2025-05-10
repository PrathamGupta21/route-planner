import { useRef, useEffect } from 'react';
import moment from 'moment';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

const GanttChart = () => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

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
      zoomable: false,
      format: {
        minorLabels: {
          hour: 'hh:mm A',
        },
        majorLabels: {
          hour: 'hh:mm A',
        },
      },
    };

    timelineRef.current = new Timeline(
      containerRef.current,
      items,
      groups,
      options
    );

    return () => timelineRef.current?.destroy();
  }, []);

  return (
    <>
      <h1>Gantt Chart for Routes</h1>
      <div ref={containerRef} />
    </>
  );
};

export default GanttChart;
