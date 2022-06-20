import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Loading from './components/Loading';

const Feed = lazy(() => import('./components/Feed'));
const UserProfile = lazy(() => import('./components/UserProfile'));

function App() {
  return (
    <div className='text-mainText dark:text-dm-mainText'>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/:username' element={<UserProfile />} />
          <Route path='/' element={<Feed />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
