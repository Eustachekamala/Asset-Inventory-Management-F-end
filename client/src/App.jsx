import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AssetDashboard from './components/Asset/AssetDashboard';
import ProcurementManagerDashboard from './components/ProcurementManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import RequestHistory from './components/Request/RequestHistory';
import RequestForm from './components/Request/RequestForm';
import AdminDashboard from './components/AdminDashboard';
import { useSelector } from 'react-redux';
import Unauthorized from './components/Unauthorized';
import RequestStatus from './components/Request/RequestStatus';

const PrivateRoute = ({ element, role, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/*Public Routes for Request Status */}
          <Route path="/request-status" element={<RequestStatus />} />

          {/* Protected Routes for specific roles */}
          <Route
            path="/assets"
            element={<PrivateRoute element={<AssetDashboard />} />}
          />
          <Route
            path="/requests"
            element={<PrivateRoute element={<RequestHistory />} />}
          />
          <Route
            path="/requests/new"
            element={<PrivateRoute element={<RequestForm />} />}
          />
          
          {/* Procurement Manager Route */}
          <Route
            path="/procurement"
            element={<PrivateRoute element={<ProcurementManagerDashboard />} role="Procurement Manager" />}
          />
          
          {/* Admin Route */}
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminDashboard />} role="Admin" />}
          />
          
          {/* Employee Route */}
          <Route
            path="/employee"
            element={<PrivateRoute element={<EmployeeDashboard />} role="Employee" />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;