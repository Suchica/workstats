import React from 'react';
import Link from 'next/link';
import HamburgerButton from './HamburgerButton';

interface SidebarProps {
  handleClick: () => void;
}

const Sidebar = ({ handleClick }: SidebarProps) => {
  return (
    <div className='sidebar absolute md:sticky top-0 z-10 bg-gray-800 text-blue-100 w-9/12 md:w-52 h-screen space-y-1 py-7 px-2 flex-none'>
      <div className='flex h-10'>
        <a href='#' className='text-white text-2xl font-bold px-4'>
          WorkStats
        </a>
        <HamburgerButton
          color='text-blue-100'
          handleClick={handleClick}
          margin='m-0.5'
        />
      </div>
      <nav>
        <Link href='/'>
          <a className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white'>
            Home
          </a>
        </Link>
        {/* <Link href="/about">
          <a className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-white">
            About
          </a>
        </Link> */}
        {/* <Link href="/personal-analysis">
          <a className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-white">
            Personal Analysis
          </a>
        </Link> */}
        {/* <Link href="/team-analysis">
          <a className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-white">
            Team Analysis
          </a>
        </Link> */}
        {/* <Link href='/user-list'> */}
        <a role='link' aria-disabled='true' className='block py-2 px-4 rounded'>
          User List
        </a>
        {/* </Link> */}
        {/* <Link href='/team-list'> */}
        <a role='link' aria-disabled='true' className='block py-2 px-4 rounded'>
          Team List
        </a>
        {/* </Link> */}
        <Link href='/user-settings'>
          <a className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white'>
            User Settings
          </a>
        </Link>
        {/* <Link href='/team-settings'> */}
        <a role='link' aria-disabled='true' className='block py-2 px-4 rounded'>
          Team Settings
        </a>
        {/* </Link> */}
        {/* <Link href='/invoice'> */}
        <a role='link' aria-disabled='true' className='block py-2 px-4 rounded'>
          Invoices
        </a>
        {/* </Link> */}
        {/* <Link href='/usage-plan'> */}
        <a role='link' aria-disabled='true' className='block py-2 px-4 rounded'>
          Usage Plan
        </a>
        {/* </Link> */}
        {/* <Link href='/payment-settings'> */}
        <a role='link' aria-disabled='true' className='block py-2 px-4 rounded'>
          Payment Settings
        </a>
        {/* </Link> */}
        <Link href='/terms-of-service'>
          <a className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white'>
            Terms of Service
          </a>
        </Link>
        <Link href='/privacy-policy'>
          <a className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white'>
            Privacy Policy
          </a>
        </Link>
        <a
          className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white'
          href='mailto: info@suchica.com?subject=WorkStats Feedback'
          target='_blank'
          rel='noreferrer noopener' // Must pair with target='_blank'
        >
          Contact Us
        </a>
        {/* <Link href="/company">
          <a className="block py-2 px-4 rounded hover:bg-gray-700 hover:text-white">
            Company
          </a>
        </Link> */}
      </nav>
    </div>
  );
};

export default Sidebar;
