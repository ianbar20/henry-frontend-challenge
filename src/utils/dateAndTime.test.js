import { formatDate, formatTime, timeToMinutes, addFifteenMinutes, addMinutesHHMM } from './dateAndTime';

describe('dateAndTime', () => {
  test('formatDate formats a date string correctly', () => {
    const date = '2024-10-11';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Friday, October 11, 2024');
  });

  test('formatTime formats a time string correctly', () => {
    const time = '09:00';
    const formattedTime = formatTime(time);
    expect(formattedTime).toBe('9:00 AM');
  });

  test('timeToMinutes converts a time string to minutes correctly', () => {
    const time = '09:15';
    const minutes = timeToMinutes(time);
    expect(minutes).toBe(555);
  });

  test('addMinutesHHMM adds given minutes to a time string correctly', () => {
    const time = '09:00';
    const newTime = addMinutesHHMM(time, 15);
    expect(newTime).toBe('09:15');
  });
});