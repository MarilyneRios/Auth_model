
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;

/**
 Afin de protéger certaines routes
  qui ne devraient être accessibles qu’aux utilisateurs connectés. 

  Si un utilisateur non connecté tente d’accéder à une de ces routes, 
  il sera redirigé vers la page de connexion.
 */