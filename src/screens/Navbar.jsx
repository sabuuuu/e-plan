import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-6 flex justify-between">
      <h1 className="text-2xl font-bold text-white">Logo</h1>
      <ul className="flex space-x-4">
        <li><a href="#" className="text-white px-4 py-2 rounded hover:bg-gray-700">Home</a></li>
        <li><a href="#" className="text-white px-4 py-2 rounded hover:bg-gray-700">About</a></li>
        <li><a href="#" className="text-white px-4 py-2 rounded hover:bg-gray-700">Services</a></li>
        <li><a href="#" className="text-white px-4 py-2 rounded hover:bg-gray-700">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
