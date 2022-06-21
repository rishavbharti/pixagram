import React from 'react';

const Loading = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='animate-spin rounded-lg bg-shimmer dark:bg-dm-shimmer h-10 w-10' />
    </div>
  );
};

export default Loading;
