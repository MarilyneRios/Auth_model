import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import  { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'; // stocker les infos d’identification de l’user
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useLoginMutation retourne un tableau avec deux éléments :
  //Le 1er élément (login)  une fonction.
  //Le 2e élément ({ isLoading }) un objet qui contient des infos sur l’état de chargement actuel.
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const res = await login({ email, password }).unwrap(); // explications unwrap() bas de page
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      //console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Connexion</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Addresse email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader/>}

        <Button
         
          type="submit"
          variant="primary"
          className="mt-3 w-100"
        >
          Se connecter
        </Button>
      </Form>

     

      <Row className="py-3">
        <Col>
          Nouvel utilisateur? <Link to="/register">Inscription</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;

/*
await :
Lorsque vous utilisez await, cela indique à JavaScript d’attendre que la promesse (dans ce cas, la mutation login) : 
soit résolue avant de continuer l’exécution du code.
Cela garantit que le résultat de la mutation est disponible avant de passer à l’étape suivante.

.unwrap() :
Dans **le contexte de RTK Query**, 
.unwrap() est utilisé pour extraire la valeur résolue de la promesse.
Si la mutation réussit, .unwrap() renvoie la valeur de la réponse (par exemple, les données de l’utilisateur connecté).
Si la mutation échoue (par exemple, en cas d’erreur d’authentification), .unwrap() génère une erreur.
*/