import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from './customerSideBar'; // Import Sidebar

const CustomerViewPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8020/customer/all'); 
                setCustomers(response.data);
            } catch (error) {
                setError('Failed to fetch customers');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`http://localhost:8020/customer/profile/${id}`);
                setCustomers(customers.filter(customer => customer._id !== id)); 
                alert('Customer deleted successfully');
            } catch (error) {
                alert('Failed to delete customer');
            }
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value); 
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Customer Report', 14, 16);
        doc.autoTable({
            head: [['Customer ID', 'Name', 'Email', 'Contact Number', 'Address']],
            body: customers.map(customer => [
                customer.customerId,
                customer.name,
                customer.email,
                customer.contactNumber,
                customer.address
            ]),
        });
        doc.save('customer_report.pdf'); 
    };

    if (loading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar /> {/* Render sidebar */}

            {/* Main content */}
            <div className="flex-1 p-8 bg-[#F6F1E5] min-h-screen">
                <h2 className="text-4xl font-bold text-center text-[#cfa226] mb-8 shadow-md">Customer List</h2>

                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border-2 border-[#9e972f] p-3 rounded w-2/4 mr-4 shadow-md focus:outline-none focus:ring-2 focus:ring-[#9e972f] transition duration-200"
                    />
                    <button
                        className="bg-gradient-to-r from-[#FFC107] to-[#FFA000] text-white py-3 rounded-lg hover:shadow-lg transition duration-300 p-6"
                        onClick={generateReport}
                    >
                        Generate Report
                    </button>
                </div>

                <table className="min-w-full bg-white border border-[#9e972f] rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr className="bg-[#E2E8CE] text-left">
                            <th className="border border-[#9e972f] p-4 font-semibold">Customer ID</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Name</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Email</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Contact Number</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Address</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer._id} className="odd:bg-[#f9f9f7] even:bg-[#f1f0ea] transition duration-200 hover:bg-[#E2E8CE]">
                                <td className="border border-[#9e972f] p-4">{customer.customerId}</td>
                                <td className="border border-[#9e972f] p-4">{customer.name}</td>
                                <td className="border border-[#9e972f] p-4">{customer.email}</td>
                                <td className="border border-[#9e972f] p-4">{customer.contactNumber}</td>
                                <td className="border border-[#9e972f] p-4">{customer.address}</td>
                                <td className="border border-[#9e972f] p-4 flex gap-2">
                                    <button
                                        onClick={() => navigate(`/updatecustomer/${customer._id}`)}
                                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer._id)}
                                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerViewPage;
