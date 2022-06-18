import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/Navbar';

import { getAllPostsInFeed, getRandomPhotos } from './app/slice/feedSlice';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const posts = useSelector(getAllPostsInFeed);
  console.log(posts);

  useEffect(() => {
    dispatch(getRandomPhotos());
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
