import React from 'react';

const FeedPostCard = (props) => {
  const { post } = props;

  const renderHeader = (user, location) => {
    return (
      <div className='flex gap-5 items-center px-4 py-3 border-b border-solid'>
        <img
          src={user.profile_image.small}
          alt={user.name}
          className='rounded-full h-10 w-10'
        />

        <div className='flex-1 py-1'>
          <p className=''>{user.name}</p>
          {location.name && (
            <p className='text-sm text-neutral-500'>{location.name}</p>
          )}
        </div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      <img
        src={post.urls.regular}
        alt={`By ${post.user.name}`}
        className='object-contain mx-auto'
        style={{ maxHeight: '34rem' }}
      />
    );
  };

  const renderFooter = () => {
    return (
      <div className='h-14 px-8 py-4 flex justify-between gap-4'>
        <p className='text-sm text-neutral-500'>
          {post.likes.toLocaleString()} likes
        </p>
        <p className='text-sm text-neutral-500'>
          {post.views.toLocaleString()} views
        </p>
      </div>
    );
  };

  return (
    <div className='w-full bg-white rounded-xl'>
      {renderHeader(post.user, post.location)}
      {renderBody()}
      {renderFooter()}
    </div>
  );
};

export default FeedPostCard;
