import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ImageCard from '../ImageCard';
import FeedPostCard from '../FeedPostCard';

import { getUserProfile } from '../../app/slice/userProfileSlice';

import GridIcon from '../../assets/icons/grid_icon.svg';
import ListIcon from '../../assets/icons/list_icon.svg';

const UserProfile = () => {
  const dispatch = useDispatch();
  let { username } = useParams();
  const _username = username.split('@')[1];
  const [showAsList, setShowAsList] = useState(false);

  const state = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (!state?.[_username]) {
      dispatch(getUserProfile({ username: _username }));
    }
  }, [dispatch, state, _username]);

  const renderProfileHeader = (profile) => {
    return (
      <div className='md:w-4/6 xl:w-1/2 mx-auto px-4 py-5 md:py-20 border-b border-solid dark:border-dm-borderColor flex gap-5 md:gap-20'>
        <img
          src={profile.profile_image.large}
          alt={profile.name}
          className='rounded-full h-20 w-20 md:h-36 md:w-36'
        />

        <div className='flex flex-col gap-1 md:gap-3 py-1'>
          <p className='uppercase font-bold text-md md:text-2xl'>
            {profile.name}
          </p>
          <p className='text-labelText dark:text-dm-labelText'>{profile.bio}</p>
        </div>
      </div>
    );
  };

  const renderGridView = (photos) => {
    const maxPhotosIndexFirstColumn = Math.ceil(photos.length / 3);
    const maxPhotosIndexSecondColumn = maxPhotosIndexFirstColumn * 2;
    const maxPhotosIndexThirdColumn = maxPhotosIndexFirstColumn * 3;

    return (
      <div className='grid grid-cols-3 gap-2 md:gap-4 mx-5 md:mx-20 my-10'>
        <div className='flex flex-col gap-2 md:gap-4'>
          {photos.map((photo, i) => {
            if (i < maxPhotosIndexFirstColumn) {
              return <ImageCard photo={photo} key={i} />;
            }

            return null;
          })}
        </div>

        <div className='flex flex-col gap-2 md:gap-4'>
          {photos.map((photo, i) => {
            if (
              i >= maxPhotosIndexFirstColumn &&
              i < maxPhotosIndexSecondColumn
            ) {
              return <ImageCard photo={photo} key={i} />;
            }

            return null;
          })}
        </div>

        <div className='flex flex-col gap-2 md:gap-4'>
          {photos.map((photo, i) => {
            if (
              i >= maxPhotosIndexSecondColumn &&
              i < maxPhotosIndexThirdColumn
            ) {
              return <ImageCard photo={photo} key={i} />;
            }

            return null;
          })}
        </div>
      </div>
    );
  };

  const renderListView = (photos) => {
    return (
      <ul className='md:w-4/6 xl:w-5/12 mx-auto py-14 flex flex-col gap-10'>
        {photos.map((photo, i) => {
          return (
            <li key={i}>
              <FeedPostCard post={photo} showHeader={false} />
            </li>
          );
        })}
      </ul>
    );
  };

  const renderPhotos = (photos) => {
    if (showAsList) return renderListView(photos);

    return renderGridView(photos);
  };

  const renderContent = () => {
    if (
      !state?.[_username] ||
      state[_username].loading ||
      !state[_username].profile ||
      !state[_username].photos.length
    )
      return (
        <div className='h-screen flex items-center'>
          <div className='animate-spin rounded-lg bg-shimmer dark:bg-dm-shimmer h-10 w-10 mx-auto'></div>
        </div>
      );

    if (state[_username].error)
      return (
        <p className='text-center py-20'>
          Something went wrong while fetching user profile
        </p>
      );

    const { profile, photos } = state[_username];

    return (
      <>
        {renderProfileHeader(profile)}
        <>
          <div className='flex justify-end m-5 md:mx-20'>
            <button onClick={() => setShowAsList(!showAsList)}>
              <img
                src={showAsList ? GridIcon : ListIcon}
                alt={`Show as ${showAsList ? 'Grid' : 'List'}`}
                className='w-10 h-10 p-2 border rounded-md'
              />
            </button>
          </div>

          {renderPhotos(photos)}
        </>
      </>
    );
  };

  return (
    <div className='bg-bodyBg dark:bg-dm-bodyBg'>
      <div>{renderContent()}</div>
    </div>
  );
};

export default UserProfile;
