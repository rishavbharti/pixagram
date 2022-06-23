import React from 'react';

import Error from 'components/Error';
import FeedPostCard from 'components/FeedPostCard';
import FeedPostShimmer from 'components/FeedPostShimmer';

const ListView = (props) => {
  const {
    posts,
    postsCount,
    allowInfiniteScroll,
    loading,
    error,
    errorMessage,
    placeholderNodeRef,
    showCardHeader,
  } = props;

  const renderInfiniteScrollElements = () => {
    if (!allowInfiniteScroll) return null;

    const renderLoadingOnScroll = () => {
      if (postsCount && loading) {
        return <p>Loading...</p>;
      }
    };

    const renderPlaceholderNode = () => {
      if (postsCount) {
        return <li ref={placeholderNodeRef} />;
      }
    };

    return (
      <>
        {renderLoadingOnScroll()}
        {renderPlaceholderNode()}
      </>
    );
  };

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

  const renderContent = () => {
    if (!postsCount) {
      if (loading) return renderLoading();

      if (error) return <Error message={errorMessage} />;

      if (!loading && !error)
        return <Error message="Sorry, we couldn't get you any posts!" />;
    }

    return (
      <>
        {posts.map((post, i) => {
          return (
            <li key={i}>
              <FeedPostCard post={post} showHeader={showCardHeader} />
            </li>
          );
        })}

        {renderInfiniteScrollElements()}
      </>
    );
  };

  return (
    <ul className='md:w-4/6 xl:w-5/12 mx-auto py-14 flex flex-col gap-10'>
      {renderContent()}
    </ul>
  );
};

export default ListView;
