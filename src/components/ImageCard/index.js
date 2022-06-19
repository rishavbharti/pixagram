import React from 'react';

const ImageCard = ({ photo }) => {
  return (
    <div className='relative'>
      <img src={photo.urls.regular} alt='' loading='lazy' />
      {photo.description && (
        <div className='cursor-pointer absolute bottom-0 flex items-end bg-slate-50 opacity-0 hover:opacity-40 p-4 h-full w-full'>
          <p>{photo.description}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
