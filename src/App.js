import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Feed from './components/Feed';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className='text-mainText dark:text-dm-mainText'>
      <Navbar />
      <Routes>
        <Route path='/:username' element={<UserProfile />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
