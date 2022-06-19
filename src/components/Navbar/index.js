import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='sticky border-b-2 border-solid border-gray-200 py-5 px-14 md:px-40 lg:px-80 w-full'>
      <Link to='/'>
        <h1 className='font-semibold text-2xl'>GrowwGram</h1>
      </Link>
    </div>
  );
};

export default Navbar;
