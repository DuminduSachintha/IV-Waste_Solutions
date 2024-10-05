import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEye, FaUser } from 'react-icons/fa';

const AddDailyCollection = () => {
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        nic: '',
        address: '',
        email: '',
        contactNumber: '',
        location: '',
        status: 'pending', // Default status
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const namePattern = /^[A-Z][a-zA-Z\s]*$/;
        const nicPattern = /^(\d{11}[V]|[0-9]{12})$/;
        const addressPattern = /^[a-zA-Z0-9\s,\/]*$/;
        const contactPattern = /^0\d{9}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.category) return 'Category is required';
        if (!namePattern.test(formData.name)) return 'Name must start with a capital letter and contain only letters';
        if (!nicPattern.test(formData.nic)) return 'NIC must be either 11 digits followed by "V" or 12 digits';
        if (!addressPattern.test(formData.address)) return 'Address can contain letters, numbers, spaces, commas, and slashes only';
        if (!contactPattern.test(formData.contactNumber)) return 'Contact number must start with 0 and be exactly 10 digits';
        if (!emailPattern.test(formData.email)) return 'Invalid email format';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8020/dailycollection', formData);
            alert('Daily collection added successfully');
            setFormData({
                category: '',
                name: '',
                nic: '',
                address: '',
                email: '',
                contactNumber: '',
                location: '',
                status: 'pending',
            });
            setError('');
        } catch (err) {
            setError('Error adding daily collection');
        }
    };

    return (
        <div className="flex h-screen bg-[#F6F1E5]">
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
                </ul>
            </div>

            <div className='flex justify-center items-center w-full'>
                <div className="max-w-4xl w-4/5 p-6 bg-[#c5c078] rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-6">Add Daily Collection</h2>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="category" className="block text-sm font-medium">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md"
                                >
                                    <option value="">Select a category</option>
                                    <option value="organic">Organic</option>
                                    <option value="e-waste">E-waste</option>
                                    <option value="plastic">Plastic</option>
                                    <option value="mix">Mix</option>
                                    <option value="metallic/copper/glass">Metallic/Copper/Glass</option>
                                </select>
                            </div>

                            <div className="w-1/2">
                                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="nic" className="block text-sm font-medium">NIC</label>
                                <input
                                    type="text"
                                    name="nic"
                                    value={formData.nic}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md"
                                    placeholder="12345678901V or 123456789012"
                                />
                            </div>

                            <div className="w-1/2">
                                <label htmlFor="address" className="block text-sm font-medium">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md"
                                    placeholder="123 Main St, City"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md"
                                    placeholder="example@example.com"
                                />
                            </div>

                            <div className="w-1/2">
                                <label htmlFor="contactNumber" className="block text-sm font-medium">Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md"
                                    placeholder="0712345678"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="location" className="block text-sm font-medium">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md"
                                placeholder="City, Region"
                            />
                        </div>

                        <button
                            type="submit"
                            className="col-span-1 md:col-span-2 mt-4 w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-3 rounded-lg hover:shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition duration-300"
                        >
                            Add Daily Collection
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDailyCollection;
