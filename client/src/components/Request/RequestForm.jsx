import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = () => {
  const [assetType, setAssetType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [urgency, setUrgency] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assetType || !quantity || !urgency || !reason) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('/api/requests', {
        assetType,
        quantity,
        urgency,
        reason,
      });

      alert('Request submitted successfully!');
      setAssetType('');
      setQuantity('');
      setUrgency('');
      setReason('');
      setLoading(false);

    } catch (error) {
      console.error('Request failed:', error);
      setLoading(false);
      setError('Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Submit a Request</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

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
        
        <button 
          type="submit" 
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;