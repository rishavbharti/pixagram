import React from 'react';
import { Link } from 'react-router-dom';

const FeedPostCard = (props) => {
  const { post, showHeader = true } = props;

  const renderHeader = (user, location) => {
    return (
      <div className='px-4 py-3 border-b border-solid dark:border-dm-borderColor'>
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
              <p className='text-sm text-labelText'>{location.name}</p>
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
      <div className='px-8 py-4 flex flex-col gap-4'>
        {post.description && (
          <p className='text-sm text-subtitle dark:text-dm-subtitle'>
            {post.description}
          </p>
        )}
        <div className='flex justify-between gap-4'>
          {post.likes ? (
            <p className='text-sm text-labelText dark:text-dm-labelText'>
              {post.likes.toLocaleString()} {`like${post.likes > 1 ? 's' : ''}`}
            </p>
          ) : (
            ''
          )}
          {post.views ? (
            <p className='text-sm text-labelText dark:text-dm-labelText'>
              {post.views.toLocaleString()} {`view${post.views > 1 ? 's' : ''}`}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='w-full bg-cardBg dark:bg-dm-cardBg rounded-xl drop-shadow-md'>
      {showHeader && renderHeader(post.user, post.location)}
      {renderBody()}
      {renderFooter()}
    </div>
  );
};

export default FeedPostCard;
