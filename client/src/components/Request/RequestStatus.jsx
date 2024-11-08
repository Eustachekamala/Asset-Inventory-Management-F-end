import React, { useEffect, useState } from 'react';

const RequestStatusTracking = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests'); 
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        
        // Ensure the response is in JSON format
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setRequests(data);
        } else {
          throw new Error('Expected JSON response, but got something else.');
        }
      } catch (err) {
        setError(err.message); 
        console.error('Fetch error:', err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchRequests(); 
  }, []); 

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Request Status Tracking</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Request ID</th>
            <th className="py-2 px-4 border">User</th>
            <th className="py-2 px-4 border">Asset</th>
            <th className="py-2 px-4 border">Request Type</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(({ request_id, user_id, asset_id, request_type, status }) => (
            <tr key={request_id}>
              <td className="py-2 px-4 border">{request_id}</td>
              <td className="py-2 px-4 border">{user_id}</td>
              <td className="py-2 px-4 border">{asset_id ?? 'N/A'}</td>
              <td className="py-2 px-4 border">{request_type}</td>
              <td className="py-2 px-4 border">
                <span className={`status ${status?.toLowerCase()} text-white py-1 px-2 rounded`}>
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestStatusTracking;