// apiSlice.js
/*
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//configuration requête
//const baseQuery = fetchBaseQuery({ baseUrl: '' });
const baseQuery = fetchBaseQuery({ baseUrl: 'https://auth-model.onrender.com/' });


//création d'API
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], 
  endpoints: (builder) => ({
   
  }),
});
*/

//-------------------envoyer les cookies d'un domaine a.domain.ltd vers un domaine b.domain.ltd---------
// apiSlice.js
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//configuration requête
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://auth-model.onrender.com/',
  prepareHeaders: (headers, { getState }) => {
    // Use the `getState` function to get the current state
    const { user } = getState();
    // token
    if (user.token) {
      headers.set('authorization', `Bearer ${user.token}`);
    }
    return headers;
  },
  credentials: 'include', 
});

//création d'API
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], 
  endpoints: (builder) => ({
    // Vos endpoints vont ici
  }),
});
