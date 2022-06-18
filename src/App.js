import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Feed from './components/Feed';

import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
