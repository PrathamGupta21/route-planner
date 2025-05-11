import moment from 'moment';

export const ROUTE_DATA = [
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

export const ZOOM_LEVELS = [
  { value: 0, label: '12h', hours: 12 },
  { value: 1, label: '6h', hours: 6 },
  { value: 2, label: '4h', hours: 4 },
  { value: 3, label: '2h', hours: 2 },
  { value: 4, label: '1h', hours: 1 },
  { value: 5, label: '30m', hours: 0.5 },
];

export const DEFAULT_DATE = '2025-05-12';

export const TIMELINE_OPTIONS = {
  start: moment(`${DEFAULT_DATE} 08:00 AM`, 'YYYY-MM-DD hh:mm A').toDate(),
  end: moment(`${DEFAULT_DATE} 06:00 PM`, 'YYYY-MM-DD hh:mm A').toDate(),
  min: moment(`${DEFAULT_DATE} 06:00 AM`, 'YYYY-MM-DD hh:mm A').toDate(),
  max: moment(`${DEFAULT_DATE} 08:00 PM`, 'YYYY-MM-DD hh:mm A').toDate(),
  orientation: 'top',
  zoomable: true,
  moveable: true,
  format: {
    minorLabels: { hour: 'hh:mm A' },
    majorLabels: { hour: 'hh:mm A' },
  },
};
