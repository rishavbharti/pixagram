import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FeedPostShimmer from '../FeedPostShimmer';
import FeedPostCard from '../FeedPostCard';

import {
  getAllPostsInFeed,
  getTotalPosts,
  getRandomPhotos,
} from '../.././app/slice/feedSlice';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Feed = () => {
  const dispatch = useDispatch();
  const lastElement = useRef(null);
  const isVisible = useIntersectionObserver(lastElement, {
    threshold: 0.5,
    rootMargin: '200px',
  });

  const {
    status: { loading, error },
  } = useSelector((state) => state.feed);
  const posts = useSelector(getAllPostsInFeed);
  const postsCount = useSelector(getTotalPosts);

  useEffect(() => {
    dispatch(getRandomPhotos({ initialLoad: postsCount === 0, count: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isVisible) {
      dispatch(
        getRandomPhotos({
          initialLoad: false,
          count: 10,
        })
      );
    }
  }, [dispatch, isVisible]);

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
    if (!postsCount) {
      if (loading) return renderLoading();

      if (error) return <p>Something went wrong while fetching data</p>;
    }

    return posts.map((post, i) => {
      return (
        <li key={i}>
          <FeedPostCard post={post} />
        </li>
      );
    });
  };

  const renderLoadingOnScroll = () => {
    if (postsCount && loading) {
      return <p>Loading...</p>;
    }
  };

  const renderPlaceholderNode = () => {
    if (postsCount) {
      return <li ref={lastElement} />;
    }
  };

  return (
    <div className='bg-bodyBg dark:bg-dm-bodyBg'>
      <ul className='md:w-4/6 xl:w-5/12 mx-auto py-14 flex flex-col gap-10'>
        {renderFeed()}
        {renderLoadingOnScroll()}
        {renderPlaceholderNode()}
      </ul>
    </div>
  );
};

export default Feed;
