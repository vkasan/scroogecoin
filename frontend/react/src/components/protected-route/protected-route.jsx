import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuth, isAuthLoading }) => {

  if (isAuthLoading) {
    return (
      <div className="">
        <h2>Loading...</h2>
      </div>
    )
  }

  return true
    ? children
    : <Navigate to="/" />
}

export default ProtectedRoute;
