import React from 'react';
import Logo from "/assets/logo.png";
import Lg from "/assets/lg2.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-6 flex justify-between">
      <div className='flex items-center space-x-2'>
        <img src={Logo} className="h-14" />
        <img src={Lg} className="h-6" />
      </div>
      <ul className="flex items-center">
        <li><a href="#" className="text-white font-semibold  border border-indigo-900 px-6 py-3 rounded hover:bg-gray-700">A propos</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
