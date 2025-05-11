export const routes = [
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

export const zoomLevels = [
  { value: 0, label: '12h', hours: 12 },
  { value: 1, label: '6h', hours: 6 },
  { value: 2, label: '4h', hours: 4 },
  { value: 3, label: '2h', hours: 2 },
  { value: 4, label: '1h', hours: 1 },
  { value: 5, label: '30m', hours: 0.5 },
];
