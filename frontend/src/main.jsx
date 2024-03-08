import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,  createRoutesFromElements,  Route, RouterProvider  } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './Screens/HomeScreen.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import ProfileScreen from './Screens/ProfileScreen.jsx';


// Création du routeur
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/login' element={<LoginScreen />} />
      <Route  path='/register' element={<RegisterScreen />} />
      {/* Toutes les routes qui doivent être privées */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen/>} />
      </Route>
    </Route>
  )
);

// Rendu de l'application dans la racine du DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)

/*
index={true} indique que cette route est l’itinéraire par **défaut** lorsque l’URL correspond à la racine (/)
path='/' = chemin qui doit être suivi
element={<HomeScreen />} = le composant rendu
*/