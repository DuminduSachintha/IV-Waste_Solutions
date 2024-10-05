import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import Sidebar from './employeeSideBar'; // Import your Sidebar component

const UpdateSalary = () => {
    const { id } = useParams(); // Get the salary ID from the URL
    const [salary, setSalary] = useState(null);
    const [basicSalary, setBasicSalary] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await axios.get(`http://localhost:8020/salary/${id}`); // Adjust the URL as needed
                setSalary(response.data);
                setBasicSalary(response.data.basicSalary); // Set initial basic salary
            } catch (error) {
                setError('Error fetching salary details');
            }
        };

        fetchSalary();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8020/salary/${id}`, { basicSalary }); // Adjust the URL as needed
            navigate('/showsalary'); // Redirect to the Show Salary page after updating
        } catch (error) {
            setError('Error updating salary');
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-[#F6F1E5] min-h-screen">
                <h2 className="text-5xl font-extrabold mb-8 text-center text-[#1d8b1d] ">Update Salary</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {salary && (
                    <form onSubmit={handleUpdate} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Employee Name: {salary.employeeId?.name} {/* Display employee name */}
                            </label>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="basicSalary">
                                Basic Salary:
                            </label>
                            <input
                                type="number"
                                id="basicSalary"
                                value={basicSalary}
                                onChange={(e) => setBasicSalary(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                min="0" // Ensure the basic salary cannot be negative
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1d8b1d] hover:bg-[#1d8b1d] text-white font-bold py-2 px-4 rounded"
                        >
                            Update Salary
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateSalary;
