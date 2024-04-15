import { formatTime } from "../../utils/dateAndTime";

const TimeDropdown = ({ value, onChange, startTime, endTime, confirmedSlots }) => {
  const times = [];
  let start = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  let end = parseInt(endTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);

  for (let i = start; i < end; i += 15) {
    const startHours = Math.floor(i / 60).toString().padStart(2, '0');
    const startMinutes = (i % 60).toString().padStart(2, '0');
    const time = `${startHours}:${startMinutes}`;

    const endHours = Math.floor((i + 15) / 60).toString().padStart(2, '0');
    const endMinutes = ((i + 15) % 60).toString().padStart(2, '0');
    const endTime = `${endHours}:${endMinutes}`;


    // Check if the time slot is already confirmed
    const isConfirmed = confirmedSlots.some(confirmedSlot => confirmedSlot.time === time);

    if (!isConfirmed) {
      times.push({ startTime: time, endTime });
    }
  }

  return (
    <select data-testid="time-dropdown" value={value} onChange={onChange}>
      <option value="">-- Select a time --</option>
      {times.map(({ startTime, endTime }) => (
        <option key={startTime} value={startTime}>
          {formatTime(startTime)} - {formatTime(endTime)}
        </option>
      ))}
    </select>
  );
};

export default TimeDropdown;