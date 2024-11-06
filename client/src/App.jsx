import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/assets" element={<AssetDashboard />} />
          <Route path="/requests" element={<RequestHistory />} />
          <Route path="/requests/new" element={<RequestForm />} />
          <Route path="/procurement" element={<ProcurementManagerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App