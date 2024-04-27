// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        //Les informations d'identification
      setCredentials: (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      },

      // Déconnexion
      logout: (state) => {
        state.userInfo = null;
        localStorage.removeItem('userInfo');
      },
    },
  });
  
  // Exporte les actions générées automatiquement par createSlice
  export const { setCredentials, logout } = authSlice.actions;
  
  export default authSlice.reducer;

  /*
  stockez les informations d’identification dans le localStorage. 
  Pour conserver les données entre les sessions de l’utilisateur.
  */