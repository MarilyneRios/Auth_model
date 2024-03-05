import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,  createRoutesFromElements,  Route, RouterProvider  } from 'react-router-dom';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomeScreen from './Screens/HomeScreen.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';


// Création du routeur
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/login' element={<LoginScreen />} />
      <Route  path='/register' element={<RegisterScreen />} />
    </Route>
  )
);

// Rendu de l'application dans la racine du DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)

/*
index={true} indique que cette route est l’itinéraire par **défaut** lorsque l’URL correspond à la racine (/)
path='/' = chemin qui doit être suivi
element={<HomeScreen />} = le composant rendu
*/