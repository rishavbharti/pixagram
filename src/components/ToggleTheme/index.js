import React, { useState, useEffect } from 'react';

import DarkModeIcon from 'assets/icons/dark_mode.svg';
import LightModeIcon from 'assets/icons/light_mode.svg';

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [darkMode]);

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
    <button onClick={handleClick}>
      <img
        src={darkMode ? LightModeIcon : DarkModeIcon}
        alt={`Change theme to ${darkMode ? 'light' : 'dark'} mode`}
        className='w-10 h-10 p-2 border rounded-md'
      />
    </button>
  );
};

export default ToggleTheme;
