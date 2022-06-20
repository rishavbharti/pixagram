import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DarkModeIcon from '.././../assets/icons/dark_mode.svg';
import LightModeIcon from '.././../assets/icons/light_mode.svg';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.theme === 'dark');

  const handleClick = () => {
    if (darkMode) {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className='dark:bg-dm-navbarBg border-b-2 border-solid border-borderColor dark:border-dm-borderColor py-5 px-14 md:px-40 lg:px-80 w-full flex justify-between'>
      <Link to='/'>
        <h1 className='font-semibold text-2xl'>GrowwGram</h1>
      </Link>

      <button onClick={handleClick}>
        <img
          src={darkMode ? LightModeIcon : DarkModeIcon}
          alt={`Change theme to ${darkMode ? 'light' : 'dark'} mode`}
          className='w-10 h-10 p-2 border rounded-md'
        />
      </button>
    </div>
  );
};

export default Navbar;
