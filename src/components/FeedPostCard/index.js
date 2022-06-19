import React from 'react';
import { Link } from 'react-router-dom';

const FeedPostCard = (props) => {
  const { post } = props;

  const renderHeader = (user, location) => {
    return (
      <div className='px-4 py-3 border-b border-solid'>
        <Link to={`@${user.username}`} className='flex gap-5 items-center'>
          <img
            src={user.profile_image.small}
            alt={user.name}
            className='rounded-full h-10 w-10'
            loading='lazy'
          />

          <div className='flex-1 py-1'>
            <p className=''>{user.name}</p>
            {location.name && (
              <p className='text-sm text-neutral-500'>{location.name}</p>
            )}
          </div>
        </Link>
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
        loading='lazy'
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
    <div className='w-full bg-white rounded-xl drop-shadow-md'>
      {renderHeader(post.user, post.location)}
      {renderBody()}
      {renderFooter()}
    </div>
  );
};

export default FeedPostCard;
