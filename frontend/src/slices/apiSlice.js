import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//configuration requête
const baseQuery = fetchBaseQuery({ baseUrl: '' });

//création d'API
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], // Types de balises (tags) pour la mise en cache
  endpoints: (builder) => ({
    //définition des endpoints = une requête
    // pour récupérer des data dps des API backend
  }),
});