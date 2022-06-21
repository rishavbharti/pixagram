import React from 'react';
import PropTypes from 'prop-types';

const ImageCard = ({ photo }) => {
  return (
    <div className='relative'>
      <img
        src={photo.urls.regular}
        alt=''
        width={`${photo.width}px`}
        height={`${photo.height}px`}
        loading='lazy'
      />
      {photo.description && (
        <div className='cursor-pointer absolute bottom-0 flex items-end bg-subtitle2 dark:bg-dm-subtitle2 opacity-0 hover:opacity-40 p-4 h-full w-full'>
          <p>{photo.description}</p>
        </div>
      )}
    </div>
  );
};

ImageCard.propTypes = {
  photo: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    urls: PropTypes.shape({ regular: PropTypes.string }).isRequired,
    description: PropTypes.string,
  }),
};

export default ImageCard;
