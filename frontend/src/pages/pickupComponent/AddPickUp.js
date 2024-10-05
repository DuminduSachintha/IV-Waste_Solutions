import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEye, FaUser } from 'react-icons/fa';

const AddPickUp = () => {
  const customerId = Cookies.get('userId'); // Fetch the customerId from cookies
  const [formData, setFormData] = useState({
    category: '',
    quantity: 1,
    date: '',
    time: '',
    description: '',
    location: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    category: '',
    quantity: '',
    date: '',
    time: '',
    location: '',
    address: '',
  });
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error message for the field being edited
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setErrors({
      category: '',
      quantity: '',
      date: '',
      time: '',
      location: '',
      address: '',
    });

    // Validate form data
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    let hasError = false;

    if (!formData.category) {
      setErrors((prev) => ({ ...prev, category: 'Please select a category.' }));
      hasError = true;
    }

    if (formData.quantity < 1 || formData.quantity > 10) {
      setErrors((prev) => ({ ...prev, quantity: 'Quantity must be between 1 and 10.' }));
      hasError = true;
    }

    if (new Date(formData.date) < tomorrow || new Date(formData.date) > maxDate) {
      setErrors((prev) => ({ ...prev, date: 'Date must be between tomorrow and 60 days forward.' }));
      hasError = true;
    }

    const timePattern = /^(0[9]|1[0-8]):[0-5][0-9]$/; // 09:00 AM - 06:30 PM
    if (!timePattern.test(formData.time)) {
      setErrors((prev) => ({ ...prev, time: 'Time must be between 09:00 AM and 06:30 PM.' }));
      hasError = true;
    }

    const addressPattern = /^[a-zA-Z0-9\s,\/]*$/; // Only allows letters, numbers, spaces, commas, and slashes
    if (!addressPattern.test(formData.address)) {
      setErrors((prev) => ({ ...prev, address: 'Address contains invalid characters. Only letters, numbers, spaces, commas, and slashes are allowed.' }));
      hasError = true;
    }

    if (hasError) return; // Stop if there are validation errors

    try {
      // Include customerId in the formData
      const completeFormData = {
        ...formData,
        customerId, // Attach the customerId from cookies
      };

      await axios.post('http://localhost:8020/pickup/pickups', completeFormData);
      setSuccess('Pick-up request added successfully!');
      setFormData({
        category: '',
        quantity: 1,
        date: '',
        time: '',
        description: '',
        location: '',
        address: '',
      }); // Clear the form
      navigate('/viewpickup'); // Adjust the path as needed
    } catch (err) {
      setErrors({ ...errors, general: 'Failed to add pick-up request. Please try again.' });
      setSuccess('');
    }
  };

  return (
    <div className="flex bg-[#F6F1E5]  items-center h-screen">
      <div className="bg-[#E2E8CE] w-1/5 min-h-screen p-4 shadow-lg">
      <ul className="space-y-4">
        <li className="transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/profile" className="flex items-center text-gray-800 hover:bg-gray-200 p-2 rounded-lg">
            <FaUser className="mr-2 text-[#41A64F]" />
            <span>My Profile</span>
          </Link>
        </li>
        <li className="transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/addpickup" className="flex items-center text-gray-800 hover:bg-gray-200 p-2 rounded-lg">
            <FaPlusCircle className="mr-2 text-[#41A64F]" />
            <span>Add Pick-Up Request</span>
          </Link>
        </li>
        <li className="transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/viewpickup" className="flex items-center text-gray-800 hover:bg-gray-200 p-2 rounded-lg">
            <FaEye className="mr-2 text-[#41A64F]" />
            <span>View Pick-Up Requests</span>
          </Link>
        </li>
        <li className="transition duration-300 ease-in-out transform hover:scale-105">
                        <Link to="/adddailycollection" className="flex items-center text-gray-800 hover:bg-gray-200 p-2 rounded-lg">
                            <FaPlusCircle className="mr-2 text-[#41A64F]" />
                            <span>Add Daily Collection</span>
                        </Link>
                    </li>
        {/* Add more navigation links as needed */}
      </ul>
    </div>
    <div className='flex justify-center items-center w-full'>
      <div className="max-w-4xl w-4/5 p-6 bg-[#c5c078] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Add New Pick-up Request</h2>
        
        {errors.general && <div className="mb-4 text-red-600">{errors.general}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Category:</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required 
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value="">Select category</option>
              <option value="organic">Organic</option>
              <option value="e-waste">E-Waste</option>
              <option value="plastic">Plastic</option>
              <option value="mix">Mix</option>
              <option value="metallic/copper/glass">Metallic/Copper/Glass</option>
            </select>
            {errors.category && <div className="text-red-600 text-sm">{errors.category}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Quantity (1-10):</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              min="1"
              max="10"
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.quantity ? 'border-red-500' : ''}`}
            />
            {errors.quantity && <div className="text-red-600 text-sm">{errors.quantity}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.date ? 'border-red-500' : ''}`}
            />
            {errors.date && <div className="text-red-600 text-sm">{errors.date}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.time ? 'border-red-500' : ''}`}
            />
            {errors.time && <div className="text-red-600 text-sm">{errors.time}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Description (optional):</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <div className="text-red-600 text-sm">{errors.location}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              pattern="^[a-zA-Z0-9\s,\/]*$"  // Matches the back-end validation
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <div className="text-red-600 text-sm">{errors.address}</div>}
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 mt-4 w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-3 rounded-lg hover:shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default AddPickUp;
