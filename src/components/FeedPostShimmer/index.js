import React from 'react';

const FeedPostShimmer = () => {
  const renderHeader = () => {
    return (
      <div className='flex gap-5 items-center p-4 border-b border-solid'>
        <div className='rounded-full bg-shimmer dark:bg-dm-shimmer h-10 w-10'></div>

        <div className='flex-1 space-y-4 py-1'>
          <div className='h-2 bg-shimmer dark:bg-dm-shimmer rounded w-36'></div>
          <div className='h-2 bg-shimmer dark:bg-dm-shimmer rounded w-14'></div>
        </div>
      </div>
    );
  };

  const renderBody = () => {
    return <div className='bg-shimmer dark:bg-dm-shimmer h-96'></div>;
  };

  const renderFooter = () => {
    return (
      <div className='h-20 p-4 flex flex-col gap-4'>
        <div className='h-2 bg-shimmer dark:bg-dm-shimmer rounded'></div>
        <div className='h-2 bg-shimmer dark:bg-dm-shimmer rounded w-36'></div>
      </div>
    );
  };

  return (
    <div className='w-full bg-cardBg dark:bg-dm-cardBg rounded-xl animate-pulse'>
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
    </div>
  );
};

export default FeedPostShimmer;
