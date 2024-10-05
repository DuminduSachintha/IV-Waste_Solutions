import React, { useState } from 'react';
import axios from 'axios';

const CustomerRegister = () => {
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    email: '',
    contactNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    let errors = {};

    // Name Validation: No special characters
    if (!/^[a-zA-Z\s]+$/.test(customer.name)) {
      errors.name = 'Name cannot contain special characters or numbers';
    }

    // Email Validation: Contains '@' and valid format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      errors.email = 'Email is not valid';
    }

    // Contact Number Validation: Starts with 0 and 10 digits
    if (!/^0[0-9]{9}$/.test(customer.contactNumber)) {
      errors.contactNumber = 'Contact number must start with 0 and contain 10 digits';
    }

    // Password Validation: Minimum 6 characters
    if (customer.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post('http://localhost:8020/customer/register', customer)
        .then((response) => {
          setSuccessMessage('Customer registered successfully!');
          setCustomer({
            name: '',
            address: '',
            email: '',
            contactNumber: '',
            password: '',
          });
          setErrors({});
        })
        .catch((error) => {
          console.error('There was an error registering the customer!', error);
        });
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F6F1E5]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">Customer Registration</h2>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-md shadow-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              value={customer.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              value={customer.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              value={customer.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              value={customer.contactNumber}
              onChange={handleChange}
              required
            />
            {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber}</span>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              value={customer.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-3 rounded-lg hover:shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegister;
