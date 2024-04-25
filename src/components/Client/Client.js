import TimeDropdown from "../TimeDropdown/TimeDropdown";
import React, { useState } from "react";
import { formatDate, formatTime, addMinutesHHMM, addMinutes } from "../../utils/dateAndTime";
import { TIMEOUT_MINUTES } from "../../constants";

const Client = ({ client, providers, reserveSlot, confirmSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleTimeSelection = (slot, time) => {
    const now = new Date();
    const slotDate = new Date(`${slot.date}T${time}:00`);
    const diffInHours = (slotDate - now) / 1000 / 60 / 60;

    if (diffInHours < 24) {
      alert('The start time of a slot must be at least 24 hours in the future.');
      return;
    }

    const isSlotConfirmed = providers.some(provider =>
      provider.confirmedSlots?.some(confirmedSlot =>
        confirmedSlot.date === slot.date && confirmedSlot.time === time
      )
    );
    if (isSlotConfirmed) {
      alert('This slot is already booked. Please select a different slot.');
      return;
    }

    const newSlot = { ...slot, time };
    setSelectedSlot(newSlot);
  };

  const handleConfirmButtonClick = () => {
    confirmSlot(client.id, client.reservedSlot);
  };

  const handleReserveButtonClick = () => {
    const slotWithTimeStamp = { ...selectedSlot, timestamp: new Date() }
    reserveSlot(client.id, slotWithTimeStamp);
    setSelectedSlot(null);
  };

  const confirmedSlots = providers.flatMap(provider => provider.confirmedSlots || []).filter(slot => slot.clientId === client.id);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-500">
      <div className="bg-white shadow-xl rounded p-12 mb-4">
        <h2 className="text-2xl font-bold text-center">Client ID: {client.id}</h2>
        <h2 className="text-2xl font-bold text-center">Reserve a new time slot</h2>
        <p className='text-sm text-red-500 mb-6 text-center'>please note, time slots must be made at least 24 hours in advance.</p>
        {client.reservedSlot &&
          <div>
            <h3 className="text-xl font-bold mb-2 mt-8">Reserved time slots:</h3>
            <div className="grid grid-cols-5 gap-4">
              <span className='pr-6'>Provider ID: {client.reservedSlot.providerId}</span>
              <span className='pr-6'>{formatDate(client.reservedSlot.date)}</span>
              <span>{formatTime(client.reservedSlot.time)} - {formatTime(addMinutesHHMM(client.reservedSlot.time, 15))}</span>
              {client.reservedSlot.timestamp && <span className='text-red-500'>Expires: {addMinutes(client.reservedSlot.timestamp, TIMEOUT_MINUTES).toLocaleString()}</span>
              }
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold ml-2 py-2 px-4 mt-2 rounded" onClick={handleConfirmButtonClick}>Confirm</button>

            </div>
          </div>

        }

        {confirmedSlots.length > 0 &&
          <div className="text-gray-500">
            <h3 className="text-xl font-bold mb-2 mt-8">Confirmed Time Slots:</h3>
            <ul>
              {confirmedSlots.map((slot, index) => (
                <li key={index} className="grid grid-cols-5 gap-4">
                  <span className='pr-6'>Provider ID: {slot.providerId}</span>
                  <span className='pr-6'>{formatDate(slot.date)}</span>
                  <span>{formatTime(slot.time)} - {formatTime(addMinutesHHMM(slot.time, 15))}</span>
                </li>
              ))}
            </ul>


          </div>
        }


        {providers.length > 0 ? (providers.map(provider => (
          <div key={provider.id}>

            <h3 className="text-xl font-bold mb-2 mt-8">Provider ID: {provider.id}</h3>
            <div className="grid grid-cols-2 gap-4">
              {provider.schedule.length > 0 ? (
                provider.schedule
                  .filter(slot => new Date(slot.date + 'T' + slot.startTime) > new Date()) // Filter out past slots
                  .map((slot, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <div>{formatDate(slot.date)}</div>
                        <div>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</div>
                      </div>

                      <TimeDropdown className="w-auto" startTime={slot.startTime} endTime={slot.endTime} confirmedSlots={provider.confirmedSlots || []} placeholder='--:--' onChange={e => handleTimeSelection({ ...slot, providerId: provider.id }, e.target.value)} />

                    </React.Fragment>
                  ))
              ) : (<p>This provider has not listed any availability.</p>)}
            </div>
          </div>
        ))) : (<p>There are currently no providers.</p>)}
        {selectedSlot && (
          <div className="flex flex-col items-center">
            <p className='mt-8 font-bold'>
            Reserve time slot on {formatDate(selectedSlot.date)} at {formatTime(selectedSlot.time)} with provider {selectedSlot.providerId}?
            </p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold ml-2 py-2 px-4 mt-2 rounded" onClick={handleReserveButtonClick}>Reserve</button>
          </div>
        )}

      </div>

    </div>
  );
};

export default Client;