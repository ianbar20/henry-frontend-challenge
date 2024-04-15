import { useState } from "react";
import { formatTime, formatDate, timeToMinutes } from "../../utils/dateAndTime";
const Provider = ({ id, schedule, addProviderAvailability }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const now = new Date();
  now.setHours(24, 0, 0, 0); // Set the time to the start of the next day
  const minDate = now.toISOString().split('T')[0];
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const minTime = date === minDate ? `${hours}:${minutes}` : "00:00";


  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the start and end times to minutes for easier comparison
    const newStartTime = timeToMinutes(startTime);
    const newEndTime = timeToMinutes(endTime);

    // Check for overlapping time slots
    const isOverlap = schedule.some(slot => {
      if (slot.date !== date) return false; // If the dates are not the same, there's no overlap

      const existingStartTime = timeToMinutes(slot.startTime);
      const existingEndTime = timeToMinutes(slot.endTime);

      // If the new time slot starts or ends during an existing time slot, there's an overlap
      return (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime <= existingEndTime);
    });

    if (isOverlap) {
      alert('This time slot overlaps with an existing time slot. Please select a different time slot.');
      return;
    }

    addProviderAvailability(id, date, startTime, endTime);
    setDate('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-500">
      <div className="bg-white shadow-xl rounded p-12 mb-4">
        <h2 className="text-2xl font-bold text-center">Provider ID: {id}</h2>
        <h2 className="text-2xl font-bold text-center">List new work availability</h2>
        <p className='text-sm text-red-500 mb-6 text-center'>please note, availability must be submitted at least 24 hours in advance.</p>
        <ul>
          {schedule
            .filter(slot => new Date(slot.date + 'T' + slot.startTime) > new Date()) // Filter out past slots
            .map((slot, index) => {
              const formattedDate =  formatDate(slot.date);
              const formattedStartTime = formatTime(slot.startTime);
              const formattedEndTime = formatTime(slot.endTime);

              return (
                <li key={index} className="flex justify-between pb-2">
                  <div className="w-1/2">{formattedDate}</div>
                  <div className="w-1/2">{formattedStartTime} - {formattedEndTime}</div>
                </li>
              );
            })}
        </ul>
        <form onSubmit={handleSubmit}>
          <input data-testid="date-input" className="border-2" type="date" min={minDate} value={date} onChange={e => setDate(e.target.value)} required />
          <input data-testid="start-time-input" className="border-2 ml-2" type="time" min={minTime} value={startTime} onChange={e => setStartTime(e.target.value)} required />
          <input data-testid="end-time-input" className="border-2 ml-2" type="time" min={startTime} value={endTime} onChange={e => setEndTime(e.target.value)} required />
          <button data-testid="submit-button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded" type="submit">Submit Time Slot</button>
        </form>
      </div>
    </div>
  );
};

export default Provider;