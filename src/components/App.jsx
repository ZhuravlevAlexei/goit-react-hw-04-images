import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './App.module.css';
import { getPhotosByAxios } from 'services/library';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

const STATUS_STAGE = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchText: '',
    STATUS: STATUS_STAGE.IDLE,
    gallery: [],
    paginationPage: 0,
    totalHits: 0,
    showModal: false,
    picObjectForModal: { picUrl: '', picTags: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchText;
    const newSearch = this.state.searchText.trim();
    const prevPage = prevState.paginationPage;
    const newPage = this.state.paginationPage;
    const newGallery = this.state.gallery;

    if (newGallery.length !== 0) {
      if (newPage === 1) {
        window.scrollTo(0, 0);
      } else if (newPage > 1) {
        const galleryElement = document.querySelector('#forScroll');
        const { height: cardHeight } =
          galleryElement.firstElementChild.getBoundingClientRect();
        const scrollY = (cardHeight + 16) * 2;
        window.scrollBy({
          top: scrollY,
          behavior: 'smooth',
        });
      }
    }

    if (!newSearch) {
      return;
    }

    if (prevSearch !== newSearch || prevPage !== newPage) {
      this.setState({ STATUS: STATUS_STAGE.PENDING });
      getPhotosByAxios(newSearch, this.state.paginationPage)
        .then(resp => {
          if (resp.status !== 200) {
            throw new Error(resp.statusText);
          } else {
            if (prevSearch !== newSearch) {
              this.setState({
                STATUS: STATUS_STAGE.RESOLVED,
                gallery: [...resp.data.hits],
                totalHits: resp.data.totalHits,
              });
            } else {
              this.setState(({ gallery }) => ({
                STATUS: STATUS_STAGE.RESOLVED,
                gallery: [...gallery, ...resp.data.hits],
                totalHits: resp.data.totalHits,
              }));
            }
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ STATUS: STATUS_STAGE.IDLE });
        });
    }
  }

  createSearchText = searchText => {
    this.setState({
      searchText,
      STATUS: STATUS_STAGE.IDLE,
      paginationPage: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prev => ({
      paginationPage: prev.paginationPage + 1,
    }));
  };

  onCloseModal = () => {
    this.setState(prev => ({ showModal: false }));
  };

  onOpenModal = picObject => {
    this.setState({
      showModal: true,
      picObjectForModal: {
        picUrl: picObject.picUrl,
        picTags: picObject.picTags,
      },
    });
  };

  render() {
    const { gallery, totalHits, paginationPage, STATUS, showModal } =
      this.state;
    const totalPages = Math.ceil(totalHits / 12);

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.createSearchText} />
        <ImageGallery gallery={gallery} onOpenModal={this.onOpenModal} />
        {gallery.length !== 0 && paginationPage < totalPages && (
          <Button onClick={this.onLoadMore} />
        )}
        {STATUS === STATUS_STAGE.PENDING && (
          <div
            className={paginationPage > 1 ? css.loaderWrapB : css.loaderWrapT}
          >
            <Loader />
          </div>
        )}
        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img
              src={this.state.picObjectForModal.picUrl}
              alt={this.state.picObjectForModal.picTags}
            />
          </Modal>
        )}
      </div>
    );
  }
}

App.propTypes = {
  searchText: PropTypes.string,
  picObjectForModal: PropTypes.objectOf({
    picUrl: PropTypes.string.isRequired,
    picTags: PropTypes.string.isRequired,
  }),
};

export default App;
