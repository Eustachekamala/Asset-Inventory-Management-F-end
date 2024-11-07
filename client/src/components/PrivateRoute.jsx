// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, role, ...rest }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
const auth = useSelector((state) => state.auth);  // This will return the entire `auth` state
  const { isAuthenticated, user } = auth || {};
//   if (!isAuthenticated) {
//     return <Redirect to="/login" />;
//   }

//   if (role && user.role !== role) {
//     return <Redirect to="/unauthorized" />;
//   }

//   return <Route {...rest} render={() => children} />;
// };
if (!auth) {
    // Optionally, handle the case when `auth` is undefined
    console.error('auth state is undefined');
    return <Navigate to="/login" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" />;
  }
  return element
}
export default PrivateRoute;