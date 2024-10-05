import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './employeeSideBar'; // Import your Sidebar component

const UpdateTask = () => {
    const { id } = useParams(); // Get the task ID from the URL
    const navigate = useNavigate(); // Initialize useNavigate
    const [task, setTask] = useState({
        title: '',
        description: '',
        assignedEmployeeId: '',
        status: '',
        priority: '',
        dueDate: '',
    });
    const [employees, setEmployees] = useState([]); // State to store employees
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:8020/task/${id}`);
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
                setError('Failed to fetch task details.');
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8020/employee'); // Adjust this URL as needed
                setEmployees(response.data); // Store employees in state
            } catch (error) {
                console.error('Error fetching employees:', error);
                setError('Failed to fetch employees.');
            }
        };

        fetchTask();
        fetchEmployees(); // Fetch employees when the component mounts
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8020/task/${id}`, task);
            navigate('/viewtask'); // Redirect to the task list after update
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen bg-[#ffffff]">
            <Sidebar /> {/* Add Sidebar component here */}
            <div className="flex-1 p-8">
                <h2 className="text-5xl font-extrabold mb-8 text-center text-[#1d8b1d] ">Update Task</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Side */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border h-20 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="assignedEmployeeId">
                            Assigned Employee
                        </label>
                        <select
                            name="assignedEmployeeId"
                            value={task.assignedEmployeeId}
                            onChange={handleChange}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>Select an Employee</option>
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
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    
                    {/* Right Side */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="priority">
                            Priority
                        </label>
                        <select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>Select Priority</option>
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
                            name="dueDate"
                            value={task.dueDate ? task.dueDate.slice(0, 10) : ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border h-10 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="mt-4 w-2/4 bg-[#1d8b1d] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1d8b1d]"
                        >
                            Update Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;
