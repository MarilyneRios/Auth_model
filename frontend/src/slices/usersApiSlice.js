//usersApliSlice.js
import { apiSlice } from './apiSlice';

// l’URL de base pour les appels d’API liés users
const USERS_URL = '/api/users';

// Ces endpoints = requêtes exposées pour récupérer des données à partir de votre backend.
export const userApiSlice = apiSlice.injectEndpoints ({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
              }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
              }),
        }),
        logout:  builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
               }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/profile`,
              method: 'PUT',
              body: data,
            }),
        }),    
    }),
})


// attention par convention le nom est "use+Nom+Mutation"
export const {
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
  } = userApiSlice;


  /*
   une mutation = une requête qui modifie l’état côté serveur.
  */