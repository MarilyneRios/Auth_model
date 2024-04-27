// apiSlice.js
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//configuration requête
//const baseQuery = fetchBaseQuery({ baseUrl: '' });
const baseQuery = fetchBaseQuery({ baseUrl: 'https://auth-model-backend.vercel.app' });


//création d'API
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], 
  endpoints: (builder) => ({
   
  }),
});
