import { Navbar, Nav, Container} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
//import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <header>
          <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
            
                <Navbar.Brand>MERN Auth modèle</Navbar.Brand>
           
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                <Nav.Link href='/login'>
                    <FaSignInAlt/> Connexion
                </Nav.Link>
                <Nav.Link href='/register'>
                    <FaSignOutAlt/> Inscription
                </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      );
    };
    
    export default Header;
