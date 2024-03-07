// gestion des appels d’API avec Redux Toolkit et RTK Query
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//configuration requête
const baseQuery = fetchBaseQuery({ baseUrl: '' });

//création d'API
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], 
  endpoints: (builder) => ({
   
  }),
});

/*
 baseQuery = objet que l'on configure avant.
tagTypes = les types de balises (tags) pour la mise en cache (User).
endpoints = fonction qui définit les endpoints (requêtes) que l'on veut exposer.
 */