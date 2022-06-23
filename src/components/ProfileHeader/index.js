import React from 'react';

const ProfileHeader = (props) => {
  const { profile } = props;

  const renderProfileHeader = () => {
    if (!profile) {
      return (
        <p className='text-center py-20'>
          Seems like the user forgot to write a bio!
        </p>
      );
    }

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

  return renderProfileHeader();
};

export default ProfileHeader;
