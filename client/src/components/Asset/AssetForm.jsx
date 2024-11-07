// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/authSlice";

function AssetForm() {
  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("Available"); // Default status
  const [allocatedTo, setAllocatedTo] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]); // For categories
  const [users, setUsers] = useState([]); // For allocated to users

  // Fetch categories and users from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        console.log("Fetched categories:", response.data); // Log the response
        setCategories(response.data); // Adjust if necessary
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data); // Ensure this is an array
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchCategories();
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/assets", {
        name: assetName,
        description: description,
        category_id: categoryId,
        status: status,
        allocated_to: allocatedTo,
      });
      dispatch(login({ userInfo: response.data.userInfo, role: response.data.role }));
      console.log("Asset created successfully");
      // Reset form fields
      setAssetName("");
      setDescription("");
      setCategoryId("");
      setStatus("Available");
      setAllocatedTo("");
    } catch (error) {
      setError("Invalid asset details");
      console.error("Failed to create asset:", error);
    }
  };

  return (
    <div className="flex flex-col m-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
        <h2 className="mb-6 text-lg font-bold text-center">Create Asset</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            {Array.isArray(categories) && categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Available">Available</option>
            <option value="Allocated">Allocated</option>
            <option value="Under_Repair">Under Repair</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allocatedTo">
            Allocate to User
          </label>
          <select
            id="allocatedTo"
            value={allocatedTo}
            onChange={(e) => setAllocatedTo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select User (optional)</option>
            {Array.isArray(users) && users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssetForm;