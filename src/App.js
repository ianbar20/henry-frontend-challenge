import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Provider from './components/Provider/Provider';
import Client from './components/Client/Client';
import { TIMEOUT_MINUTES } from './constants';


// Main App Component
const App = () => {
  const [userType, setUserType] = useState(null); // 'provider' or 'client'
  const [user, setUser] = useState(null); // user ID
  const [providers, setProviders] = useState(() => JSON.parse(localStorage.getItem('providers')) || [
  ]);
  const [clients, setClients] = useState(() => JSON.parse(localStorage.getItem('clients')) || [
  ]);

  useEffect(() => {
    localStorage.setItem('providers', JSON.stringify(providers));
    console.log('providers', providers)
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
    console.log('clients', clients)

  }, [clients]);

  // check for and delete any expired reserved time slots
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('checking for expired reservations...')
      setClients(prevClients => prevClients.map(client => {
        const now = new Date();
        const reservedSlot = client.reservedSlot;
        if (reservedSlot) {
          const slotTime = new Date(reservedSlot.timestamp);
          slotTime.setMinutes(slotTime.getMinutes() + TIMEOUT_MINUTES); 
          
          // If the current time is more than timeoutMinutes after the slot time, remove the slot
          if (now > slotTime) {
            console.log('removing slot: ', reservedSlot, 'for client: ', client.id);
            return { ...client, reservedSlot: null };
          }
        }

        return client;
      }));
    }, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [setClients]);

  const addNewClient = (id) => {
    setClients(prevClients => {
      // check if a client with the given ID already exists
      if (!prevClients.some(client => client.id === id)) {
        // if not, add a new client with the given ID
        return [...prevClients, { id }];
      }

      // if a client with the given ID already exists, return the previous clients without any changes
      return prevClients;
    });
  };

  const addNewProvider = (id) => {
    setProviders(prevProviders => {
      // check if a provider with the given ID already exists
      if (!prevProviders.some(provider => provider.id === id)) {
        // if not, add a new provider with the given ID
        return [...prevProviders, { id, schedule: [], confirmedSlots: [] }];
      }

      // if a provider with the given ID already exists, return the previous providers without any changes
      return prevProviders;
    });
  };

  const addProviderAvailability = (providerId, date, startTime, endTime) => {
    setProviders(prevProviders => prevProviders.map(provider =>
      provider.id === providerId
        ? { ...provider, schedule: [...provider.schedule, { date, startTime, endTime }] }
        : provider
    ));
  };

  const reserveSlot = (clientId, slot) => {
    setClients(prevClients => prevClients.map(client =>
      client.id === clientId
        ? { ...client, reservedSlot: slot }
        : client
    ));
  };

  const confirmSlot = (clientId, slot) => {
    setProviders(prevProviders => prevProviders.map(provider =>
      provider.id === slot.providerId
        ? {
          ...provider,
          confirmedSlots: [...(provider.confirmedSlots || []), { date: slot.date, clientId, providerId: slot.providerId, time: slot.time }]
        }
        : provider
    ));
  };

  if (!userType) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-500">
        <div className="bg-white shadow-xl rounded p-12 mb-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Are you a provider or a client?</h2>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setUserType('provider')}>I'm a Provider</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setUserType('client')}>I'm a Client</button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login setUser={setUser} addNewProvider={addNewProvider} addNewClient={addNewClient} userType={userType} />;
  }

  return userType === 'provider' ? (
    <Provider id={user} schedule={providers.find(provider => provider.id === user).schedule} addProviderAvailability={addProviderAvailability} />
  ) : (
    <Client client={clients.find(client => client.id === user)} providers={providers} setProviders={setProviders} reserveSlot={reserveSlot} confirmSlot={confirmSlot} />
  );
};

export default App;