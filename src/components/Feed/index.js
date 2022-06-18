import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FeedPostShimmer from '../FeedPostShimmer';
import FeedPostCard from '../FeedPostCard';

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

    if (error) return <p>Something went wrong while fetching data</p>;

    return posts.map((post, i) => {
      return (
        <li key={i}>
          <FeedPostCard post={post} />
        </li>
      );
    });
  };

  return (
    <div className='bg-gray-50'>
      <ul className='md:w-4/6 xl:w-5/12 mx-auto py-14 flex flex-col gap-10'>
        {renderFeed()}
      </ul>
    </div>
  );
};

export default Feed;
