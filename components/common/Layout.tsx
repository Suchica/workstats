import React, { useState } from 'react';
import LogOut from './Logout';
import Sidebar from './Sidebar';
import HamburgerButton from './HamburgerButton';

// @ts-ignore
const Layout = ({ children }) => {
  // Hamburger menu state
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className='md:flex bg-slate-50 w-full'>
      {isOpen ? (
        <Sidebar handleClick={toggleMenu} />
      ) : (
        <HamburgerButton
          color='text-gray-800'
          handleClick={toggleMenu}
          margin='m-3'
        />
      )}
      <div>
        <LogOut />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
