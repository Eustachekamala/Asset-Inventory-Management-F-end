import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/requests");
        setRequests(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
        setRequests([]);
      }
    };

    fetchRequests();
  }, []);

  const updateRequestStatus = async (requestId, status) => {
    try {
      await axios.patch(`/api/requests/${requestId}`, { status });
      const updatedRequests = requests.map((request) => 
        request.id === requestId ? { ...request, status } : request
      );
      setRequests(updatedRequests);
    } catch (error) {
      console.error('Failed to update request status:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <ul className="bg-white shadow-md rounded-lg">
        {requests.length > 0 ? (
          requests.map((request) => (
            <li key={request.id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
              <span className="text-lg">{request.assetType} - {request.status}</span>
              <div>
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                  onClick={() => updateRequestStatus(request.id, 'Approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                  onClick={() => updateRequestStatus(request.id, 'Rejected')}
                >
                  Reject
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No requests available.</li>
        )}
      </ul>
    </div>
  );
};

export default RequestList;