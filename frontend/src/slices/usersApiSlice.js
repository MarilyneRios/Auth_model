//configuration d’endpoints pour gérer les appels d’API liés aux users avec Redux en utilisant RTK Query
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
    }),
})


// attention par convention le nom est "use+Nom+Mutation"
export const {
    useLoginMutation,
  } = userApiSlice;


  /*
   une mutation = une requête qui modifie l’état côté serveur.
  */