import React from 'react';
import Logo from "/assets/logo.png";
import Lg from "/assets/lg2.png";
import Help from "/assets/help.gif";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-6 flex justify-between">
      <div className='flex items-center space-x-2'>
        <img src={Logo} className="h-14" />
        <img src={Lg} className="h-6" />
      </div>
      <button className="flex items-center text-white font-semibold  border border-indigo-900 px-6  rounded hover:bg-gray-700">
        <img src={Help} className="h-16" />
      </button>
    </nav>
  );
};

export default Navbar;
