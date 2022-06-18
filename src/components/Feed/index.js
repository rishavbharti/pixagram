import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FeedPostShimmer from '../FeedPostShimmer';

import {
  getAllPostsInFeed,
  getRandomPhotos,
} from '../.././app/slice/feedSlice';

const Feed = () => {
  const dispatch = useDispatch();

  const {
    status: { loading, error },
  } = useSelector((state) => state.feed);
  const posts = useSelector(getAllPostsInFeed);
  console.log(loading, posts);

  useEffect(() => {
    dispatch(getRandomPhotos());
  }, [dispatch]);

  const renderLoading = () => {
    const shimmerArray = new Array(10).fill(0);

    return shimmerArray.map((el, i) => {
      return (
        <li key={i}>
          <FeedPostShimmer />
        </li>
      );
    });
  };

  const renderFeed = () => {
    if (loading) return renderLoading();
  };

  return (
    <div className='bg-gray-50'>
      <ul className='w-5/12 mx-auto py-14 flex flex-col gap-14'>
        {renderFeed()}
      </ul>
    </div>
  );
};

export default Feed;
