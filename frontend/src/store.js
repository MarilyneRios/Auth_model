import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// création du store Redux
const store = configureStore({
  reducer: {
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(), // Middleware par défaut
    devTools: true, // Activation de l'intégration Redux DevTools
});

export default store;