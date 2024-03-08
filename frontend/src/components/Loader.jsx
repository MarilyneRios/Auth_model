import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    ></Spinner>
  );
};

export default Loader;

/*
Afficher un spinner de chargement en attendant la connexion:

animation='border': le spinner aura une animation de rotation de bordure.
role='status': le rôle ARIA du spinner, qui est utilisé pour l’accessibilité.
*/