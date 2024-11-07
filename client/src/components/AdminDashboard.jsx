// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import AssetForm from './Asset/AssetForm';

function AdminDashboard() {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch assets, categories, and users from API
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('/api/assets');
        setAssets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching assets', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchAssets();
    fetchCategories();
    fetchUsers();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(login({ userInfo: null, role: null }));
    navigate('/');
  };

  const deleteAsset = async (id) => {
    try {
      await axios.delete(`/api/assets/${id}`);
      setAssets(assets.filter(asset => asset.id !== id));
    } catch (error) {
      console.error('Error deleting asset', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Assets</h3>
          <AssetForm />
          <ul className="bg-white shadow-md rounded-lg mt-4">
            {assets.length > 0 ? (
              assets.map((asset) => (
                <li key={asset.id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
                  <span className="text-lg">{asset.name}</span>
                  <div>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2">
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => deleteAsset(asset.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500">No assets available.</li>
            )}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Categories</h3>
          <ul className="bg-white shadow-md rounded-lg">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
                  <span className="text-lg">{category.name}</span>
                  <div>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2">
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => deleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500">No categories available.</li>
            )}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Users</h3>
          <ul className="bg-white shadow-md rounded-lg">
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
                  <span className="text-lg">{user.username}</span>
                  <div>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2">
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500">No users available.</li>
            )}
          </ul>
        </div>
      </div>
      <button 
        onClick={handleLogout} 
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mt-4"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;