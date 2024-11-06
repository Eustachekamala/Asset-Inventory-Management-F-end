// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/requests");
        // console.log(response.data); // Check the API response structure
        setRequests(Array.isArray(response.data) ? response.data : []); // Ensure requests is an array
      } catch (error) {
        console.error("Failed to fetch requests:", error);
        setRequests([]); // Set to empty array on error
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg">
      <ul className="bg-white shadow-md rounded-lg">
        {requests.length > 0 ? (
          requests.map((request) => (
            <li key={request.id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
              <span className="text-lg">{request.asset_name}</span>
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                Details
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

export default RequestList;