// Profile.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEye, FaUser } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const id = Cookies.get('userId');
        const response = await axios.get(`http://localhost:8020/customer/profile/${id}`);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="flex">
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
      <div className="bg-[#F6F1E5] min-h-screen flex flex-col items-center py-12 w-full">
        <h1 className="text-4xl font-bold text-[#41A64F] mb-8">My Profile</h1>

        {user ? (
          <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={user.name}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="contactNumber">
                Phone
              </label>
              <input
                id="contactNumber"
                type="tel"
                value={user.contactNumber}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={user.address}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Add more fields as necessary */}
          </form>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
