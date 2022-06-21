import React from 'react';
import { Link } from 'react-router-dom';

import ToggleTheme from '../ToggleTheme';

const Navbar = () => {
  return (
    <div className='dark:bg-dm-navbarBg border-b-2 border-solid border-borderColor dark:border-dm-borderColor py-5 px-14 md:px-40 lg:px-80 w-full flex justify-between'>
      <Link to='/'>
        <h1 className='font-semibold text-2xl'>GrowwGram</h1>
      </Link>

      <ToggleTheme />
    </div>
  );
};

export default Navbar;
