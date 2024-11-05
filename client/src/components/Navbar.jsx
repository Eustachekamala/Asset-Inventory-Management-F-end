import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

function Navbar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo); 
  const role = useSelector((state) => state.user.role); 

  const handleLogout = (e) => {
    e.preventDefault(); 
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
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
            </li>
            {role === 'Admin' && (
              <li>
                <Link to="/assets" className="text-gray-600 hover:text-blue-500">Assets</Link>
              </li>
            )}
            {role === 'Employee' && (
              <li>
                <Link to="/requests" className="text-gray-600 hover:text-blue-500">My Requests</Link>
              </li>
            )}
            {userInfo ? (
              <li>
                <Link to="/" onClick={handleLogout}>
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