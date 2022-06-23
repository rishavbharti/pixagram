import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ListView from 'components/ListView';

import {
  getAllPostsInFeed,
  getTotalPosts,
  getRandomPhotos,
} from 'app/slice/feedSlice';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

const Feed = () => {
  const dispatch = useDispatch();
  const lastElement = useRef(null);
  const isVisible = useIntersectionObserver(lastElement, {
    threshold: 0.5,
    rootMargin: '200px',
  });

  const {
    status: { loading, error, errorMessage },
  } = useSelector((state) => state.feed);
  const posts = useSelector(getAllPostsInFeed);
  const postsCount = useSelector(getTotalPosts);

  useEffect(() => {
    if (!postsCount && !loading) {
      dispatch(getRandomPhotos({ initialLoad: true, count: 10 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isVisible && !loading) {
      dispatch(
        getRandomPhotos({
          initialLoad: false,
          count: 10,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isVisible]);

  return (
    <ListView
      posts={posts}
      allowInfiniteScroll
      postsCount={postsCount}
      loading={loading}
      error={error}
      errorMessage={errorMessage}
      placeholderNodeRef={lastElement}
    />
  );
};

export default Feed;
