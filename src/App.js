import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Loading from 'components/Loading';

const Feed = lazy(() => import('pages/Feed'));
const UserProfile = lazy(() => import('pages/UserProfile'));

function App() {
  return (
    <div className='text-mainText dark:text-dm-mainText'>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path='/' element={<Feed />} />
          <Route path='/:username' element={<UserProfile />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
