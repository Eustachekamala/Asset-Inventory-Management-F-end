import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="AIM.jpeg" alt="Asset Inventory Management" className="w-16 h-16 mr-4 rounded-2xl" />
          <h1 className="text-2xl font-bold">Asset Inventory Management</h1>
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link></li>
            <li><Link to="/assets" className="text-gray-600 hover:text-blue-500">Assets</Link></li>
            <li><Link to="/reports" className="text-gray-600 hover:text-blue-500">Reports</Link></li>
            <li><Link to="/users" className="text-gray-600 hover:text-blue-500">Users</Link></li>
            <li><Link to="/support" className="text-gray-600 hover:text-blue-500">Support</Link></li>
            {user.userInfo ? (
              <li>
                <Link to="/logout" onClick={handleLogout}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;