import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6} className='card p-5'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

/*
 un composant qui crée une mise en page centrée : 
 avec une colonne de largeur fixe pour afficher le contenu (enfants) que vous lui passez,
 utile pour créer des formulaires (signIn, signUp...)
*/