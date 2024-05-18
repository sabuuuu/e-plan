import React from 'react';
import Logo from "/assets/logo copy.png";
import Help from "/assets/help.gif";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-6 flex justify-between">
      <Link to='/' className='flex items-center space-x-2'>
        <img src={Logo} className="h-14" />
      </Link>
      <Link to='/about' className="flex items-center text-white font-semibold  border border-indigo-900 px-6  rounded hover:bg-gray-700">
        <img src={Help} className="h-16" />
      </Link>
    </nav>
  );
};

export default Navbar;
