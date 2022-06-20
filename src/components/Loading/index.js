import React from 'react';

const Loading = () => {
  return (
    <div className='h-screen flex items-center'>
      <div className='animate-spin rounded-lg bg-shimmer dark:bg-dm-shimmer h-10 w-10 mx-auto'></div>
    </div>
  );
};

export default Loading;
