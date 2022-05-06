import React from 'react';
import LogOut from './Logout';
import Sidebar from './Sidebar';

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <div className='flex bg-slate-50 w-full'>
      <Sidebar />
      <div>
        <LogOut />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
