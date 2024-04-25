export function formatDate(dateString) {
  const date = new Date(dateString + 'T12:00:00Z');
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatTime(timeString) {
  const time = new Date(`1970-01-01T${timeString}:00`);
  return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

export function timeToMinutes(time) {
  const [hours, minutes] = time.split(':');
  return parseInt(hours) * 60 + parseInt(minutes);
};

export function addMinutesHHMM(time, minutesToAdd) {
  const date = new Date(`1970-01-01T${time}:00`); // Use a dummy date
  date.setMinutes(date.getMinutes() + minutesToAdd);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export function addMinutes(timestamp, minutesToAdd) {
  const dateFromTime = new Date(timestamp)
  dateFromTime.setMinutes(dateFromTime.getMinutes() + minutesToAdd);
  return dateFromTime;
};