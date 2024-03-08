import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { TiUserAddOutline } from "react-icons/ti";

import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

 
 const [logoutApiCall] = useLogoutMutation();

 const handleLogout = async () => {
   try {
     await logoutApiCall().unwrap();
     dispatch(logout());
     navigate('/login');
   } catch (err) {
     console.error(err);
   }
 };

    return (
        <header>
          <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>MERN Auth modèle</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Navbar.Brand>A propos</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav'/>
              <Navbar.Collapse id='basic-navbar-nav'>

                <Nav className='ms-auto'>
                {userInfo ? (
                  <>
                  <NavDropdown title={userInfo.username} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                      <CgProfile/> Profile
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/private'>
                      <NavDropdown.Item>
                       Page Privée
                      </NavDropdown.Item>
                    </LinkContainer>
                   
                    <NavDropdown.Item  onClick={handleLogout}>
                    <FaSignOutAlt/>Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  </>
                  ) : (
                    <>
                      <LinkContainer to='/login'>
                          <Nav.Link>
                          <FaSignInAlt/> Connexion
                          </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/register'>
                          <Nav.Link>
                          <TiUserAddOutline/> Inscription
                          </Nav.Link>
                        </LinkContainer>
                    </>                
                    )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      );
    };
    
    export default Header;
