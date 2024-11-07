import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/requests');
        setRequests(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
        setRequests([]);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Request History</h2>
      <ul className="bg-white shadow-md rounded-lg">
        {requests.length > 0 ? (
          requests.map((request) => (
            <li
              key={request.id}
              className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100"
            >
              <span className="text-lg">
                {request.assetType} - {request.status}
              </span>
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                onClick={() => setSelectedRequest(request)}
              >
                View Details
              </button>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No requests available.</li>
        )}
      </ul>
    </div>
  );
};

export default RequestHistory;