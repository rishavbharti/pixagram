import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Error from 'components/Error';
import Loading from 'components/Loading';
import ListView from 'components/ListView';
import GridView from 'components/GridView';
import ProfileHeader from 'components/ProfileHeader';

import { getUserProfile } from 'app/slice/userProfileSlice';

import GridIcon from 'assets/icons/grid_icon.svg';
import ListIcon from 'assets/icons/list_icon.svg';

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

    // The scroll position is preserved from the previous page, hence scroll to top automatically
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [dispatch, state, _username]);

  const renderPhotos = (photos) => {
    if (showAsList)
      return (
        <ListView
          posts={photos}
          postsCount={photos.length}
          showCardHeader={false}
        />
      );

    return <GridView posts={photos} postsCount={photos.length} />;
  };

  const renderContent = () => {
    if (!state?.[_username] || state[_username].status.loading) {
      return <Loading />;
    }

    if (state[_username].status.error)
      return <Error message={state[_username].status?.errorMessage} />;

    const { profile, photos } = state[_username];

    return (
      <>
        <ProfileHeader profile={profile} />
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

  return renderContent();
};

export default UserProfile;
