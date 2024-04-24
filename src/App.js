import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Provider from './components/Provider/Provider';
import Client from './components/Client/Client';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_CLIENT, ADD_PROVIDER, CONFIRM_RESERVATION, DELETE_EXPIRED_RESERVATIONS, GET_CLIENT, GET_CLIENTS, GET_PROVIDER, GET_PROVIDERS, RESERVE_SLOT, UPDATE_PROVIDER_AVAILABILITY } from './client/client';


// Main App Component
const App = () => {
  const [userType, setUserType] = useState(null); // 'provider' or 'client'
  const [user, setUser] = useState(null); // user ID

  // Use useQuery hooks to fetch data
  // const { loading: loadingProviders, data: providersData } = useQuery(GET_PROVIDERS);
  const { loading: loadingClients, data: clientsData } = useQuery(GET_CLIENTS);

  const { data: providerData } = useQuery(GET_PROVIDER, { variables: { id: user } });
  const { data: clientData } = useQuery(GET_CLIENT, { variables: { id: user } });

  // Use useMutation hooks to send mutations
  const [addProvider] = useMutation(ADD_PROVIDER);
  const [addClient] = useMutation(ADD_CLIENT);
  const [reserveSlot] = useMutation(RESERVE_SLOT);
  const [confirmReservation] = useMutation(CONFIRM_RESERVATION);
  const [updateProviderAvailability] = useMutation(UPDATE_PROVIDER_AVAILABILITY);
  const [deleteExpiredReservations] = useMutation(DELETE_EXPIRED_RESERVATIONS);



  // const [providers, setProviders] = useState(() => JSON.parse(localStorage.getItem('providers')) || [
  // ]);
  // const [clients, setClients] = useState(() => JSON.parse(localStorage.getItem('clients')) || [
  // ]);

  // useEffect(() => {
  //   localStorage.setItem('providers', JSON.stringify(providers));
  //   console.log('providers', providers)
  // }, [providers]);

  // useEffect(() => {
  //   localStorage.setItem('clients', JSON.stringify(clients));
  //   console.log('clients', clients)

  // }, [clients]);


  useEffect(() => {
    const timeoutMinutes = 30;
    const intervalId = setInterval(() => {
      console.log('checking for expired reservations...')
      clientsData.clients.forEach(client => {
        const now = new Date();
        const reservedSlot = client.reservedSlot;
        if (reservedSlot) {
          const slotTime = new Date(reservedSlot.timestamp);
          slotTime.setMinutes(slotTime.getMinutes() + timeoutMinutes); 
  
          // If the current time is more than timeoutMinutes after the slot time, remove the slot
          if (now > slotTime) {
            deleteExpiredReservations({ variables: { clientId: client.id, timestamp: reservedSlot.timestamp } });
          }
        }
      });
    }, 60000); // Check every minute
  
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [clientsData, deleteExpiredReservations]);

  // check for and delete any expired reserved time slots
  // useEffect(() => {
  //   const timeoutMinutes = 15;
  //   const intervalId = setInterval(() => {
  //     console.log('checking for expired reservations...')
  //     setClients(prevClients => prevClients.map(client => {
  //       const now = new Date();
  //       const reservedSlot = client.reservedSlot;
  //       if (reservedSlot) {
  //         const slotTime = new Date(reservedSlot.timestamp);
  //         slotTime.setMinutes(slotTime.getMinutes() + timeoutMinutes); // Add 30 minutes to the slot time

  //         // If the current time is more than 30 minutes after the slot time, remove the slot
  //         if (now > slotTime) {
  //           return { ...client, reservedSlot: null };
  //         }
  //       }

  //       return client;
  //     }));
  //   }, 60000); // Check every minute

  //   return () => clearInterval(intervalId); // Clean up the interval on unmount
  // }, [setClients]);


  const addNewClient = (id) => {
    addClient({ variables: { id } });
  };

  const addNewProvider = (id) => {
    addProvider({ variables: { id } });
  };

  // const reserveNewSlot = (clientId, slot) => {
  //   reserveSlot({ variables: { clientId, slot } });
  // };

  // const confirmSlot = (clientId, slot) => {
  //   confirmReservation({ variables: { clientId, slot } });
  // };

  const addProviderAvailability = (providerId, date, startTime, endTime) => {
    updateProviderAvailability({ variables: { providerId, date, startTime, endTime } });
  };


    // const addNewClient = (id) => {
  //   setClients(prevClients => {
  //     // check if a client with the given ID already exists
  //     if (!prevClients.some(client => client.id === id)) {
  //       // if not, add a new client with the given ID
  //       return [...prevClients, { id }];
  //     }

  //     // if a client with the given ID already exists, return the previous clients without any changes
  //     return prevClients;
  //   });
  // };

  // const addNewProvider = (id) => {
  //   setProviders(prevProviders => {
  //     // check if a provider with the given ID already exists
  //     if (!prevProviders.some(provider => provider.id === id)) {
  //       // if not, add a new provider with the given ID
  //       return [...prevProviders, { id, schedule: [], confirmedSlots: [] }];
  //     }

  //     // if a provider with the given ID already exists, return the previous providers without any changes
  //     return prevProviders;
  //   });
  // };

  // const addProviderAvailability = (providerId, date, startTime, endTime) => {
  //   setProviders(prevProviders => prevProviders.map(provider =>
  //     provider.id === providerId
  //       ? { ...provider, schedule: [...provider.schedule, { date, startTime, endTime }] }
  //       : provider
  //   ));
  // };

  // const reserveSlot = (clientId, slot) => {
  //   setClients(prevClients => prevClients.map(client =>
  //     client.id === clientId
  //       ? { ...client, reservedSlot: slot }
  //       : client
  //   ));
  // };

  // const confirmSlot = (clientId, slot) => {
  //   setProviders(prevProviders => prevProviders.map(provider =>
  //     provider.id === slot.providerId
  //       ? {
  //         ...provider,
  //         confirmedSlots: [...(provider.confirmedSlots || []), { date: slot.date, clientId, providerId: slot.providerId, time: slot.time }]
  //       }
  //       : provider
  //   ));
  // };

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
    <Provider id={user} />
  ) : (
    <Client id={user} />
  );
};

export default App;