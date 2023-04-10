import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  key,
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) => {
  return (
    <li key={key} classNane={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onOpenModal({ picUrl: largeImageURL, picTags: tags });
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  key: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
