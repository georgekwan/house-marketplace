import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const PrivateRoute = () => {
  // Destructure useAuthStatus into loggedIn and checkingStatus
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h3>Loading...</h3>;
  }

  // If user is not logged in it would forward to sign in page
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
