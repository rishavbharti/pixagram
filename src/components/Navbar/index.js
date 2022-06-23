import React from 'react';
import { Link } from 'react-router-dom';

import ToggleTheme from 'components/ToggleTheme';

import Logo from 'assets/logo.png';

const Navbar = () => {
  return (
    <div className='fixed z-10 bg-white dark:bg-dm-navbarBg border-b-2 border-solid border-borderColor dark:border-dm-borderColor py-3 px-14 md:px-40 lg:px-80 w-full flex justify-between'>
      <Link to='/' className='flex items-center gap-4'>
        <img src={Logo} alt='GrowwGram' className='h-10' />
        <h1 className='font-semibold text-2xl'>GrowwGram</h1>
      </Link>

      <ToggleTheme />
    </div>
  );
};

export default Navbar;
