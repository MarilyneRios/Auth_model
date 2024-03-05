import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>MERN Authentication modèle</h1>
                    <p className='text-center mb-4'>
                    Voici une structure de base pour l’authentification MERN 
                    qui stocke un JWT dans un cookie HTTP-Only. 
                    Elle utilise également Redux Toolkit et la bibliothèque React Bootstrap.
                    </p>
                    <div className='d-flex'>
                        <LinkContainer to='/login'>
                            <Button variant='primary'  className='me-3'>
                                Connexion
                            </Button>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Button variant='secondary'>
                                Inscription
                            </Button>
                        </LinkContainer>
                    </div>
                </Card>
            </Container>
         </div>
    );

}

export default Hero