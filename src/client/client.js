import { ApolloClient, InMemoryCache, gql, useMutation, useQuery } from '@apollo/client';

// Create a new Apollo Client instance
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL server URI
  cache: new InMemoryCache()
});

// Define your GraphQL types
export const typeDefs = gql`
  type Provider {
    id: String!
    schedule: [Schedule!]!
  }

  type Client {
    id: String!
    reservations: [Reservation!]!
  }

  type Schedule {
    date: String!
    startTime: String!
    endTime: String!
  }

  type Reservation {
    providerId: String!
    slot: String!
  }
  
`;

// Define your GraphQL queries
export const GET_PROVIDERS = gql`
  query GetProviders {
    providers {
      id
      schedule
    }
  }
`;

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      reservations
    }
  }
`;

export const GET_PROVIDER = gql`
  query GetProvider($id: ID!) {
    provider(id: $id) {
      id
      schedule
    }
  }
`;

export const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    client(id: $id) {
      id
      reservations
    }
  }
`;

// Define your GraphQL mutations
export const ADD_PROVIDER = gql`
  mutation AddProvider($id: ID!, $schedule: [String!]!) {
    addProvider(id: $id, schedule: $schedule) {
      id
      schedule
    }
  }
`

export const ADD_CLIENT = gql`
mutation AddClient($id: ID!) {
  addClient(id: $id) {
    id
  }
}
`;

export const RESERVE_SLOT = gql`
  mutation ReserveSlot($clientId: ID!, $providerId: ID!, $slot: String!) {
    reserveSlot(clientId: $clientId, providerId: $providerId, slot: $slot) {
      id
      reservations
    }
  }
`;

export const CONFIRM_RESERVATION = gql`
  mutation ConfirmReservation($clientId: ID!, $slot: String!) {
    confirmReservation(clientId: $clientId, slot: $slot) {
      id
      reservations
    }
  }
`;

export const UPDATE_PROVIDER_AVAILABILITY = gql`
mutation AddProviderAvailability($providerId: ID!, $date: String!, $startTime: String!, $endTime: String!) {
  addProviderAvailability(providerId: $providerId, date: $date, startTime: $startTime, endTime: $endTime) {
    id
    schedule {
      date
      startTime
      endTime
    }
  }
}
`;

export const DELETE_EXPIRED_RESERVATIONS = gql`
  mutation DeleteExpiredReservations($clientId: ID!, $timestamp: String!) {
    deleteExpiredReservations(clientId: $clientId, timestamp: $timestamp) {
      id
      reservations {
        timestamp
      }
    }
  }
`;