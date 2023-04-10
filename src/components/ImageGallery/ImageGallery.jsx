import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ gallery, onOpenModal }) => {
  return (
    <>
      <ul className={css.imageGallery} id="forScroll">
        {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onOpenModal={onOpenModal}
            />
          );
        })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
