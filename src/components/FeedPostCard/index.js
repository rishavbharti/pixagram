import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { useDispatch } from 'react-redux';
// import { reactToPhoto } from 'app/slice/feedSlice';
// import LikeIcon from 'assets/icons/like_icon.svg';
// import UnlikeIcon from 'assets/icons/unlike_icon.svg';

const FeedPostCard = (props) => {
  const { post, showHeader = true } = props;
  // const dispatch = useDispatch();

  const renderHeader = (user, location) => {
    return (
      <div className='px-4 py-3 border-b border-solid dark:border-dm-borderColor'>
        <Link
          to={`@${user.username}`}
          className='flex gap-5 items-center w-fit'
        >
          <img
            src={user.profile_image.small}
            alt={user.name}
            className='rounded-full h-10 w-10'
          />

          <div className='flex-1 py-1'>
            <p className='hover:text-blue-600'>{user.name}</p>
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
        width={`${post.width}px`}
        height={`${post.height}px`}
        style={{ maxHeight: '34rem' }}
        loading='lazy'
      />
    );
  };

  // const handleLikeUnlike = () => {
  //   dispatch(
  //     reactToPhoto({
  //       id: post.id,
  //       reaction: post.liked_by_user ? 'unlike' : 'like',
  //     })
  //   );
  // };

  const renderFooter = () => {
    return (
      <div className='px-8 pt-4 pb-5 flex flex-col gap-2'>
        {/* <button onClick={handleLikeUnlike}>
          <img
            src={post.liked_by_user ? UnlikeIcon : LikeIcon}
            alt={`${post.liked_by_user} ? "Unlike" : "Like"`}
            className='w-6 h-6'
          />
        </button> */}

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

        {post.description && (
          <p className='text-sm text-subtitle dark:text-dm-subtitle'>
            {post.description}
          </p>
        )}
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

FeedPostCard.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
      profile_image: PropTypes.shape({ small: PropTypes.string }),
    }).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    urls: PropTypes.shape({ regular: PropTypes.string }).isRequired,
    location: PropTypes.shape({ name: PropTypes.string }),
    likes: PropTypes.number,
    views: PropTypes.number,
    description: PropTypes.string,
  }),
  showHeader: PropTypes.bool,
};

export default FeedPostCard;
