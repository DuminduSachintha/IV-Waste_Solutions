import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './employeeSideBar'; // Import your Sidebar component

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedEmployeeId, setAssignedEmployeeId] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState('');
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8020/employee'); // Adjust the URL as needed
                setEmployees(response.data);
            } catch (error) {
                setError('Error fetching employees');
            }
        };

        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = {
                title,
                description,
                assignedEmployeeId,
                status,
                priority,
                dueDate,
            };
            await axios.post('http://localhost:8020/task', newTask); // Adjust the URL as needed
            alert('Task added successfully!');
            // Reset form fields
            setTitle('');
            setDescription('');
            setAssignedEmployeeId('');
            setStatus('pending');
            setPriority('low');
            setDueDate('');
        } catch (error) {
            setError('Error adding task');
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-[#ffffff] min-h-screen">
                <h2 className="text-5xl font-extrabold mb-8 text-center text-[#1d8b1d] ">Add Task</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Side */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="assignedEmployeeId">
                            Assigned Employee
                        </label>
                        <select
                            id="assignedEmployeeId"
                            value={assignedEmployeeId}
                            onChange={(e) => setAssignedEmployeeId(e.target.value)}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select an employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="status">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    
                    {/* Right Side */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border h-20 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="priority">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="dueDate">
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="mt-4 w-2/4 bg-[#1d8b1d] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1d8b1d]"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
