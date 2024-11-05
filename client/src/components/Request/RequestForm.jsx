// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = () => {
  const [assetType, setAssetType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [urgency, setUrgency] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/requests', { assetType, quantity, urgency, reason });
      alert('Request submitted successfully!');
      setAssetType('');
      setQuantity('');
      setUrgency('');
      setReason('');
    } catch (error) {
      console.error('Request failed:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Submit a Request</h2>
      
      <input 
        type="text" 
        placeholder="Asset Type" 
        value={assetType} 
        onChange={(e) => setAssetType(e.target.value)} 
        required 
        className="border rounded-lg p-2 mb-4 w-full"
      />
      
      <input 
        type="number" 
        placeholder="Quantity" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        required 
        className="border rounded-lg p-2 mb-4 w-full"
      />
      
      <select 
        value={urgency} 
        onChange={(e) => setUrgency(e.target.value)} 
        required 
        className="border rounded-lg p-2 mb-4 w-full"
      >
        <option value="">Select Urgency</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      
      <textarea 
        placeholder="Reason" 
        value={reason} 
        onChange={(e) => setReason(e.target.value)} 
        required 
        className="border rounded-lg p-2 mb-4 w-full"
      />
      
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit Request
      </button>
    </form>
  );
};

export default RequestForm;