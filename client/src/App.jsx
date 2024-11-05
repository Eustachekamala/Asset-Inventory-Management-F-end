import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AssetDashboard from './components/Asset/AssetDashboard';
import RequestHistory from './components/Request/RequestHistory';
import RequestForm from './components/Request/RequestForm';

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App