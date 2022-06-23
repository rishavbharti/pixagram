import Error from 'components/Error';
import ImageCard from 'components/ImageCard';
import Loading from 'components/Loading';
import React from 'react';

const GridView = (props) => {
  const { posts, postsCount, loading, error, errorMessage } = props;

  const renderGridView = () => {
    /** Since a grid of three columns is being shown.
     *  The below calculations gives us the maximum index of posts to be shown in each column.
     *  Thus an approximately equal number of posts are shown in each column.
     **/
    const maxPhotosIndexFirstColumn = Math.ceil(posts.length / 3);
    const maxPhotosIndexSecondColumn = maxPhotosIndexFirstColumn * 2;
    const maxPhotosIndexThirdColumn = maxPhotosIndexFirstColumn * 3;

    return (
      <div className='grid grid-cols-3 gap-2 md:gap-4 mx-5 md:mx-20 my-10'>
        <div className='flex flex-col gap-2 md:gap-4'>
          {posts.map((post, i) => {
            if (i < maxPhotosIndexFirstColumn) {
              return <ImageCard photo={post} key={i} />;
            }

            return null;
          })}
        </div>

        <div className='flex flex-col gap-2 md:gap-4'>
          {posts.map((post, i) => {
            if (
              i >= maxPhotosIndexFirstColumn &&
              i < maxPhotosIndexSecondColumn
            ) {
              return <ImageCard photo={post} key={i} />;
            }

            return null;
          })}
        </div>

        <div className='flex flex-col gap-2 md:gap-4'>
          {posts.map((post, i) => {
            if (
              i >= maxPhotosIndexSecondColumn &&
              i < maxPhotosIndexThirdColumn
            ) {
              return <ImageCard photo={post} key={i} />;
            }

            return null;
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!postsCount) {
      if (loading) return <Loading />;

      if (error) return <Error message={errorMessage} />;

      if (!loading && !error)
        return <Error message="Sorry, we couldn't get you any posts!" />;
    }

    return renderGridView();
  };

  return renderContent();
};

export default GridView;
