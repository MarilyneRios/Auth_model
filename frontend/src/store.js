import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';

// création du store Redux
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // gère l’état lié aux API
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
  //  fusionne le middleware par défaut avec le middleware apiSlice pour gérer les actions
    getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true, // Activation de Redux DevTools
});

export default store;