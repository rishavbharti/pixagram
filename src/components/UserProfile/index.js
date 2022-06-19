import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ImageCard from '../ImageCard';

import { getUserProfile } from '../../app/slice/userProfileSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  let { username } = useParams();
  const _username = username.split('@')[1];

  const state = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (!state?.[_username]) {
      dispatch(getUserProfile({ username: _username }));
    }
  }, [dispatch, state, _username]);

  const renderProfileHeader = (profile) => {
    return (
      <div className='md:w-4/6 xl:w-1/2 mx-auto px-4 py-5 md:py-20 border-b border-solid flex gap-5 md:gap-20'>
        <img
          src={profile.profile_image.large}
          alt={profile.name}
          className='rounded-full h-20 w-20 md:h-36 md:w-36'
        />

        <div className='flex flex-col gap-1 md:gap-3 py-1'>
          <p className='uppercase font-bold text-md md:text-2xl'>
            {profile.name}
          </p>
          <p className='text-neutral-500'>{profile.bio}</p>
        </div>
      </div>
    );
  };

  const renderPhotos = (photos) => {
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

  const renderContent = () => {
    if (
      !state?.[_username] ||
      state[_username].loading ||
      !state[_username].profile ||
      !state[_username].photos.length
    )
      return (
        <div className='h-screen flex items-center'>
          <div className='animate-spin rounded-lg bg-shimmer h-10 w-10 mx-auto'></div>
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
        {renderPhotos(photos)}
      </>
    );
  };

  return (
    <div className='bg-gray-50'>
      <div>{renderContent()}</div>
    </div>
  );
};

export default UserProfile;