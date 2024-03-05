import { configureStore } from '@reduxjs/toolkit';

// création du store Redux
const store = configureStore({
  reducer: {
    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(), // Middleware par défaut
    devTools: true, // Activation de l'intégration Redux DevTools
});

export default store;