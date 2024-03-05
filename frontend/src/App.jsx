import './App.css'
import Header from './components/Header'
import {Outlet} from 'react-router-dom'
//import HomeScreen from './Screens/HomeScreen'
import { Container } from 'react-bootstrap';

function App() {
 

  return (
    <>
    <Header/>
    <Container className='my-2'>
    <Outlet /> {/* Point d'insertion pour les écrans spécifiques */}
    </Container>
    </>
  )
}

export default App


/*
<Outlet>
 Lorsque vous naviguez vers une URL qui correspond à une route, 
 le composant associé à cette route sera rendu à l’intérieur de l’<Outlet>
  C'est une pratique recommandée pour gérer la navigation 
  et l’affichage des écrans dans une application React avec React Router.
*/