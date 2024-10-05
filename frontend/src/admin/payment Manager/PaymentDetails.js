import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF AutoTable plugin
import Sidebar from './paymentSideBar'; // Assuming the same sidebar used in EmployeeView

const PaymentDetails = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');

    // Fetch all payments
    const fetchPayments = async () => {
        try {
            const response = await fetch('http://localhost:8020/payment'); // Your API endpoint
            if (response.ok) {
                const data = await response.json();
                setPayments(data);
                setFilteredPayments(data); // Set the initial filtered payments to all payments
            } else {
                setMessage('Failed to fetch payments.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // Handle search
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = payments.filter(payment =>
            payment.itemName.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredPayments(filtered);
    };

    // Handle payment status update
    const updatePaymentStatus = async (paymentId, status) => {
        try {
            const response = await fetch(`http://localhost:8020/payment/${paymentId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                setMessage(`Payment ${status} successfully!`);
                fetchPayments(); // Refresh the payments list
            } else {
                setMessage('Failed to update payment status.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    // Handle payment deletion
    const deletePayment = async (paymentId) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                const response = await fetch(`http://localhost:8020/payment/${paymentId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setMessage('Payment deleted successfully!');
                    fetchPayments(); // Refresh the payments list
                } else {
                    setMessage('Failed to delete payment.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    // Generate PDF report
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Payment Report', 14, 22);
        doc.setFontSize(12);
        
        const tableData = filteredPayments.map(payment => [
            payment.itemId,
            payment.itemName,
            payment.itemPrice.toFixed(2),
            payment.customerId,
            payment.status,
        ]);

        doc.autoTable({
            head: [['Item ID', 'Item Name', 'Price', 'Customer Id', 'Status']],
            body: tableData,
            startY: 30,
        });

        doc.save('payment_report.pdf');
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-[#F6F1E5] min-h-screen">
                <h2 className="text-4xl font-extrabold text-center text-[#cfa226] mb-6">Payment Details</h2>
                {message && <p className="text-center text-red-500 mb-4">{message}</p>}

                {/* Search Bar */}
                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by item name..."
                        className="border-2 border-[#9e972f] p-3 rounded w-2/4 mr-4 shadow-md focus:outline-none focus:ring-2 focus:ring-[#9e972f] transition duration-200"
                    />

                    <button
                        onClick={generatePDF}
                        className="bg-gradient-to-r from-[#FFC107] to-[#FFA000] text-white py-3 rounded-lg hover:shadow-lg transition duration-300 p-6"
                    >
                        Generate Report
                    </button>
                </div>

                {/* Payments Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-[#9e972f] rounded-lg shadow-lg overflow-hidden">
                        <thead>
                            <tr className="bg-[#E2E8CE] text-left">
                                <th className="border border-[#9e972f] p-4 font-semibold">Item ID</th>
                                <th className="border border-[#9e972f] p-4 font-semibold">Item Name</th>
                                <th className="border border-[#9e972f] p-4 font-semibold">Price</th>
                                <th className="border border-[#9e972f] p-4 font-semibold">Customer Id</th>
                                <th className="border border-[#9e972f] p-4 font-semibold">Status</th>
                                <th className="border border-[#9e972f] p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((payment) => (
                                <tr key={payment._id} className="odd:bg-[#f9f9f7] even:bg-[#f1f0ea] transition duration-200 hover:bg-[#E2E8CE]">
                                    <td className="border border-[#9e972f] p-4 text-center">{payment.itemId}</td>
                                    <td className="border border-[#9e972f] p-4 text-center">{payment.itemName}</td>
                                    <td className="border border-[#9e972f] p-4 text-center">${payment.itemPrice.toFixed(2)}</td>
                                    <td className="border border-[#9e972f] p-4 text-center">{payment.customerId}</td>
                                    <td className="border border-[#9e972f] p-4 text-center">{payment.status}</td>
                                    <td className="border border-[#9e972f] p-4 text-center">
                                        {payment.status === 'accept' || payment.status === 'reject' ? (
                                            <span className="text-green-500"></span>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => updatePaymentStatus(payment._id, 'accept')}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition-colors shadow-sm"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => updatePaymentStatus(payment._id, 'reject')}
                                                    className="bg-red-600 text-white px-3 py-1 rounded mr-2 hover:bg-red-700 transition-colors shadow-sm"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => deletePayment(payment._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors shadow-sm"
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
        </div>
    );
};

export default PaymentDetails;
