// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssetDashboard = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('/api/assets');
        // console.log(response.data); // Check the API response structure
        setAssets(Array.isArray(response.data) ? response.data : []); // Ensure assets is an array
      } catch (error) {
        console.error('Failed to fetch assets:', error);
        setAssets([]); // Set to empty array on error
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Asset Management</h2>
      <ul className="bg-white shadow-md rounded-lg">
        {assets.length > 0 ? (
          assets.map((asset) => (
            <li key={asset.id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
              <span className="text-lg">{asset.name}</span>
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                Manage
              </button>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No assets available.</li>
        )}
      </ul>
    </div>
  );
};

export default AssetDashboard;