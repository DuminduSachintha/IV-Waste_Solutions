import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate to programmatically navigate

const UpdateEmployee = () => {
  const { id } = useParams(); // Fetch the employeeId from the URL
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Extend the state to include all employee fields
  const [employeeData, setEmployeeData] = useState({
    name: "",
    nic: "",
    email: "",
    contactNumber: "",
    address: "",
    age: "",
    gender: "",
    designation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyEmail: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8020/employee/get/${id}`);
        setEmployeeData(response.data); // Set employee data from the API response
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8020/employee/${id}`, employeeData);
      alert("Employee updated successfully");
      navigate("/employeeview"); // Redirect to the employee list page after successful update
    } catch (error) {
      console.error("Failed to update employee", error);
      alert("An error occurred while updating the employee");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Employee</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* NIC */}
        <div className="mb-4">
          <label>NIC</label>
          <input
            type="text"
            name="nic"
            value={employeeData.nic}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={employeeData.contactNumber}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={employeeData.address}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={employeeData.age}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label>Gender</label>
          <select
            name="gender"
            value={employeeData.gender}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label>Designation</label>
          <select
            name="designation"
            value={employeeData.designation}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Finance Manager">Finance Manager</option>
            <option value="Waste Sorter">Waste Sorter</option>
            <option value="Mass and Hazardous Waste Manager">Mass and Hazardous Waste Manager</option>
            <option value="Driver">Driver</option>
          </select>
        </div>

        {/* Emergency Contact Name */}
        <div className="mb-4">
          <label>Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            value={employeeData.emergencyContactName}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Emergency Contact Number */}
        <div className="mb-4">
          <label>Emergency Contact Number</label>
          <input
            type="text"
            name="emergencyContactNumber"
            value={employeeData.emergencyContactNumber}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Emergency Email */}
        <div className="mb-4">
          <label>Emergency Email</label>
          <input
            type="email"
            name="emergencyEmail"
            value={employeeData.emergencyEmail}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
