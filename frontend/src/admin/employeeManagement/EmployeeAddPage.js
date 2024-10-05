import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './employeeSideBar'; // Import your Sidebar component

const EmployeeAddPage = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [nic, setNic] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [designation, setDesignation] = useState('Manager');
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyEmail, setEmergencyEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // Validation for the name field
    const validateName = (name) => {
        const namePattern = /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)?$/;
        if (!name) {
            setNameError('Name is required');
        } else if (!namePattern.test(name)) {
            setNameError('Name must start with a capital letter and only contain letters.');
        } else {
            setNameError('');
        }
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform name validation before submitting
        validateName(name);

        // Ensure that no errors exist before submission
        if (!nameError) {
            const employeeData = {
                name,
                nic,
                email,
                address,
                contactNumber,
                age,
                gender,
                designation,
                emergencyContactNumber,
                emergencyContactName,
                emergencyEmail,
                password,
            };


            try {
                const response = await axios.post('http://localhost:8020/employee/add', employeeData);
                alert(response.data.message);
                navigate('/employeeview');
            } catch (error) {
                alert(error.response.data.error || 'An error occurred while adding the employee.');
            }
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-[#ffffff] min-h-screen">
                <h2 className="text-5xl font-extrabold mb-8 text-center text-[#1d8b1d] ">Add Employee</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/** Employee Form Fields **/}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => {
                                const inputValue = e.target.value;

                                // Check if the input starts with a capital letter
                                if (inputValue.length === 0 ||/^[A-Z][a-z]*(?:\s[A-Z][a-z]*)?$/.test(inputValue)) {
                                    setName(inputValue);
                                    validateName(inputValue);
                                }
                            }}
                            required
                            className={`mt-1 block w-full border h-10 rounded-md shadow-sm ${nameError ? 'border-red-500' : 'border-gray-300'
                                } focus:ring focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {nameError && (
                            <p className="text-red-500 text-sm mt-1">{nameError}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
                        <input
                            type="text"
                            id="nic"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <input
                            type="text"
                            id="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min="18"
                            max="65"
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                        <select
                            id="designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Manager">Manager</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="Finance Manager">Finance Manager</option>
                            <option value="Waste Sorter">Waste Sorter</option>
                            <option value="Mass and Hazardous Waste Manager">Mass and Hazardous Waste Manager</option>
                            <option value="Driver">Driver</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="emergencyContactNumber" className="block text-sm font-medium text-gray-700">Emergency Contact Number</label>
                        <input
                            type="text"
                            id="emergencyContactNumber"
                            value={emergencyContactNumber}
                            onChange={(e) => setEmergencyContactNumber(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                        <input
                            type="text"
                            id="emergencyContactName"
                            value={emergencyContactName}
                            onChange={(e) => setEmergencyContactName(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="emergencyEmail" className="block text-sm font-medium text-gray-700">Emergency Email</label>
                        <input
                            type="email"
                            id="emergencyEmail"
                            value={emergencyEmail}
                            onChange={(e) => setEmergencyEmail(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="mt-4 w-2/4 bg-[#1d8b1d] text-white font-bold py-2 px-4 rounded-md hover:bg-[#A5D6A7]"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeAddPage;
