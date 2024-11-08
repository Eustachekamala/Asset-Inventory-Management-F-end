import React, { useEffect, useState } from 'react';

const RequestStatusTracking = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/requests');
        
        // Check the response status
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        
        // Log the response content type to ensure it's JSON
        const contentType = response.headers.get("content-type");
        console.log('Response content type:', contentType);  // Log the content type
        
        // Check if the response is JSON
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setRequests(data);
        } else {
          // Log the response body to check what's returned
          const text = await response.text();
          console.error('Unexpected response:', text);
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
            <th className="py-2 px-4 border">User ID</th>
            <th className="py-2 px-4 border">Asset ID</th>
            <th className="py-2 px-4 border">Request Type</th>
            <th className="py-2 px-4 border">Reason</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Urgency</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Created At</th>
            <th className="py-2 px-4 border">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(({ id, user_id, asset_id, request_type, reason, quantity, urgency, status, created_at, updated_at }) => (
            <tr key={id}>
              <td className="py-2 px-4 border">{id}</td>
              <td className="py-2 px-4 border">{user_id}</td>
              <td className="py-2 px-4 border">{asset_id ?? 'N/A'}</td>
              <td className="py-2 px-4 border">{request_type}</td>
              <td className="py-2 px-4 border">{reason ?? 'N/A'}</td>
              <td className="py-2 px-4 border">{quantity}</td>
              <td className="py-2 px-4 border">{urgency}</td>
              <td className="py-2 px-4 border">
                <span className={`status ${status?.toLowerCase()} text-black py-1 px-2 rounded`}>
                  {status}
                </span>
              </td>
              <td className="py-2 px-4 border">{new Date(created_at).toLocaleString()}</td>
              <td className="py-2 px-4 border">{new Date(updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestStatusTracking;